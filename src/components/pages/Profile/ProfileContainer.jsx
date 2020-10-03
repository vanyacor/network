import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUser, getStatus, updateStatus, setStatus, savePhoto, saveProfile } from './../../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentWillMount() {
        this.props.getUser(this.props.match.params.userId, this.props.userId);
        this.props.getStatus(this.props.match.params.userId || this.props.userId);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.props.getUser(this.props.match.params.userId, this.props.userId);
            this.props.getStatus(this.props.match.params.userId || this.props.userId);
        }
    }
    render() {
        return <Profile {...this.props}
            profile={this.props.profile}
            owner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto} 
            isPhotoSaving={this.props.isPhotoSaving}></Profile>


    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
        userId: state.auth.userId,
        status: state.profilePage.status,
        isPhotoSaving: state.profilePage.isPhotoSaving,
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, setStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer);;