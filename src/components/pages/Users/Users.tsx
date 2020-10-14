import React from 'react';
import classes from './Users.module.css'
import User from './User/User';
import Loader from '../../preloader/Loader';
import Paginator from './paginator';
import { UserType } from '../../../types/types';
import BottomBar from '../../BottomBar/BottomBar';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: Array<number>

    onPageChanged: (p: number) => void
    setFollowing: (isToFollow: boolean, userId: number) => void
}

let Users: React.FC<PropsType> = ({
    totalUsersCount,
    pageSize,
    currentPage,
    onPageChanged,
    users,
    isFetching,
    followingInProgress,
    setFollowing,
    ...props
}) => {
    return (<div className={classes.users} key='users'>
        <div>{
            isFetching ?
                <Loader /> :
                users.map(u => (
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        setFollowing={setFollowing}
                    />))
        }
        </div>
        <BottomBar >
                <Paginator
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged} />
        </BottomBar>
    </div>);
}

export default Users;