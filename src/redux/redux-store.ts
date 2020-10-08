import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { Action } from 'redux';

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");


let rootReducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

type RootReducersType = typeof rootReducers; // (globalstate: AppStateType) => AppStateType 
export type AppStateType = ReturnType<RootReducersType>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


export type BaseThunkType<A extends Action, E = unknown, R = Promise<void>> = ThunkAction<R, AppStateType, E, A>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.storeEE = store;

export default store;