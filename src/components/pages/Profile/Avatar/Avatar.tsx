import React, { BaseSyntheticEvent } from 'react';
import classes from './Avatar.module.css';
import userPhoto from '../../../../assets/images/autoAvatar.png';
import { SavePhotoLoader } from '../../../preloader/SavePhotoLoader';
import { ThunkAction } from 'redux-thunk';


type AvatarType = {
    savePhoto: (file: File) => ThunkAction<Promise<void>, any, any, any>
    isPhotoSaving: boolean
    photo: string
    isOwner: boolean
}
const Avatar: React.FC<AvatarType> = (props) => {

    const omMainPhotoSelected = (e: BaseSyntheticEvent) => {
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