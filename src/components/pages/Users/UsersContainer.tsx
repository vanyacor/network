import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';
import { FilterType, getUsers, setFollowing } from '../../../redux/usersReducer';
import { UserType } from '../../../types/types';
import Users from './Users';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
    filter: FilterType
};

type MapDispatchPropsType = {
    setFollowing: (isToFollow: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged(page: number) {
        const { currentPage, isFetching, filter } = this.props;
        if (page != currentPage && !isFetching) {
            this.props.getUsers(page, this.props.pageSize, filter);
        }
    }

    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props;
        this.props.getUsers(1, pageSize, filter);
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
            onFilterChanged={this.onFilterChanged}
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
    filter: state.usersPage.filter
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