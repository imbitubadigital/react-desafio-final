import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token', 'isPreference', 'user'],
  signInFailure: null,
  signOut: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  isLogged: !!localStorage.getItem('@Challenge:token'),
  isPreference: localStorage.getItem('@Challenge:preferences') !== 'null',
  token: localStorage.getItem('@Challenge:token') || null,
  loginLoader: false,
  user: JSON.parse(localStorage.getItem('@Challenge:user')) || null,
});

export const logout = (state) => {
  localStorage.removeItem('@Challenge:token');
  localStorage.removeItem('@Challenge:preferences');
  localStorage.removeItem('@Challenge:user');
  return state.merge({
    isLogged: false,
    isPreference: false,
    token: null,
    user: null,
  });
};

/* Reducers */
export const setLoaderTrue = state => state.merge({ loginLoader: true });
export const setLoaderFalse = state => state.merge({ loginLoader: false });
export const loginSuccess = (state, { token, isPreference, user }) => state.merge({
  loginLoader: false,
  isLogged: true,
  token,
  isPreference,
  user,
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: setLoaderTrue,
  [Types.SIGN_IN_SUCCESS]: loginSuccess,
  [Types.SIGN_IN_FAILURE]: setLoaderFalse,
  [Types.SIGN_OUT]: logout,
});
