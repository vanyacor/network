import classes from './Login.module.css';
import React from 'react';
import LoginForm from './LoginForm';
import Loader from '../preloader/Loader';
import { LoginLoader } from '../preloader/loginLoader';

let Login = (props) => {
    const onSubmit = (formData) => {
        props.setLogin(formData);
    }

    let Style = {
        "width": "100vw",
        "height": "100vh",
        backgroundImage: "url(" + props.bgimg + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    return props.isFetching
        ? null
        : (<div className={classes.loginWrapper} style={Style} >
            <div className={classes.loginFormWrapper}>
                <LoginForm onSubmit={onSubmit} />
                {props.isRequesting? <LoginLoader /> : null}
            </div>
        </div>)
}

export default Login;