import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addAuthedUser} from "../actions/authedUser";
import { Redirect} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {getUserValues} from '../selectors';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: 300,
        'text-align': 'center',
        justify:"center",
    }),
    typography: {
        margin: `${theme.spacing.unit}px`,
    },
    button: {
        margin: `${theme.spacing.unit}px`,
    }

});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId:'',
            route:'',
        }
    }

    handleChange = (e) => {
        this.setState({
            userId: e.target.value,
        })

    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.userId === '') {
            return;
        }
        //dispatch action to add authed user
        this.props.addAuthedUser(this.state.userId);

        // Go to home page or previous page if there is history,
        // else navigate to home
        this.props.location.state && this.props.location.state.hasOwnProperty('from') &&
        this.props.location.state.from !== '' ?
            this.setState({route: this.props.location.state.from.pathname})
            : this.setState({route: '/home'});
    };

    handleRegister = (e) => {
        e.preventDefault();
        this.setState({route: '/register'})
    };

    render() {
        const {users, classes} = this.props;
        if (this.state.route !== '') {
            return <Redirect to={this.state.route}/>
        }

        return (
            <Paper className={classes.root} elevation={4}>
                <Typography variant="display1" gutterBottom className={classes.typography}>
                    Login To Poll!
                </Typography>
                <Typography variant="subheading" gutterBottom className={classes.typography}>
                    If you are a new user, please register.
                </Typography>
                <List>
                    {users.map(user => (
                        <ListItem key={user.id} dense className={classes.listItem}>
                            <Avatar alt={`Avatar of ${user.name}`}
                                    src={user.avatarURL}
                                    className={classes.avatar} />
                            <ListItemText primary={user.name} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    checked={this.state.userId === user.id}
                                    onChange={this.handleChange}
                                    value={user.id}
                                    color='primary'
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Button type="submit" variant="raised" color="primary"
                        className={classes.button} onClick={this.handleSubmit}>
                    Login
                </Button>
                <Button type="submit" variant="raised" color="primary"
                        className={classes.button} onClick={this.handleRegister}>
                    Register
                </Button>
            </Paper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAuthedUser: (id)=>dispatch(addAuthedUser(id)),
    }
}

function mapStateToProps(state) {
    return {
        users: getUserValues(state),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))
