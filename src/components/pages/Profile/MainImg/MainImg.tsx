import React from 'react';
import classes from './MainImg.module.css'
import ProfileStatus from './ProfileStatus';
import { ThunkAction } from 'redux-thunk';

type MainImgType = {
    status: string
    updateStatus: (status: string) => ThunkAction<Promise<void>, any, any, any>
    profileUser: number
}
const MainImg: React.FC<MainImgType> = (props) => {
    return (
        <div className={classes.img}>
            <ProfileStatus
                status={props.status ? props.status : ''}
                updateStatus={props.updateStatus}
                profileUser={props.profileUser}
                />
        </div>
    );
}

export default MainImg;