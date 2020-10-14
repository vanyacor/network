import React, { useState } from 'react';
import classes from './Profile.module.css';
import MainImg from './MainImg/MainImg';
import ProfileInfo from './Avatar/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loader from '../../preloader/Loader';
import ProfileEditor from './Avatar/ProfileEditor';
import { ProfileType } from '../../../types/types';
import { ThunkAction } from 'redux-thunk';
import BottomBar from './../../BottomBar/BottomBar';
import { LoginName } from '../../LoginName/LoginName';


type ProfileTypes = {
    saveProfile: (
        formData: ProfileType,
        activateEditMode: (isEditActivated: boolean) => void,
        setIsFetching: (isFetching: boolean) => void) => ThunkAction<Promise<void>, any, any, any>
    owner: boolean
    profile: ProfileType
    isFetching: boolean
    status: string
    userId: number
    setStatus: (status: string) => { type: string, status: string }
    updateStatus: (status: string) => ThunkAction<Promise<void>, any, any, any>
    savePhoto: (file: File) => ThunkAction<Promise<void>, any, any, any>
    isPhotoSaving: boolean
}
const Profile: React.FC<ProfileTypes> = ({ saveProfile, ...props }) => {
    let [editMode, setEditMode] = useState(false);
    let [isFetching, setFetching] = useState(false);

    const activateEditMode = (isEditActivated: boolean) => {
        if (props.owner) {
            setEditMode(isEditActivated);
        }
    };

    const setIsFetching = (isFetching: boolean) => {
        setFetching(isFetching);
    }

    const onSubmit = (formData: ProfileType): void => {
        saveProfile(formData, activateEditMode, setIsFetching);
    }

    if (!props.profile || props.isFetching) {
        return <Loader ></Loader>
    }
    return (
        <div className={classes.profile}>
            {editMode
                ? <ProfileEditor
                    activateEditMode={activateEditMode}
                    onSubmit={onSubmit}
                    isFetching={isFetching}
                    profile={props.profile}
                    initialValues={props.profile}
                />
                : <><MainImg
                    status={props.status}
                    // @ts-ignore
                    profileUser={props.match.params.userId}
                    updateStatus={props.updateStatus}
                />
                    <ProfileInfo profile={props.profile}
                        isOwner={props.owner}
                        savePhoto={props.savePhoto}
                        isPhotoSaving={props.isPhotoSaving}
                        activateEditMode={activateEditMode}
                    />
                    <MyPostsContainer /></>}
            <BottomBar>
                <div></div>
                <LoginName />
            </BottomBar>
        </div>
    )
}
export default Profile;