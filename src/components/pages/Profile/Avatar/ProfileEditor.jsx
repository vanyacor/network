import React from "react";
import { Field, reduxForm } from "redux-form";
import classes from './ProfileEditor.module.css';
import { maxlength, required } from './../../../../validater/validtate';

let maxlength200 = maxlength(200);

let editorInput = ({ input, metam, ...props }) => {
    let haserror = props.meta.touched && props.meta.error;
    let styleError = haserror ? classes.error : "";
    return (<input className={classes.inputs + " " + styleError} {...input} {...props}></input>)
}

let editorTextarea = ({ input, metam, ...props }) => {
    let haserror = props.meta.touched && props.meta.error;
    let styleError = haserror ? classes.error : "";
    return (<textarea className={classes.textarea + " " + styleError} {...input} {...props}></textarea>)
}

const ProfileEditLoader = (props) => {
    return (<div className={classes.fetching}></div>)
}

const ProfileEditor = ({ handleSubmit, ...props }) => {
    return (<div className={classes.profile_editor}>
        {props.isFetching && <ProfileEditLoader />}

        <form onSubmit={handleSubmit} className={classes.editform}>
            <div className={classes.nameblock}>
                <span className={classes.edit_title}>Profile editor</span>
                <button onClick={() => props.activateEditMode(false)} className={classes.closeBtn}>&#10006;</button>
                <Field
                    type={"text"}
                    name={"fullName"}
                    placeholder={"Full name"}
                    component={editorInput}
                    validate={[required, maxlength200]}
                />

                <label className={classes.checkboxlabel}>
                    <Field id={"lookingForAJob"}
                        type={"checkbox"}
                        name={"lookingForAJob"}
                        component={"input"}
                    />looking for a job
            </label>

                <Field
                    type={"textarea"}
                    name={"lookingForAJobDescription"}
                    placeholder={"looking for a job description"}
                    component={editorTextarea}
                    validate={[required, maxlength200]}
                />
            </div>

            <div className={classes.contactBlock}>
                <span className={classes.contacts}>Contats</span>
                {
                    Object.keys(props.profile.contacts).map((key) => {
                        return <Field
                            key={key}
                            type={"text"}
                            name={`contacts.${key}`}
                            placeholder={key}
                            component={editorInput}
                        />
                    })
                }
            </div>
            <div className={classes.aboutmeblock}>
                <span className={classes.aboutMe}>About me</span>
                <Field
                    type={"textarea"}
                    name={"aboutMe"}
                    placeholder={"about me"}
                    component={editorTextarea}
                    validate={[required, maxlength200]}
                />
                {props.error ? <span className={classes.errorEditor}>{props.error}</span> : null}
                <button className={classes.editSavingBtn}>Save</button>
            </div>
        </form>
    </div>);

}

const profileEditReduxForm = reduxForm({ form: 'profileEdit' })(ProfileEditor);

export default profileEditReduxForm;

