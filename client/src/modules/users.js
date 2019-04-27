import conf from '../config';
import { callApi } from './utils';

const initialState = {
  user: null,
};

const SET_USER = 'SET_USER';
const DELETE_USER = 'DELETE_USER';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload.user;
      return {
        ...state,
        user,
      };
    case DELETE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const authenticate = (username, password) => {
  return async dispatch => {
    const result = await callApi(`${conf.apiRoot}/api/session`, 'POST', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ username, password }),
    });
    if (result) dispatch(setUser(result));
    return result;
  };
};

export const authStatus = () => {
  return async dispatch => {
    try {
      const result = await callApi(`${conf.apiRoot}/api/session`);
      if (result) dispatch(setUser(result));
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
};

export const logout = () => {
  return async dispatch => {
    const user = await callApi(`${conf.apiRoot}/api/session`, 'DELETE');
    if (user && user.status === 'ok') {
      dispatch({ type: DELETE_USER });
    }
  };
};

export const getUser = state => state.users.user;

export const setUser = user => {
  return dispatch => dispatch({ type: SET_USER, payload: { user } });
};

export const updateUser = data => async (dispatch, getState) => {
  const state = getState();
  const user = getUser(state);
  const username = user.username;
  const email = data.email;
  if (
    (user.emailsVerified && user.emailsVerified.length === 0) ||
    user.emailsVerified[0] !== email
  ) {
    data.newEmail = email;
  }

  const result = await callApi(`${conf.apiRoot}/api/users/${username}`, 'PUT', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (result.status === 'ok') {
    dispatch(setUser(result.user));
  }
  return result;
};
