import { updateObjectInArray } from './../utils/object-helpers';
import { UserType } from './../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { usersAPI } from './../api/users-api';
import { ResultCodesEnum } from '../api/api';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
    filter: {
        term: '',
        friend: null as null | boolean,
    }
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

export const usersReducer = (state = initialState, action: UsersActionsTypes): InitialStateType => {
    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
            };
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
            };
        case 'users/SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        case 'users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'users/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.pageCount,
            }
        case 'users/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case 'users/TOGGLE_FOLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        case 'users/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
};


//ACtion TYPES

type UsersActionsTypes = InferActionsTypes<typeof UsersActions>;

export const UsersActions = {
    follow: (userId: number) => ({ type: 'users/FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'users/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => {
        return ({ type: 'users/SET_USERS', users } as const)
    },
    setCurrentPage: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (pageCount: number) => ({ type: 'users/SET_TOTAL_USERS_COUNT', pageCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
    setFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'users/TOGGLE_FOLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'users/SET_FILTER', payload: filter
    } as const),
}


type UsersThunkType = BaseThunkType<UsersActionsTypes>;
export const getUsers = (
    currentPage: number,
    pageSize: number,
    filter: FilterType
): UsersThunkType => async (dispatch, getState) => {
    dispatch(UsersActions.setIsFetching(true));
    dispatch(UsersActions.setCurrentPage(currentPage));
    dispatch(UsersActions.setFilter(filter));

    let data = await usersAPI.getUsers(currentPage, pageSize, filter);
    if (!data.error) {
        dispatch(UsersActions.setIsFetching(false));
        dispatch(UsersActions.setUsers(data.items));
        dispatch(UsersActions.setTotalUsersCount(data.totalCount));
    };
};

export const setFollowing = (
    isToFollow: boolean,
    userId: number
): UsersThunkType => async (dispatch, getState) => {
    let request = isToFollow ? usersAPI.follow : usersAPI.unfollow;
    let action = isToFollow ? UsersActions.follow : UsersActions.unfollow;

    dispatch(UsersActions.setFollowingProgress(true, userId));
    let data = await request(userId);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(action(userId));
    }
    dispatch(UsersActions.setFollowingProgress(false, userId));
}


export default usersReducer;