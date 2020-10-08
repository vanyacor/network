import React from 'react';
import classes from './User.module.css';
import userPhoto from '../../../../assets/images/autoAvatar.png';
import { NavLink } from 'react-router-dom';
import cn from 'classnames/bind';
import { UserType } from '../../../../types/types';

type PropsType = {
    setFollowing: (isToFollow: boolean, userId: number) => void
    user: UserType
    followingInProgress: Array<number>
}

const User: React.FC<PropsType> = (props) => {
    const follow = () => {
        props.setFollowing(true, props.user.id);
    };
    const unFollow = () => {
        props.setFollowing(false, props.user.id);
    };
    return (
        <div className={classes.userContainer}>
            <div className={classes.avatar}>
                <NavLink to={'/profile/' + props.user.id}>
                    <img className={classes.avatar_img} src={(props.user.photos.small) ? props.user.photos.small : userPhoto} alt="avatar" />
                </NavLink>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.data}>
                    <span>{props.user.name}</span>
                    {props.user.followed
                        ? <button
                            disabled={props.followingInProgress.some(id => id == props.user.id)}
                            onClick={unFollow}
                            className={cn(classes.followBtn, classes.unsubscribe)}>Unfollow</button>
                        : <button
                            disabled={props.followingInProgress.some(id => id == props.user.id)}
                            onClick={follow}
                            className={cn(classes.followBtn, classes.subscribe)}>Follow</button>}
                </div>
                <div className={classes.status}>{props.user.status}</div>
            </div>
        </div>
    );
}

export default User;