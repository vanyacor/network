import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {setUsers, setCurrentPage, getUsers, setFollowing } from './../../../redux/usersReducer';
import Users from './Users';


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged(page) {
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

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

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

export default compose(
    connect(mapStateToProps, {
        setUsers,
        setCurrentPage,
        getUsers,
        setFollowing
    })
)(UsersContainer);;