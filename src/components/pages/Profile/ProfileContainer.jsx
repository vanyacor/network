import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUser, getStatus, updateStatus, setStatus } from './../../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentWillMount() {
        this.props.getUser(this.props.match.params.userId, this.props.userId);
        this.props.getStatus(this.props.match.params.userId || this.props.userId);
    }   
    render() {
        return <Profile {...this.props} profile={this.props.profile} ></Profile>


    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
        userId: state.auth.userId,
        status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, setStatus }),
    withRouter
)(ProfileContainer);;