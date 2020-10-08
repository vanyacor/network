import classes from './Login.module.css';
import React from 'react';
import LoginForm from './LoginForm';
import { LoginLoader } from '../preloader/loginLoader';
import { LoginType } from '../../types/types';

type LoginPageType = {
    setLogin: (LoginData: LoginType) => void
    bgimg: string
    isFetching: boolean
    isRequesting: boolean
    captchaUrl: string | null
}
let Login: React.FC<LoginPageType> = (props) => {
    const onSubmit = (formData: LoginType) => {
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
                <LoginForm
                    onSubmit={onSubmit}
                    captchaUrl={props.captchaUrl}
                />
                {props.isRequesting ? <LoginLoader /> : null}
            </div>
        </div>)
}

export default Login;