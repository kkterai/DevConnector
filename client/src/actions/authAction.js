import {SET_CURRENT_USER} from './types.js';

//Register user
export const registerUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}