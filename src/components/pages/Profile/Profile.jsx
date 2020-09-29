import React from 'react';
import classes from './Profile.module.css';
import MainImg from './MainImg/MainImg';
import Avatar from './Avatar/Avatar';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Loader from '../../preloader/Loader';

const Profile = (props) => {
    if (!props.profile || props.isFetching) {
        return <Loader ></Loader>
    }
    return (
        <div className={classes.profile}>
            <MainImg
                status={props.status}
                currentUser={props.userId}
                profileUser={props.match.params.userId}
                setStatus={props.setStatus}
                updateStatus={props.updateStatus} 
                />
            <Avatar profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;