import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { MessagesIcon, UserIcon, UsersIcon, NewsIcon, SettingsIcon } from './Svg';

type NavBarType = {

}
const Navbar: React.FC<NavBarType> = (props) => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/profile">
                    <UserIcon />
                </NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/dialogs">
                    <MessagesIcon />
                </NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/users">
                    <UsersIcon />
                </NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/news">
                    <NewsIcon />
                </NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/settings">
                    <SettingsIcon />
                </NavLink>
            </div>

        </nav>)
}
export default Navbar;