import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "87461443-1f05-4d8f-a52d-f48cf152a8bf",
    }
});
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data);
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId) {
        console.warn('Obsolete methed. Please use profileAPI method');
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
            status,
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data
                }
            });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData)
            .then(response => {
                return response.data;
            })
    }
}

export const authAPI = {
    setAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    setLogin(email, password, rememberMe) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
        })
            .then(response => {
                return response.data;
            })
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    return response.data;
                }
            })
    },
};

const set = {};
