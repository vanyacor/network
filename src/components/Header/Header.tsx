import React, { useState } from 'react';
import classes from './Header.module.css';
/* import logo from './../../assets/images/'; */
type PropsProfileNameType = {
    logout: () => void
    login: string
}
const ProfileName:React.FC<PropsProfileNameType> = (props) => {
    const [isLogoutOpen, setLogoutOpen] = useState(false);
    let onLoginClick = () => {
        setLogoutOpen(!isLogoutOpen);
    }
    let logout = () => {
        props.logout();
    }
    return (<div className={classes.userLogin}>
        <span onClick={onLoginClick}>{props.login}</span>
        {isLogoutOpen ? <div onClick={logout} className={classes.logout}>Logout</div> : null}
    </div>);
}

type PropsType = {
    login: string
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img className={classes.img} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Google_Lens_-_new_logo.png/600px-Google_Lens_-_new_logo.png"} alt="LOGO" />
            <ProfileName login={props.login} logout={props.logout} />
        </header>)
}
export default Header;