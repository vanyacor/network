import dialogsReducer from "./dialogsReducer";
import profileReducer from './profileReducer';

export const store = {

    _state: {
        messagesPage: {
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'VAlera' },
                { id: 7, name: 'Dimych' },
                { id: 8, name: 'Andrey' },
                { id: 9, name: 'Sveta' },
                { id: 10, name: 'Sasha' },
                { id: 11, name: 'Viktor' },
                { id: 12, name: 'VAlera' },
                { id: 13, name: 'Dimych' },
                { id: 14, name: 'Andrey' },
                { id: 15, name: 'Sveta' },
                { id: 16, name: 'Sasha' },
                { id: 17, name: 'Viktor' },
                { id: 18, name: 'VAlera' },
            ],
            messagesData: [
                { user: '', id: 1, message: 'HOho' },
                { user: '', id: 2, message: 'Loldso Loldso Loldso' },
                { user: '', id: 3, message: 'Hasah' },
                { user: '', id: 4, message: 'lrnmrd' },
                { user: 'me', id: 5, message: 'sebsdern sebsdern sebsdern' },
                { user: 'me', id: 6, message: 'privet' },
                { user: 'me', id: 7, message: 'ytop' },
                { user: 'me', id: 8, message: 'Andrey' },
                { user: '', id: 9, message: 'Sveta' },
                { user: '', id: 10, message: 'Sasha' },
                { user: '', id: 11, message: 'Viktor hi' },
                { user: 'me', id: 12, message: 'VAlera' },
                { user: '', id: 13, message: 'HOho' },
                { user: 'me', id: 14, message: 'Loldso Loldso Loldso' },
                { user: 'me', id: 15, message: 'Hasah' },
                { user: 'me', id: 16, message: 'lrnmrd' },
                { user: 'me', id: 17, message: 'sebsdern sebsdern sebsdern' },
                { user: '', id: 18, message: 'privet' },
                { user: '', id: 19, message: 'ytop' },
                { user: '', id: 20, message: 'Andrey' },
                { user: 'me', id: 21, message: 'Sveta' },
                { user: 'me', id: 22, message: 'Sasha' },
                { user: '', id: 23, message: 'Viktor hi' },
                { user: '', id: 24, message: 'VAlera' },
                { user: '', id: 25, message: 'HOho' },
                { user: 'me', id: 26, message: 'Loldso Loldso Loldso' },
                { user: 'me', id: 27, message: 'Hasah' },
                { user: 'me', id: 28, message: 'lrnmrd' },
                { user: 'me', id: 29, message: 'sebsdern sebsdern sebsdern' },
                { user: '', id: 30, message: 'privet' },
                { user: '', id: 31, message: 'ytop' },
                { user: '', id: 32, message: 'Andrey' },
                { user: 'me', id: 33, message: 'Sveta' },
                { user: '', id: 34, message: 'Sasha' },
                { user: '', id: 35, message: 'Viktor hi' },
                { user: 'me', id: 36, message: 'VAlera' },
            ],
            newMessageText: '',
        },
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi, how are you?', likesCount: "22" },
                { id: 2, message: "Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post Its my first post ", likesCount: "23" },
                { id: 3, message: 'It\'s my first post', likesCount: "2" },
            ],
            newPostText: '',
        },
    },
    _callSubscriber() { },

    getState() {return this._state;},
    subscribe(observer) {this._callSubscriber = observer;},


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        
        this._callSubscriber(this._state);
    }
};
window.store = store;