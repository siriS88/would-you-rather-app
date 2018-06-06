import React , {Component} from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavDrawer from './NavDrawer';
import UserNav from './UserNav';

const drawerWidth = 240;
const anchor = 'left';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflow: 'hidden',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    typography: {
        margin: '20px',
    }
});

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, user, component} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                            [classes[`appBarShift-${anchor}`]]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.typography}>
                                {user.name}
                            </Typography>
                            <UserNav />
                        </Toolbar>
                    </AppBar>

                    <NavDrawer anchor={anchor}
                               open={this.state.open}
                               handleDrawerClose={this.handleDrawerClose} />

                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]:this.state.open,
                            [classes[`contentShift-${anchor}`]]: this.state.open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        {component}
                    </main>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}, {uid}) {
    return {
        user: users[uid],
    }

}

export default withStyles(styles, {withTheme:true})(connect(mapStateToProps)(Nav));