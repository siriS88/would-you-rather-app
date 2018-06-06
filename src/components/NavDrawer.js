import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({

    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class NavDrawer extends Component {

    closeDrawer = () => {
        this.props.handleDrawerClose();
    };

    render() {
        const { classes, theme, anchor } = this.props;

        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={this.props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.closeDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem>
                        <NavLink to='/home' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to='/add' activeClassName='active'>
                            Create Poll
                        </NavLink>
                    </ListItem>
                </List>

            </Drawer>
        )
    }
}

export default withStyles(styles, {withTheme:true})(NavDrawer);