import React from 'react';
import Avatar from './Avatar';
import classes from './Avatar.module.css';
import youtube from './../../../../assets/images/youtube.svg'

const ProfileInfo = (props) => {
    return (
        <div className={classes.profile__avatar}>
            <Avatar
                isOwner={props.isOwner}
                photo={props.profile.photos.large}
                savePhoto={props.savePhoto}
                isPhotoSaving={props.isPhotoSaving}
            />
            <div className={classes.fullName}>
                <span>
                    {props.profile.fullName}

                </span>
            </div>
            <div className={classes.lookFJ}>
                <span className={classes.bold}>
                    Looking for a job:
                </span>
                <span>
                    {props.profile.lookingForAJob
                        ? "Yes"
                        : "No"}
                </span>
            </div>
            <div className={classes.lookFJD}>
                <span>
                    {props.profile.lookingForAJobDescription}
                </span>
            </div>
            <div className={classes.aboutMe}>
                <span className={classes.bold}>
                    About me:
                </span>
                <span>
                    {props.profile.aboutMe}
                </span>
            </div>
            <div>
                <a href={"https://youtube.com"}>
                    <img src={youtube}/>
                </a>
            </div>
        </div>
    );

}

export default ProfileInfo;