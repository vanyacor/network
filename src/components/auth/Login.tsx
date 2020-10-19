import classes from './Login.module.css';
import React from 'react';
import LoginForm from './LoginForm';
import { LoginLoader } from '../preloader/loginLoader';
import { LoginType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/authReducer';
import { getIsRequesting } from '../../redux/selectors/auth-selectors';
import { getIsFetching } from '../../redux/selectors/users-selectors';
import bgimg from './../../assets/images/forest.jpg';

type LoginPageType = {
}
let Login: React.FC<LoginPageType> = (props) => {
    const isRequesting = useSelector(getIsRequesting);
    const isFetching = useSelector(getIsFetching);

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginType) => {
        dispatch(setLogin(formData));
    }

    let Style = {
        "width": "100vw",
        "height": "100vh",
        backgroundImage: "url(" + bgimg + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    return isFetching
        ? null
        : (<div className={classes.loginWrapper} style={Style} >
            <div className={classes.loginFormWrapper}>
                <LoginForm
                    onSubmit={onSubmit}
                />
                {isRequesting ? <LoginLoader /> : null}
            </div>
        </div>)
}

export default Login;