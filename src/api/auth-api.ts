import { instance, ResultCodesEnum, ResultCodesForCaptcha, TheMostCommonResponseType } from "./api";




type MeResponseType = TheMostCommonResponseType<{
    id: number
    email: string
    login: string
}>;

type LoginResponseType = TheMostCommonResponseType<{
    userId: number
}, ResultCodesEnum | ResultCodesForCaptcha>

type LogoutResponseType = TheMostCommonResponseType;

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