import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from './../types/types';

const ADD_POST = 'profile/ADD-POST';
const UPDATE_NEW_POST_TEXT = 'profile/UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const TOOGLE_IS_FETCHING = 'profile/TOOGLE_IS_FETCHING';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCES = 'profile/SAVE_PHOTO_SUCCES';
const SET_IS_PHOTO_SAVING = 'profile/SET_IS_PHOTO_SAVING';



let initialState = {
    posts: [] as Array<PostType>,
    newPostText: '',
    profile: null as null | ProfileType,
    isFetching: false,
    isPhotoSaving: false,
    status: '',
};
export type InitialStateType = typeof initialState;

const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
                } as ProfileType,
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

//ADD_POST ACTION CREATOR
type addPostActionCreatorActionType = {
    type: typeof ADD_POST
}
export const addPostActionCreator = (): addPostActionCreatorActionType => ({ type: ADD_POST, });

//UPDATE_NEW_POST_TEXT action creator
type updateNewPostTextActionCreatorActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextActionCreator = (newText: string): updateNewPostTextActionCreatorActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText,
});

//SET_USER_PROFILE action creator

type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: Object
}
export const setUserProfile = (profile: Object): setUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile,
});

//TOOGLE_IS_FETCHING action creator
type setIsFetchingActionType = {
    type: typeof TOOGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => ({
    type: TOOGLE_IS_FETCHING,
    isFetching,
});

// SET_STATUS action creator

type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionType => ({
    type: SET_STATUS,
    status,
});


//DELETE_POST action creator 

type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): deletePostActionType => ({
    type: DELETE_POST,
    postId,
});

//SAVE_PHOTO_SUCCES action creator
type savePhotoSuccesActionType = {
    type: typeof SAVE_PHOTO_SUCCES
    photos: PhotosType 
}
export const savePhotoSucces = (photos: PhotosType ): savePhotoSuccesActionType => ({
    type: SAVE_PHOTO_SUCCES,
    photos,
});

//SET_IS_PHOTO_SAVING action creator
type setIsPhotoSavingActionType = {
    type: typeof SET_IS_PHOTO_SAVING
    isSaving: boolean
}
export const setIsPhotoSaving = (isSaving: boolean): setIsPhotoSavingActionType => ({
    type: SET_IS_PHOTO_SAVING,
    isSaving,
});


export const getUser = (urlUserId: number | null, authUserId: number) => async (dispatch: any) => {
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

export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    if (data) {
        dispatch(setStatus(data));
    } else if (data === null) {
        dispatch(setStatus(data));
    }
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        console.error(error);
    }

}
export const savePhoto = (file: File) => async (dispatch: any) => {
    dispatch(setIsPhotoSaving(true));
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSucces(data.data.photos));
    }
    dispatch(setIsPhotoSaving(false));
}

export const saveProfile = (formData: Object, setEditMode: Function, setIsFetching: Function) => async (dispatch: any, getState: Function) => {
    const userId = getState().auth.userId;
    setIsFetching(true);

    const data = await profileAPI.saveProfile(formData);

    if (data.resultCode === 0) {
        setEditMode(false);
        dispatch(getUser(null, userId));
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error.";
        dispatch(stopSubmit("profileEdit", { _error: message })); // {"contacts": {"facebook": message}}
    }
    setIsFetching(false);
};

export default profileReducer;