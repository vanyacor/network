import axios from 'axios';
import { ProfileType, UserType } from '../types/types';

export const instance = axios.create({
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


export type TheMostCommonResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    fieldsErrors?: any
    messages: Array<string>
}