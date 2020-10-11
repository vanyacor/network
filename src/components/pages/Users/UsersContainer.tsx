import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';
import { getUsers, setFollowing } from '../../../redux/usersReducer';
import { UserType } from '../../../types/types';
import Users from './Users';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
};

type MapDispatchPropsType = {
    setFollowing: (isToFollow: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged(page: number) {
        if (page != this.props.currentPage && !this.props.isFetching) {
            this.props.getUsers(page, this.props.pageSize);
        }
    }

    render() {
        return <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged.bind(this)}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            setFollowing={this.props.setFollowing}
        ></Users>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
});

/* let mapDispatchToProps = (dispatch) => {
    return {
        setIsFetching: isFetching => {
            dispatch(setIsFetchingAC(isFetching));
        },
        getUsers: (currentPage, pageSize) => {
            dispatch(getUsers(currentPage, pageSize))
        }
    };
}; */

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType>(mapStateToProps, {
        getUsers,
        setFollowing
    })
)(UsersContainer);;