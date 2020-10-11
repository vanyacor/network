import { AppStateType } from "../redux/redux-store"

//PROFILEPAGE
export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string

}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?: string
}


//USERSPAGE
export type UserType = {
    followed?: boolean
    id: number
    name: string
    status: string
    photos: PhotosType
}


// DIALOGS REDUCER
export type DialogsUsersType = {
    id: number
    name: string
}
export type MessagesDataType = {
    user: string
    id: number
    message: string
}
export type InitialStateType = {
    dialogs: Array<DialogsUsersType>,
    messagesData: Array<MessagesDataType>,
    newMessageText: string
}

//Reducers 

export type GetStateType = () => AppStateType;

// LOGIN 

export type LoginResponseType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth?: boolean
}

export type LoginType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}