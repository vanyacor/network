import React, { Dispatch } from 'react';
import { ProfileActions } from '../../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { Action } from 'redux';




let mapStateToProps = (state: AppStateType) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts
    };
};

let mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        addPost: () => {dispatch(ProfileActions.addPostActionCreator())},
        updateNewPostText: (text: string) => {dispatch(ProfileActions.updateNewPostTextActionCreator(text))},
    };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;