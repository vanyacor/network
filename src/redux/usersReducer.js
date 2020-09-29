import { usersAPI } from '../api/api';
import { updateObjectInArray } from './../utils/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLOWING_PROGRESS = 'users/TOGGLE_FOLOWING_PROGRESS';



let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true  }),
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = pageCount => ({ type: SET_TOTAL_USERS_COUNT, pageCount });
export const setIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setFollowingProgress = (followingInProgress, userId) => ({
    type: TOGGLE_FOLOWING_PROGRESS,
    followingInProgress,
    userId
});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    if (!data.error) {
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

export const setFollowing = (isToFollow, userId) => async (dispatch) => {
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