import React, { Component } from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    control: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    bigAvatar: {
        width: 200,
        height: 200,
        display:'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    typography: {
        margin: '20px',
        textAlign: 'center'
    }
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    // set the active tab
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {questions, user, authedUser, classes} = this.props;

        if (authedUser === null) { //if no authedUser i.e. not logged in, redirect to login page
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }

        if (user === null) { //if user is not found, redirect to a 404 page
            return <Redirect to='/404'/>
        }
        const answeredIds =  Object.keys(user.answers);
        const askedIds = user.questions;

        const answered = answeredIds.map((id)=>
            questions.filter((qid)=>qid===id)[0]
        );

        const asked = askedIds.map((id)=>
            questions.filter((qid)=>qid===id)[0]
        );

        const favorites = user.favorites.map((id)=>
            questions.filter((qid)=>qid===id)[0]
        );

        const component = (
            <div>
                <div>
                    <Avatar alt={`Avatar of ${user.name}`}
                            src={user.avatarURL}
                            className={classNames(classes.avatar, classes.bigAvatar)} />
                    <Typography variant="title" color="inherit" noWrap className={classes.typography}>
                        {user.id}
                    </Typography>
                </div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="My Favorites" />
                    <Tab label="Asked" />
                    <Tab label="Answered" />
                </Tabs>
                {this.state.value === 0 && (
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item md={12}>
                            <Grid container className={classes.demo} justify="center" spacing={16}>
                                {favorites.map((questionId) => (
                                    <Grid key={questionId} item>
                                        <Paper className={classes.paper} >
                                            <Question key={questionId} id={questionId} />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {this.state.value === 1 && (
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item md={12}>
                            <Grid container className={classes.demo} justify="center" spacing={16}>
                                {asked.map((questionId) => (
                                    <Grid key={questionId} item>
                                        <Paper className={classes.paper} >
                                            <Question key={questionId} id={questionId} />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {this.state.value === 2 && (
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item md={12}>
                            <Grid container className={classes.demo} justify="center" spacing={40}>
                                {answered.map((questionId) => (
                                    <Grid key={questionId} item>
                                        <Paper className={classes.paper} >
                                            <Question key={questionId} id={questionId} />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div>
        );
        return (
            <div>
                <Nav component={component} uid={user.id}/>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props) {
    const {id} = props.match.params;
    return {
        user: users[id] ? users[id] : null,
        questions: Object.keys(questions),
        authedUser,
    }

}

export default withStyles(styles)(connect(mapStateToProps)(UserProfile));