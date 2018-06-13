import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import {sortUsers} from '../selectors';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    typography: {
        'text-align': 'center',
        margin: theme.spacing.unit * 3
    },
    paper: {
        'text-align': 'center',
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
});

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
        }
    }
    handleClick = (id) => {
        this.setState({
            route: `/users/${id}`
        })

    };
    render() {
        const {usersList, authedUser, classes} = this.props;
        if (authedUser === null) { //if no authedUser i.e. not logged in, redirect to login page
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }

        if (this.state.route !== '') {
            return <Redirect to={{
                pathname: this.state.route,
                state: { from: this.props.location }
            }}/>
        }
        const component = (
            <div className={classes.root}>
                <Paper className={classes.paper} >
                    <Typography variant="display1" gutterBottom className={classes.typography}>
                        Leaderboard
                    </Typography>
                    <List>
                        {usersList.map((user)=>
                            (
                                <ListItem button key={user.id} onClick={()=>this.handleClick(user.id)}>
                                    <Card className={classes.card} elevation={0}>
                                        <CardHeader
                                            avatar={
                                                <Avatar alt={`Avatar of ${user.name}`}
                                                        src={user.avatarURL}
                                                        className={classNames(classes.avatar, classes.bigAvatar)} />

                                            }
                                            title={user.name}
                                            subheader={`asked: ${user.questions.length} | answered: ${Object.keys(user.answers).length}`}
                                        />
                                    </Card>
                                </ListItem>
                            ))}
                    </List>
                </Paper>
            </div>
        );

        return (
            <div>
                <Nav component={component} uid={authedUser}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usersList: sortUsers(state),
        authedUser: state.authedUser===''? null : state.authedUser,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Leaderboard))