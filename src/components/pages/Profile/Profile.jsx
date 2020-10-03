import React, { useState } from 'react';
import classes from './Profile.module.css';
import MainImg from './MainImg/MainImg';
import ProfileInfo from './Avatar/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loader from '../../preloader/Loader';
import ProfileEditor from './Avatar/ProfileEditor';

const Profile = ({ saveProfile, ...props }) => {
    let [editMode, setEditMode] = useState(false);
    let [isFetching, setFetching] = useState(false);

    const activateEditMode = (isEditActivated) => {
        if (props.owner) {
            setEditMode(isEditActivated);
        }
    };

    const setIsFetching = (isFetching) => {
        setFetching(isFetching);
    }

    const onSubmit = (formData) => {
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
                    currentUser={props.userId}
                    profileUser={props.match.params.userId}
                    setStatus={props.setStatus}
                    updateStatus={props.updateStatus}
                />
                    <ProfileInfo profile={props.profile}
                        isOwner={props.owner}
                        savePhoto={props.savePhoto}
                        isPhotoSaving={props.isPhotoSaving}
                        activateEditMode={activateEditMode}
                    />
                    <MyPostsContainer /></>}

        </div>
    )
}
export default Profile;