import React from 'react';
import classes from './MainImg.module.css'
import ProfileStatus from './ProfileStatus';

const MainImg = (props) => {
    return (
        <div className={classes.img}>
            <ProfileStatus
                status={props.status ? props.status : ''}
                setStatus={props.setStatus}
                updateStatus={props.updateStatus}
                currentUser={props.currentUser}
                profileUser={props.profileUser}
                />
        </div>
    );
}

export default MainImg;