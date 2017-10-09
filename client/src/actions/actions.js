/*
 * action types
 */
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'

/*
 * action creators
 */
export function changeLanguage(language) {
  return { type: CHANGE_LANGUAGE, language }
}

export function loginUser(userData) {
  return { type: LOGIN_USER, userData }
}

export function logoutUser() {
  return { type: LOGOUT_USER }
}

export function updateUser(userName) {
  return { type: UPDATE_USER, userName }
}
