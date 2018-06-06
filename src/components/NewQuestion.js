import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/questions';
import { Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: 300,
        'text-align': 'center'
    }),
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: `${theme.spacing.unit * 2}px`,
    }
});

class NewQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            optionOne:'',
            optionTwo:'',
            toHome: false,
        }

    }
    handleInputChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        });

    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {authedUser} = this.props;
        if (this.state.optionOne === '' || this.state.optionTwo === '') {
            return;
        }

        // Dispatch action to add the new question to store
        this.props.handleAddQuestion({
            authedUser,
            optionOne: this.state.optionOne,
            optionTwo: this.state.optionTwo
        }).then(()=> {
            // redirect to home page
            this.setState({
                toHome: true,
            });
        });
    };

    render() {
        const {authedUser, classes} = this.props;
        if (authedUser === null) { //if no authedUser i.e. not logged in, redirect to login page
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }

        if (this.state.toHome === true) {
            return <Redirect to='/home'/>
        }

        const newQuestionComponent = (
            <Paper className={classes.root} elevation={4}>
                <Typography variant="display1" gutterBottom className={classes.typography}>
                    Create Poll
                </Typography>
                <Typography variant="title" gutterBottom className={classes.typography}>
                    Would You Rather
                </Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="optionOne"
                        label="Option1"
                        className={classes.textField}
                        value={this.state.optionOne}
                        onChange={this.handleInputChange('optionOne')}
                        margin="normal"
                    />
                    <TextField
                        id="optionTwo"
                        label="Option2"
                        className={classes.textField}
                        value={this.state.optionTwo}
                        onChange={this.handleInputChange('optionTwo')}
                        margin="normal"
                    />
                    <Button type="submit" variant="raised" color="primary"
                            onClick={this.handleSubmit} className={classes.button} >
                        CREATE
                    </Button>
                </form>
            </Paper>
        );

        return (
            <div>
                <Nav component={newQuestionComponent} uid={authedUser} />
            </div>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddQuestion: (obj)=>dispatch(handleAddQuestion(obj)),
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser==='' ? null : authedUser,
    }

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewQuestion));
