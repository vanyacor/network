import { AppStateType } from "../redux-store";

export const getIsAuthSelect = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getIsFetchingSelect = (state: AppStateType) => {
    return state.auth.isFetching;
}

export const getLoginSelect = (state: AppStateType) => {
    return state.auth.login;
}

export const getIsRequesting = (state: AppStateType) => {
    return state.auth.isRequesting;
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}