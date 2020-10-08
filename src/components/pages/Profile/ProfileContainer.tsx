import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUser, getStatus, updateStatus, savePhoto, saveProfile, ProfileActions } from '../../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type MapStateToPropsProfileType = {
    isPhotoSaving: boolean
    profile: ProfileType
    isFetching: boolean
    userId: number
    status: string
}

type MapDispatchProfileType = {
    getUser: (urlUserId: number | null, authUserId: number) => void
    getStatus: (userId: number) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: Object, setEditMode: Function, setIsFetching: Function) => void
}

type OwnPropsProfileType = {
    match: Object
}

type PropsType = MapStateToPropsProfileType & MapDispatchProfileType & OwnPropsProfileType;

class ProfileContainer extends React.Component<PropsType> {
    componentWillMount() {
        // @ts-ignore
        this.props.getUser(this.props.match.params.userId, this.props.userId);
        // @ts-ignore
        this.props.getStatus(this.props.match.params.userId || this.props.userId);
    }
    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        // @ts-ignore
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            // @ts-ignore
            this.props.getUser(this.props.match.params.userId, this.props.userId);
            // @ts-ignore
            this.props.getStatus(this.props.match.params.userId || this.props.userId);
        }
    }
    render() {
        return <Profile {...this.props}
            profile={this.props.profile}
            // @ts-ignore
            owner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            isPhotoSaving={this.props.isPhotoSaving}></Profile>


    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsProfileType => {
    return {
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
        userId: state.auth.userId,
        status: state.profilePage.status,
        isPhotoSaving: state.profilePage.isPhotoSaving,
    }
}
export default compose(
    connect(mapStateToProps, {
        getUser,
        getStatus,
        updateStatus,
        setStatus: ProfileActions.setStatus,
        savePhoto,
        saveProfile
    }),
    withRouter
)(ProfileContainer);;