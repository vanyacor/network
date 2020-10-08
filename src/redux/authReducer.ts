import { stopSubmit } from 'redux-form';
import { ResultCodesEnum, ResultCodesForCaptcha } from '../api/api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { authAPI } from './../api/auth-api';
import { securityAPI } from './../api/security-api';
import { LoginType } from '../types/types';

/* const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_FETCHING = 'auth/SET_IS_FETCHING';
const SET_IS_REQUESTING = 'auth/SET_IS_REQUESTING';
const GET_CAPTCHA_URL_SUCCES = 'auth/GET_CAPTCHA_URL_SUCCES';
 */

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

const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
            };
        case 'SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case 'SET_IS_REQUESTING':
            return {
                ...state,
                isRequesting: action.isRequesting
            }
        case 'GET_CAPTCHA_URL_SUCCES':
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default:
            return state;
    }
};

type AuthActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setIsFetching: (isFetching: boolean) => ({
        type: 'SET_IS_FETCHING',
        isFetching,
    } as const),
    setIsRequesting: (isRequesting: boolean) => ({
        type: 'SET_IS_REQUESTING',
        isRequesting
    } as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        data: {
            userId,
            email,
            login,
            isAuth,
        }
    } as const),
    setCaptchaUrl: (captchaUrl: string | null) => ({
        type: 'GET_CAPTCHA_URL_SUCCES',
        captchaUrl,
    } as const),
}
// SET_IS_FETCHIN ACTION CREATOR


type AuthThunksType = BaseThunkType<AuthActionsType>;

export const setAuth = (): AuthThunksType => async (dispatch, getState) => {
    dispatch(authActions.setIsFetching(true));
    let data = await authAPI.setAuth();

    if (data.resultCode === ResultCodesEnum.Success) {
        const { id, email, login } = data.data;
        dispatch(authActions.setAuthUserData(id, email, login, true));
    }
    dispatch(authActions.setIsFetching(false));
}

export const setLogin = (loginData: LoginType): AuthThunksType => async (dispatch, getState) => {
    dispatch(authActions.setIsRequesting(true));
    let { login, password, rememberMe, captcha } = loginData;
    let data = await authAPI.setLogin(login, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        const captchaUrl = getState().auth.captchaUrl;

        dispatch(setAuth());
        if (captchaUrl) {
            dispatch(authActions.setCaptchaUrl(null));
        }
    } else {
        if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error.";
        // @ts-ignore
        dispatch(stopSubmit("login", { _error: message }))
    }
    dispatch(authActions.setIsRequesting(false));
}

export const logout = (): AuthThunksType => async (dispatch, getState) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): AuthThunksType => async (dispatch, getState) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(authActions.setCaptchaUrl(captchaUrl));
}

export default authReducer;