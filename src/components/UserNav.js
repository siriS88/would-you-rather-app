import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import React , {Component} from 'react';
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles/index";
import {Link} from 'react-router-dom';

const ITEM_HEIGHT = 48;

const styles = theme => ({

});

class UserNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {authedUser, classes} = this.props;
        const options = [
            <Link to={`/users/${authedUser.id}`}>
                Profile
            </Link>,
            <Link to='/'>
                Logout
            </Link>
        ];
        return (
            <div style={{position:'absolute', right:20}}>
                <IconButton
                    aria-label="More"
                    aria-owns={this.state.anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <Avatar alt={`Avatar of ${authedUser.name}`}
                            src={authedUser.avatarURL}
                            className={classes.avatar} />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        authedUser: users[authedUser],
    }

}

export default withStyles(styles, {withTheme:true})(connect(mapStateToProps)(UserNav));