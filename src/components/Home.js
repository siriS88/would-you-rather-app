import React, { Component } from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';


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
});


class Home extends Component {
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
        const {questions, user, classes} = this.props;
        if (user === null) { //if no user i.e. not logged in, redirect to login page
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }

        const answered = Object.keys(user.answers)
            .sort((a,b)=>user.answers[b].timestamp-user.answers[a].timestamp);
        const unanswered = questions.filter((qId)=>!answered.includes(qId));
        const favorites = user.favorites.map((id)=>
            questions.filter((qid)=>qid===id)[0]
        );

        const homeComponent = (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Unanswered" />
                    <Tab label="Answered" />
                    <Tab label="Favorites" />
                </Tabs>
                {this.state.value === 0 && (
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item md={12}>
                            <Grid container className={classes.demo} justify="center" spacing={16}>
                                {unanswered.map((questionId) => (
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
                {this.state.value === 2 && (
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
            </div>
        );
        return(
            <div>
                <Nav component={homeComponent} uid={user.id}/>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}) {
    const currentUser = users[authedUser];
    return {
        questions: Object.keys(questions)
            .sort((a,b)=>questions[b].timestamp-questions[a].timestamp),
        user: currentUser ? currentUser : null,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Home));