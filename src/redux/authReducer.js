import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_IS_FETCHING = 'auth/SET_IS_FETCHING';
const SET_IS_REQUESTING = 'auth/SET_IS_REQUESTING';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    isRequesting: false,
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

export const setAuth = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await authAPI.setAuth();

    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
    dispatch(setIsFetching(false));
}

export const setLogin = (loginData) => async (dispatch) => {
    dispatch(setIsRequesting(true));
    let { login, password, rememberMe } = loginData;
    let data = await authAPI.setLogin(login, password, rememberMe);

    if (data.resultCode === 0) {
        dispatch(setAuth());
    } else {
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

export default authReducer;