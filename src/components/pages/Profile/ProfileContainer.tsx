import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUser, getStatus, updateStatus, savePhoto, saveProfile, ProfileActions } from '../../../redux/profileReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';
import { ThunkAction } from 'redux-thunk';
import { getProfile, getUserId, getIsFetching, getProfileStatus, getIsPhotoSaving } from './../../../redux/selectors/profile-selectors';
type MapStateToPropsProfileType = {
    isPhotoSaving: boolean
    profile: ProfileType
    isFetching: boolean
    userId: number
    status: string
}

type MapDispatchProfileType = {
    getUser: (urlUserId: number | null, authUserId: number) => ThunkAction<Promise<void>, any, any, any>
    getStatus: (userId: number) => void
    savePhoto: (file: File) => ThunkAction<Promise<void>, any, any, any>
    saveProfile: (
        formData: ProfileType,
        activateEditMode: (isEditActivated: boolean) => void,
        setIsFetching: (isFetching: boolean) => void) => ThunkAction<Promise<void>, any, any, any>
    setStatus: (status: string) => { type: string, status: string }
    updateStatus: (status: string) => ThunkAction<Promise<void>, any, any, any>
}

type OwnPropsProfileType = {
    match: Object
}

type PathParamsType = {
    userId: string
}



type PropsType = MapStateToPropsProfileType & MapDispatchProfileType & OwnPropsProfileType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    componentWillMount() {
        this.props.getUser(+this.props.match.params.userId, this.props.userId);
        this.props.getStatus(+this.props.match.params.userId || this.props.userId);
    }
    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.props.getUser(+this.props.match.params.userId, this.props.userId);
            this.props.getStatus(+this.props.match.params.userId || this.props.userId);
        }
    }
    render() {
        return <Profile {...this.props}
            profile={this.props.profile}
            owner={!+this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            isPhotoSaving={this.props.isPhotoSaving}
            saveProfile={this.props.saveProfile}></Profile>


    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsProfileType => {
    return {
        profile: getProfile(state),
        isFetching: getIsFetching(state),
        userId: getUserId(state),
        status: getProfileStatus(state),
        isPhotoSaving: getIsPhotoSaving(state),
    }
}
export default compose<React.ComponentType>(
    connect<MapStateToPropsProfileType, MapDispatchProfileType>(mapStateToProps, {
        getUser,
        getStatus,
        updateStatus,
        setStatus: ProfileActions.setStatus,
        savePhoto,
        saveProfile
    }),
    withRouter
)(ProfileContainer);;