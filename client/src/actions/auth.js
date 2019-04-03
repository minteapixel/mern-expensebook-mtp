import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LOGIN_USER, LOGIN_ERROR, LOGOUT_USER, FETCH_USER } from './types';

export const signup = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signup', { email, password });

    dispatch({ type: AUTH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: 'Email already in use' });
  }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const loginUser = ({ email, password }) => async dispatch => {
  // compare the username and password combo
  try {
    const res = await axios.post('/api/auth/login', { email, password });

    dispatch({ type: LOGIN_USER, payload: res.data });
    localStorage.setItem('token', res.data.token);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_ERROR, payload: 'Invalid login credentials' });
  }
};

export const logoutUser = () => async dispatch => {
  const res = await axios.get('/api/auth/logout');
  dispatch({ type: LOGOUT_USER, payload: res.data });
};



// export const signup = ({ email, password }) => async dispatch => {
//   return axios
//     .post('/api/auth/signup', { email, password })
//     .then(res => {
//       dispatch({
//         type: AUTH_USER,
//         payload: res.data.token
//       });
//     })
//     .catch(error => {
//       console.log(error);
//       dispatch({ type: AUTH_ERROR, payload: 'Email already in use' });
//       }
//     );
// };