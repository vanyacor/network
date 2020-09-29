import React from 'react';
import classes from './Users.module.css'
import User from './User/User';
import Loader from './../../preloader/Loader';
import Paginator from './paginator';

let Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, ...props }) => {
    return (<div className={classes.users} key='users'>
        <div className={classes.pagesCountWrapper}>
            <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged} />
        </div>
        <div>{
            props.isFetching ?
                <Loader /> :
                props.users.map(u => (
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={props.followingInProgress}
                        setFollowing={props.setFollowing}
                    />))
        }
        </div>
    </div>);
}

export default Users;