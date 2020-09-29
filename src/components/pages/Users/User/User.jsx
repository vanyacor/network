import React from 'react';
import classes from './User.module.css';
import userPhoto from '../../../../assets/images/autoAvatar.png';
import { NavLink } from 'react-router-dom';

const User = (props) => {
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
                    <span>{/* {"country"}, {"city"} */}</span>
                </div>
                <div className={classes.status}>{props.user.status}</div>
                {props.user.followed
                    ? <button disabled={props.followingInProgress.some(id=> id == props.user.id)} onClick={unFollow} className={classes.followBtn + ' ' + classes.unsubscribe}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id=> id == props.user.id)} onClick={follow} className={classes.followBtn + ' ' + classes.subscribe}>Follow</button>}
            </div>
        </div>
    );
}

export default User;