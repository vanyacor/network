import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "06b4f120-b488-4502-9eec-c59462b88a84",
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
    }
};


