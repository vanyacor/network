import React from 'react';
import './App.css';
import AuthContainer from './components/auth/AuthContainer';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

const App = (props) => {
    return (
        <div className="app-wrapper">
            <AuthContainer />
        </div>
    );
}
const AppContainer = (props) => {
    return (
            <HashRouter >
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
    )
}

export default AppContainer;
