import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import AppContainer from './App';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);


serviceWorker.unregister();
