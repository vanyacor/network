import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST';
const UPDATE_NEW_POST_TEXT = 'profile/UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const TOOGLE_IS_FETCHING = 'profile/TOOGLE_IS_FETCHING';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCES = 'profile/SAVE_PHOTO_SUCCES';
const SET_IS_PHOTO_SAVING = 'profile/SET_IS_PHOTO_SAVING';

let initialState = {
    posts: [/* 
        { id: 1, message: 'Hi, how are you?', likesCount: "22" },
        { id: 2, message: "Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post ", likesCount: "23" },
        { id: 3, message: 'It\'s my first post', likesCount: "2" },
     */],
    newPostText: '',
    profile: null,
    isFetching: false,
    isPhotoSaving: false,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newpost = {
                id: state.posts.length + 1,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newpost],
                newPostText: '',
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case TOOGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCES:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                },
            };
        case SET_IS_PHOTO_SAVING:
            return {
                ...state,
                isPhotoSaving: action.isSaving,
            }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST, });

export const updateNewPostTextActionCreator = (newText) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText,
});
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile,
});
export const setIsFetching = (isFetching) => ({
    type: TOOGLE_IS_FETCHING,
    isFetching,
});

export const setStatus = (status) => ({
    type: SET_STATUS,
    status,
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});
export const savePhotoSucces = (photos) => ({
    type: SAVE_PHOTO_SUCCES,
    photos,
});

export const setIsPhotoSaving = (isSaving) => ({
    type: SET_IS_PHOTO_SAVING,
    isSaving,
});

export const getUser = (urlUserId, authUserId) => async (dispatch) => {
    let userId = urlUserId;
    if (!userId) {
        userId = authUserId;
    }
    dispatch(setIsFetching(true));
    let data = await usersAPI.getProfile(userId);
    if (data) {
        dispatch(setUserProfile(data));
    }
    dispatch(setIsFetching(false));
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    if (data) {
        dispatch(setStatus(data));
    }
}

export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    dispatch(setIsPhotoSaving(true));
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSucces(data.data.photos));
    }
    dispatch(setIsPhotoSaving(false));
}

export default profileReducer;