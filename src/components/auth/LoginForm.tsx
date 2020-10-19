import React from 'react';
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form';
import classes from './Login.module.css';
import { maxlength, required } from '../../validater/validtate';
import { LoginType } from '../../types/types';
import { useSelector } from 'react-redux';
import { getCaptchaUrl } from './../../redux/selectors/auth-selectors';

let maxlength100 = maxlength(100);


let input: React.FC<WrappedFieldProps> = ({ input, meta: {touched, error}, ...props }) => {
    let haserror = touched && error;
    let styleError = haserror ? classes.error : "";
    return (<input className={classes.inputs + " " + styleError} {...input} {...props}></input>)
}

type LoginFormType = {
}

let LoginForm: React.FC<InjectedFormProps<LoginType, LoginFormType> & LoginFormType> = (props) => {
    const captchaUrl = useSelector(getCaptchaUrl);
    
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <span className={classes.loginText}>Welcome to my social network</span>
            {props.error ? <span className={classes.errorLogin}>{props.error}</span> : null}
            <Field
                type={"email"}
                name={"login"}
                placeholder={"Login"}
                component={input}
                validate={[required, maxlength100]}
            />
            <Field
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                component={input}
                validate={[required, maxlength100]}
            />
            {captchaUrl
                ? <>
                    <img src={captchaUrl} />
                    <Field
                        type={"text"}
                        name={"captcha"}
                        placeholder={"captcha"}
                        component={input}
                        validate={[required, maxlength100]}
                    />
                </>
                : null}
            <div className={classes.checkbox}><Field type={"checkbox"} name={"rememberMe"} component={"input"} /> remember me</div>
            <button className={classes.submitBtn + " " + classes.inputs}>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm<LoginType, LoginFormType>({ form: 'login' })(LoginForm);

export default LoginReduxForm;