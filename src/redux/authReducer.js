import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_FETCHING = 'auth/SET_IS_FETCHING';
const SET_IS_REQUESTING = 'auth/SET_IS_REQUESTING';
const GET_CAPTCHA_URL_SUCCES = 'auth/GET_CAPTCHA_URL_SUCCES';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    isRequesting: false,
    captchaUrl: null,  //if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {
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



export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING,
    isFetching,
});

export const setIsRequesting = (isRequesting) => ({
    type: SET_IS_REQUESTING,
    isRequesting
});

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login,
        isAuth,
    }
});

export const setCaptchaUrl = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCES,
    captchaUrl,
});

export const setAuth = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await authAPI.setAuth();

    if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    dispatch(setIsFetching(false));
}

export const setLogin = (loginData) => async (dispatch, getState) => {
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

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(setCaptchaUrl(captchaUrl));
}

export default authReducer;