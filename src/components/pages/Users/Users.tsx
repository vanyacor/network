import React from 'react';
import classes from './Users.module.css'
import User from './User/User';
import Loader from '../../preloader/Loader';
import Paginator from './paginator';
import { UserType } from '../../../types/types';
import BottomBar from '../../BottomBar/BottomBar';
import { UsersSearchForm } from './UsersSearchForm'; import { useSelector } from 'react-redux';
import { getFollowingInProgress, getIsFetching } from '../../../redux/selectors/users-selectors';
import { getUsers } from './../../../redux/selectors/users-selectors';
import { useHistory } from 'react-router-dom';

type PropsType = {
}

let Users: React.FC<PropsType> = (props) => {
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFetching = useSelector(getIsFetching);
    const users = useSelector(getUsers);


    return (
        <div className={classes.users} key='users'>
            <UsersSearchForm />
            <div className={classes.wrapper_users}>
                {
                    isFetching ?
                        <Loader /> :
                        users.map((u: UserType) => (
                            <User
                                key={u.id}
                                user={u}
                                followingInProgress={followingInProgress}
                            />))
                }
            </div>
            <BottomBar >
                <Paginator isFetching={isFetching} />
            </BottomBar>
        </div>);
}



export default Users;