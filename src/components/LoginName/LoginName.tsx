import React, { useState } from 'react';
import classes from './LoginName.module.css';
import { getLoginSelect } from './../../redux/auth-selectors';
import { AppStateType } from '../../redux/redux-store';
import { logout } from './../../redux/authReducer';
import { connect } from 'react-redux';

type StatePropsProfileName = {
    login: string
}

type DispatchPropsProfileName = {
    logout: () => void
}
const ProfileName: React.FC<StatePropsProfileName & DispatchPropsProfileName> = (props) => {
    const [isLogoutOpen, setLogoutOpen] = useState(false);
    let onLoginClick = () => {
        setLogoutOpen(!isLogoutOpen);
    }
    let logout = () => {
        props.logout();
    }
    return (<div className={classes.userLogin}>
        <div>{props.children}</div>
        <span onClick={onLoginClick}>{props.login}</span>
        {isLogoutOpen ? <div onClick={logout} className={classes.logout}>Logout</div> : null}
    </div>);
}



const MapStateToProps = (state: AppStateType): StatePropsProfileName => ({
    login: getLoginSelect(state),
});

export const LoginName = connect<StatePropsProfileName, DispatchPropsProfileName>(MapStateToProps, {
    logout,
})(ProfileName);