import React from 'react';
/* import classes from './Header.module.css'; */
import classes from './Navbar.module.css';

/* import logo from './../../assets/images/'; */
import { NavLink } from 'react-router-dom';
import { MessagesIcon, NewsIcon, UserIcon, UsersIcon, SettingsIcon } from './Svg';

type PropsType = {
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={classes.header}>
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
            {/* <img className={classes.img} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Google_Lens_-_new_logo.png/600px-Google_Lens_-_new_logo.png"} alt="LOGO" />
            <ProfileName login={props.login} logout={props.logout} /> */}
        </header>)
}
export default Header;