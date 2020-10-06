import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);


serviceWorker.unregister();
