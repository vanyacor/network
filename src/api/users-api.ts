import { FilterType } from '../redux/usersReducer';
import { UserType } from '../types/types';
import { instance, TheMostCommonResponseType } from './api';

type GetUserRType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type FollowUnfollowResponseType = TheMostCommonResponseType;


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, filter: FilterType) {
        return instance.get<GetUserRType>(`users?count=${pageSize}&page=${currentPage}&term=${filter.term}` + (filter.friend === null ? '' : `&friend=${filter.friend}`))
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userId}`, {})
            .then(response => response.data);
    },
    unfollow(userId: number) {
        return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}