import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/profile">&#9787;</NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/dialogs">&#10148;</NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/users">&#9774;</NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/news">&#9776;</NavLink>
            </div>
            <div className={classes.links}>
                <NavLink className={classes.links_link} activeClassName={classes.active} to="/settings">&#9881;</NavLink>
            </div>

        </nav>)
}
export default Navbar;