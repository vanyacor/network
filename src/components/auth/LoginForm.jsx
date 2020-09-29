import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './Login.module.css';
import { maxlength, required } from './../../validater/validtate';

let maxlength100 = maxlength(100);

let input = ({input, metam, ...props}) => {
    let haserror = props.meta.touched && props.meta.error;
    let styleError = haserror ? classes.error : "";
    return (<input className={classes.inputs + " " + styleError} {...input} {...props}></input>)
}

let LoginForm = (props) => {
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
            <div className={classes.checkbox}><Field type={"checkbox"} name={"rememberMe"} component={"input"} /> remember me</div>
            <button className={classes.submitBtn + " " + classes.inputs}>Login</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

export default LoginReduxForm;