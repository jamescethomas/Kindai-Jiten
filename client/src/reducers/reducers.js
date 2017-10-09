import Cookies from 'universal-cookie';

import config from 'config.js';

import { combineReducers } from 'redux'
import {
  CHANGE_LANGUAGE,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from 'actions/actions.js'

function language (state = [], action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      // Set the language cookie
      const cookies = new Cookies();
      cookies.set(config.APP_NAME + '-language', action.language, { path: '/' });

      // Update the state
      state = action.language;
      return state;
    default:
      return state
  }
}

function user (state = [], action) {
  const cookies = new Cookies();

  switch (action.type) {
    case LOGIN_USER:
      state = {
        loggedIn: true,
        data: action.userData
      }
console.log("LOGIN");
      // Save the user in the cookies
      cookies.set(config.APP_NAME + '-user', state, { path: '/' });
      return state;
    case LOGOUT_USER:
      state = {
        loggedIn: false,
        data: {}
      }

console.log("LOGOUT");
      // Save the user in the cookies
      cookies.set(config.APP_NAME + '-user', state, { path: '/' });

      return state;
    case UPDATE_USER:
      var user = cookies.get(config.APP_NAME + '-user');
      user.data.user.userName = action.userName;

console.log("UPDATE");
      // Save the user in the cookies
      cookies.set(config.APP_NAME + '-user', user, { path: '/' });

      return user;
    default:
      return state;
  }
}

const reducers = combineReducers({
  language,
  user
})

export default reducers
