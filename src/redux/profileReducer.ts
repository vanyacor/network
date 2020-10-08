import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { profileAPI, ResultCodesEnum } from '../api/api';
import { PhotosType, PostType, ProfileType } from './../types/types';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
    posts: [] as Array<PostType>,
    newPostText: '',
    profile: null as null | ProfileType,
    isFetching: false,
    isPhotoSaving: false,
    status: '',
};
export type InitialStateType = typeof initialState;

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
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
        case 'UPDATE_NEW_POST_TEXT':
            return {
                ...state,
                newPostText: action.newText,
            };
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile,
            }
        case 'TOOGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status,
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case 'SAVE_PHOTO_SUCCES':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType,
            };
        case 'SET_IS_PHOTO_SAVING':
            return {
                ...state,
                isPhotoSaving: action.isSaving,
            }
        default:
            return state;
    }
};

type ProfileActionsTypes = InferActionsTypes<typeof ProfileActions>;

export const ProfileActions = {
    addPostActionCreator: () => ({ type: 'ADD_POST', } as const),
    updateNewPostTextActionCreator: (newText: string) => ({
        type: 'UPDATE_NEW_POST_TEXT',
        newText,
    } as const),
    setUserProfile: (profile: ProfileType) => ({
        type: 'SET_USER_PROFILE',
        profile,
    } as const),
    setIsFetching: (isFetching: boolean) => ({
        type: 'TOOGLE_IS_FETCHING',
        isFetching,
    } as const),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status,
    } as const),
    deletePost: (postId: number) => ({
        type: 'DELETE_POST',
        postId,
    } as const),
    savePhotoSucces: (photos: PhotosType) => ({
        type: 'SAVE_PHOTO_SUCCES',
        photos,
    } as const),
    setIsPhotoSaving: (isSaving: boolean) => ({
        type: 'SET_IS_PHOTO_SAVING',
        isSaving,
    } as const),
}


type ProfileThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionsTypes>;

export const getUser = (
    urlUserId: number | null,
    authUserId: number
): ProfileThunkType => async (dispatch, getState) => {
    let userId = urlUserId;
    if (!userId) {
        userId = authUserId;
    }
    dispatch(ProfileActions.setIsFetching(true));
    let data = await profileAPI.getProfile(userId);
    if (data) {
        dispatch(ProfileActions.setUserProfile(data));
    }
    dispatch(ProfileActions.setIsFetching(false));
}

export const getStatus = (
    userId: number
): ProfileThunkType => async (dispatch, getState) => {
    let data = await profileAPI.getStatus(userId);
    if (data) {
        dispatch(ProfileActions.setStatus(data));
    } else if (data === null) {
        dispatch(ProfileActions.setStatus(data));
    }
}

export const updateStatus = (
    status: string
): ProfileThunkType => async (dispatch, getState) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(ProfileActions.setStatus(status));
        }
    } catch (error) {
        console.error(error);
    }

}
export const savePhoto = (
    file: File
): ProfileThunkType => async (dispatch, getState) => {
    dispatch(ProfileActions.setIsPhotoSaving(true));
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(ProfileActions.savePhotoSucces(data.data.photos));
    }
    dispatch(ProfileActions.setIsPhotoSaving(false));
}

export const saveProfile = (
    formData: ProfileType,
    setEditMode: Function,
    setIsFetching: Function
): ProfileThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    setIsFetching(true);

    const data = await profileAPI.saveProfile(formData);

    if (data.resultCode === ResultCodesEnum.Success) {
        setEditMode(false);
        dispatch(getUser(null, userId));
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error.";
        dispatch(stopSubmit("profileEdit", { _error: message })); // {"contacts": {"facebook": message}}
    }
    setIsFetching(false);
};

export default profileReducer;