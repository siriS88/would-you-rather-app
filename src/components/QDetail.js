import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleSaveAnswer, handleToggleLike} from '../actions/questions';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    radioGroup: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    typography: {
        margin: `${theme.spacing.unit}px`,
    },
    heartIcon: {
        margin: `${theme.spacing.unit}px 2`,
        color: red[800],
    },
    likesContainer: {
        position: 'absolute',
        right: '20px',
        bottom: '10px',
    },
    likeText: {
        display:'inline'
    },
    paper: {
        position: 'relative',
    }
});

// This component will get id of question from url params

class QDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            option: 'optionOne',
            toHome:false,
        }
    }
    handleInputChange = (e) => {
        const option = e.target.value;
        this.setState({
            option,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //call api to update the database
        // Call _saveQuestionAnswer here
        // the poll should show up in answered now
        const {question, authedUser} = this.props;
        const {optionOne} = this.state;
        this.props.handleSaveAnswer({
            authedUser,
            qid: question.id,
            answer: optionOne === true ? 'optionOne' : 'optionTwo'
        }).then((res)=>{
            //redirect to this poll detail page again - now the poll detail shows up as answered
            this.setState({
                toHome:true
            });
        });
    };

    handleLike = () => {
        const {authedUser, question} = this.props;
        this.props.handleToggleLike({authedUser, qid: question.id});
    };

    render() {
        const {question, users, authedUser} = this.props;

        let optionOnePercentage = 0;
        let optionTwoPercentage = 0;
        if (authedUser === null) { //if no authedUser i.e. not logged in, redirect to login page
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }
        if (question === null) { //if question is not found, redirect to a 404 page
            return <Redirect to='/404'/>
        }

        if (this.state.toHome === true) {
            return <Redirect to='/home'/>
        }

        const heart = question.likes.includes(authedUser) ?  <TiHeartFullOutline/> : <TiHeartOutline/>;
        const authedUserAnswers = users[authedUser].answers;
        const author =  users[question.author];
        const answered = Object.keys(authedUserAnswers).includes(question.id);
        const { classes } = this.props;
        if (answered) {
            const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
            optionOnePercentage = Math.round((question.optionOne.votes.length / totalVotes)*100);
            optionTwoPercentage = Math.round((question.optionTwo.votes.length / totalVotes)*100);
        }

        const qDetailComponent = (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={4}>
                    <Card className={classes.card} elevation={1}>
                        <CardHeader
                            avatar={
                                <Avatar alt={`Avatar of ${author.name}`}
                                        src={author.avatarURL}
                                        className={classes.avatar} />

                            }
                            title={author.name}
                            subheader={moment(question.timestamp).format('dddd, MMMM Do h:mm A')}
                        />
                    </Card>
                    <Typography variant="display1" gutterBottom className={classes.typography}>
                        Would you rather
                    </Typography>

                    {!answered &&
                    <div className={classes.radioGroup}>
                        <RadioGroup
                            aria-label="qDetail"
                            name="qDetail"
                            className={classes.group}
                            value={this.state.option}
                            onChange={this.handleInputChange}
                        >
                            <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                            <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                        </RadioGroup>
                        <Button type="submit" variant="raised" color="primary"
                                onClick={this.handleSubmit}>
                            SUBMIT
                        </Button>
                    </div>
                    }

                    {answered &&
                    (<List>
                        <ListItem key='optionOne' className={classes.listItem}>
                            {authedUserAnswers[question.id] === 'optionOne' && (
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>)}
                            <ListItemText inset primary={question.optionOne.text}
                                          secondary={`${question.optionOne.votes.length} votes | ${optionOnePercentage}%`} >
                            </ListItemText>
                        </ListItem>
                        <ListItem key='optionTwo' className={classes.listItem}>
                            {authedUserAnswers[question.id] === 'optionTwo' && (<ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>)}
                            <ListItemText inset primary={question.optionTwo.text}
                                          secondary={`${question.optionTwo.votes.length} votes | ${optionTwoPercentage}%`}/>
                        </ListItem>
                    </List>)
                    }

                    <div className={classes.likesContainer}>
                        <IconButton
                            aria-label="heart-button"
                            aria-haspopup="false"
                            onClick={(e) => {this.handleLike(e)}}
                            className={classes.heartIcon}
                        >
                            {heart}
                        </IconButton>
                        <Typography className={classes.likeText}>
                            {question.likes.length}
                        </Typography>
                    </div>
                </Paper>
            </div>
        );
        return (
            <div>
                <Nav component={qDetailComponent} uid={authedUser} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveAnswer: (obj)=>dispatch(handleSaveAnswer(obj)),
        handleToggleLike: (obj)=>dispatch(handleToggleLike(obj)),
    }
}

function mapStateToProps({questions, users, authedUser}, props){
    const {id} = props.match.params;
    return {
        question: questions[id] ? questions[id] : null,
        users,
        authedUser: authedUser===''? null : authedUser,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QDetail))