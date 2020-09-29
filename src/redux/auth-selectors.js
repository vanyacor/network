
export const getIsAuthSelect = (state) => {
    return state.auth.isAuth;
}

export const getIsFetchingSelect = (state) => {
    return state.auth.isFetching;
}

export const getLoginSelect = (state) => {
    return state.auth.login;
}
