import { usersAPI } from '../api/api';
import { updateObjectInArray } from './../utils/object-helpers';
import { UserType } from './../types/types';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLOWING_PROGRESS = 'users/TOGGLE_FOLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.pageCount,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case TOGGLE_FOLOWING_PROGRESS:
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

//FOLLOW action creator 
type followType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): followType => ({ type: FOLLOW, userId });

//UNFOLLOW action creator 
type unfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): unfollowType => ({ type: UNFOLLOW, userId });

// SET_USERS action creator
type setUsersType = {
    type: typeof SET_USERS
    users: any
}
export const setUsers = (users: Array<UserType>): setUsersType => {
    debugger;
    return ({ type: SET_USERS, users })
};

// SET_CURRENT_PAGE action creator
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });

//SET_TOTAL_USERS_COUNT action creator
type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    pageCount: number
}
export const setTotalUsersCount = (pageCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, pageCount });

//TOGGLE_IS_FETCHING action creator
type setIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching });

//TOGGLE_FOLOWING_PROGRESS action creator
type setFollowingProgressType = {
    type: typeof TOGGLE_FOLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}
export const setFollowingProgress = (followingInProgress: boolean, userId: number): setFollowingProgressType => ({
    type: TOGGLE_FOLOWING_PROGRESS,
    followingInProgress,
    userId
});

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    if (!data.error) {
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

export const setFollowing = (isToFollow: boolean, userId: number) => async (dispatch: any) => {
    let request = isToFollow ? usersAPI.follow : usersAPI.unfollow;
    let action = isToFollow ? follow : unfollow;

    dispatch(setFollowingProgress(true, userId));
    let data = await request(userId);

    if (data.resultCode == 0) {
        dispatch(action(userId));
    }
    dispatch(setFollowingProgress(false, userId));
}


export default usersReducer;