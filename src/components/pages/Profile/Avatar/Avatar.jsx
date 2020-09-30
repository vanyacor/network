import React from 'react';
import classes from './Avatar.module.css';
import userPhoto from '../../../../assets/images/autoAvatar.png';
import { SavePhotoLoader } from './../../../preloader/SavePhotoLoader';

const Avatar = (props) => {

    const omMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return (
        <div className={classes.avatar}>
            {props.isPhotoSaving ? <SavePhotoLoader /> : <img
                className={classes.avatarImg}
                src={props.photo
                    ? props.photo
                    : userPhoto} alt="AVATAR" >
            </img>}
            {props.isOwner && <input
                className={classes.file}
                type={"file"}
                onChange={omMainPhotoSelected} />}
        </div>
    );
}

export default Avatar;