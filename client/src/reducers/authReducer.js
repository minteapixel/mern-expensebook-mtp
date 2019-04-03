import { AUTH_USER, AUTH_ERROR, LOGIN_USER, LOGOUT_USER, LOGIN_ERROR, FETCH_USER } from '../actions/types';

const INITIAL_STATE = {
  error: undefined
}

export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return { user: action.payload.email || '' };
    case AUTH_USER:
      return {
        ...state,
        user: action.payload.email,
        error: undefined
      };
    case AUTH_ERROR:
      return {
        ...state, 
        error: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.email,
        error: undefined
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: '',
        error: undefined
      };
    case LOGIN_ERROR:
      return {
        ...state, 
        error: action.payload
      };
    default:
      return state;
  }
}