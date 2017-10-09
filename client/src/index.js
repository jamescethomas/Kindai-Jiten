import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers/reducers.js';

import Cookies from 'universal-cookie';
import config from './config.js';

const cookies = new Cookies();

var user = cookies.get(config.APP_NAME + '-user');

const store = createStore(reducers, {
  language: cookies.get(config.APP_NAME + '-language') || 'EN',
  user: {
    loggedIn: (user && user.loggedIn && (user.data && (user.data.expires > Date.now()))) || false,
    data: (user) ? user.data : {}
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
