import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleAddUser} from '../actions/users';
import { Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

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
    },
    avatar: {
        width: 25,
        height: 25,
    }
});

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            avatarURL: '',
            toHome: false,
            value:'',
        }
    }
    handleInputChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        });

    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.id === '') {
            return;
        }

        // Dispatch action to add the new user to store
        this.props.handleAddUser({
            name: this.state.name,
            id: this.state.id,
            avatarURL: this.state.avatarURL,
        }).then(()=> {
            // redirect to home page
            this.setState({
                toHome: true,
            });
        });
    };

    handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader  = new FileReader();
        const newUserRef = this;
        reader.addEventListener("load", function () {
            newUserRef.setState({ avatarURL: reader.result, value:''})
        }, false);

        if (file && file.type.match(/^image\//)) {
            reader.readAsDataURL(file);
        }
    };

    render() {

        if (this.state.toHome === true) {
            return <Redirect to='/home'/>
        }
        const { classes } = this.props;

        return (
            <div>
                <input id="myFileInput" type="file"
                       ref={(ref) => this.upload = ref}
                       style={{ display: 'none' }}
                       onChange={this.handleAvatarChange}
                       value={this.state.value}
                />

                <Paper className={classes.root} elevation={4}>
                    <Typography variant="display1" gutterBottom className={classes.typography}>
                        Add new user
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleInputChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="id"
                            label="User Id"
                            className={classes.textField}
                            value={this.state.id}
                            onChange={this.handleInputChange('id')}
                            margin="normal"
                        />
                        <TextField
                            className={classes.textField}
                            id="avatarURL"
                            label="Avatar"
                            value={this.state.optionTwo}
                            onChange={this.handleInputChange('avatarURL')}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="Avatar"
                                            aria-haspopup="false"
                                            onClick={() => {this.upload.click()}}
                                        >
                                        {this.state.avatarURL === '' ? <AccountCircle /> :
                                            <Avatar alt={`Avatar of ${this.state.name}`}
                                                    src={this.state.avatarURL}
                                                    className={classes.avatar} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="raised" color="primary"
                                onClick={this.handleSubmit} className={classes.button} >
                            CREATE
                        </Button>
                    </form>
                </Paper>
            </div>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddUser: (obj)=>dispatch(handleAddUser(obj)),
    }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(NewUser));
