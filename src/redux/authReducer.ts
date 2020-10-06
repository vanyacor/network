import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_FETCHING = 'auth/SET_IS_FETCHING';
const SET_IS_REQUESTING = 'auth/SET_IS_REQUESTING';
const GET_CAPTCHA_URL_SUCCES = 'auth/GET_CAPTCHA_URL_SUCCES';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    isRequesting: false,
    captchaUrl: null as string | null,  //if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case SET_IS_REQUESTING:
            return {
                ...state,
                isRequesting: action.isRequesting
            }
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default:
            return state;
    }
};

// SET_IS_FETCHIN ACTION CREATOR
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING,
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
    type: SET_IS_FETCHING,
    isFetching,
});

// SET_IS_REQUESTING ACTION CREATOR
type SetIsRequestingActionType = {
    type: typeof SET_IS_REQUESTING,
    isRequesting: boolean
}
export const setIsRequesting = (isRequesting: boolean): SetIsRequestingActionType => ({
    type: SET_IS_REQUESTING,
    isRequesting
});

// SET_USER_DATA ACTION CREATOR
type DataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: DataType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login,
        isAuth,
    }
});

//  GET_CAPTCHA_URL_SUCCES ACTION CREATOR
type SetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCES,
    captchaUrl: string | null
}
export const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL_SUCCES,
    captchaUrl,
});

export const setAuth = () => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    let data = await authAPI.setAuth();

    if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    dispatch(setIsFetching(false));
}

export const setLogin = (loginData: any) => async (dispatch: any, getState: Function) => {
    dispatch(setIsRequesting(true));
    let { login, password, rememberMe, captcha } = loginData;
    let data = await authAPI.setLogin(login, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        const captchaUrl = getState().auth.captchaUrl;

        dispatch(setAuth());
        if (captchaUrl) {
            dispatch(setCaptchaUrl(null));
        }
    } else {
        if (data.resultCode === 10) {
            await dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error.";
        dispatch(stopSubmit("login", { _error: message }))
    }
    dispatch(setIsRequesting(false));
}

export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(setCaptchaUrl(captchaUrl));
}

export default authReducer;