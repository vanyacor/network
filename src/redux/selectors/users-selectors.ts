import { AppStateType } from "../redux-store";

export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;
export const getUsers = (state: AppStateType) => state.usersPage.users;
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress;
export const getFilter = (state: AppStateType) => state.usersPage.filter;