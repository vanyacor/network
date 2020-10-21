import { AppStateType } from "../redux-store";

export const getProfile = (state: AppStateType) => state.profilePage.profile;
export const getIsFetching = (state: AppStateType) => state.profilePage.isFetching;
export const getUserId = (state: AppStateType) => state.auth.userId;
export const getProfileStatus = (state: AppStateType) => state.profilePage.status;
export const getIsPhotoSaving = (state: AppStateType) => state.profilePage.isPhotoSaving;
