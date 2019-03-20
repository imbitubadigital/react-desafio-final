import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  createUserRequest: ['username', 'email', 'password'],
  createUserSuccess: ['data'],
  createUserFailure: null,
  attachPreferencesRequest: ['preferences'],
  updateUserRequest: ['username', 'password', 'passwordConfirmation', 'preferences'],
});

export const UserTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  loader: false,
});

/* Reducers */
export const setCreateLoaderTrue = state => state.merge({ loader: true });
export const setCreateLoaderFalse = state => state.merge({ loader: false });
export const createSuccess = (state, { data }) => state.merge({
  loader: false,
  data,
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_USER_REQUEST]: setCreateLoaderTrue,
  [Types.CREATE_USER_SUCCESS]: createSuccess,
  [Types.CREATE_USER_FAILURE]: setCreateLoaderFalse,
  [Types.ATTACH_PREFERENCES_REQUEST]: setCreateLoaderTrue,
  [Types.UPDATE_USER_REQUEST]: setCreateLoaderTrue,
});
