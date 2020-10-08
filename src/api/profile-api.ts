import { ProfileType } from "../types/types";
import { instance, TheMostCommonResponseType } from "./api";

type GetProfileRType = ProfileType;
type PutStatusResponseType = TheMostCommonResponseType;
type SavePhotoResponseType = TheMostCommonResponseType<{
    photos: {
        small: string
        large: string
    }
}>;
type SaveProfileResponseType = TheMostCommonResponseType;

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileRType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
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

