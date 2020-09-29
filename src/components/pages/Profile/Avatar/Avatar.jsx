import React from 'react';
import classes from './Avatar.module.css';

const Avatar = (props) => {
    return (
            <div className={classes.profile__avatar}>
                <img className={classes.avatar} src={props.profile.photos.large} />
                <div className={classes.fullName}><span>{props.profile.fullName}</span></div>
                <div className={classes.lookFJ}><span className={classes.bold}>Looking for a job: </span><span>{props.profile.lookingForAJob ? "Yes" : "No"}</span></div>
                <div className={classes.lookFJD}><span>{props.profile.lookingForAJobDescription}</span></div>
                <div className={classes.aboutMe}><span className={classes.bold}>About me: </span><span>{props.profile.aboutMe}</span></div>
            </div>
    );

}

export default Avatar;