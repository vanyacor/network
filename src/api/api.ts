import axios from 'axios';
import { ProfileType, UserType } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "87461443-1f05-4d8f-a52d-f48cf152a8bf",
    }
});


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}


type GetUserRType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type FollowUnfollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUserRType>(`users?count=${pageSize}&page=${currentPage}`)
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
    getProfile(userId: number) {
        console.warn('Obsolete methed. Please use profileAPI method');
        return profileAPI.getProfile(userId)
    }
}


type GetProfileRType = ProfileType;
type PutStatusResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type SavePhotoResponseType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type SaveProfileResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileRType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<any>(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<PutStatusResponseType>(`profile/status`, {
            status,
        })
            .then(response => {
                return response.data
            });
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoResponseType>(`profile/photo`, formData)
            .then(response => {
                return response.data;
            });
    },
    saveProfile(profileData: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile`, profileData)
            .then(response => {
                return response.data;
            });
    }
}



type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    setAuth() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data);
    },
    setLogin(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        })
            .then(response => {
                return response.data;
            })
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(response => {
                return response.data;
            })
    },
};


type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`);
    }
}

