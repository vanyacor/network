import { usersAPI } from '../api/api';
import { updateObjectInArray } from './../utils/object-helpers';
import { UserType } from './../types/types';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: UsersActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.pageCount,
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case 'TOGGLE_FOLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId),
            }
        default:
            return state;
    }
};


//ACtion TYPES

type UsersActionsTypes = InferActionsTypes<typeof UsersActions>;

export const UsersActions = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => {
        return ({ type: 'SET_USERS', users } as const)
    },
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (pageCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', pageCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    setFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'TOGGLE_FOLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const),
}


type UsersThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionsTypes>;
export const getUsers = (
    currentPage: number,
    pageSize: number
): UsersThunkType => async (dispatch, getState) => {
    dispatch(UsersActions.setIsFetching(true));
    dispatch(UsersActions.setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);
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

    if (data.resultCode === 0) {
        dispatch(action(userId));
    }
    dispatch(UsersActions.setFollowingProgress(false, userId));
}


export default usersReducer;