import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  subscribesRequest: ['page'],
  subscribesSuccess: ['data'],
  subscribesFailure: null,
  subscribesRefreshSuccess: ['data'],
  subscribesClear: null,
});

export const SubscribeTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  page: '',
  loader: false,
  loadMore: true,
});

/* Reducers */
export const setLoaderTrue = state => state.merge({ loader: true });
export const setLoaderFalse = state => state.merge({ loader: false });
export const success = (state, { data }) => state.merge({
  loader: false,
  data: [...state.data, ...data.data],
  page: data.page,
  loadMore: data.data.length > 0,
});

export const refreshSuccess = (state, { data }) => state.merge({
  loader: false,
  data: [...data.data],
  page: data.page,
  loadMore: data.data.length > 0,
});
export const clearSubscribe = state => state.merge({
  data: [],
  page: '',
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBSCRIBES_REQUEST]: setLoaderTrue,
  [Types.SUBSCRIBES_SUCCESS]: success,
  [Types.SUBSCRIBES_REFRESH_SUCCESS]: refreshSuccess,
  [Types.SUBSCRIBES_FAILURE]: setLoaderFalse,
  [Types.SUBSCRIBES_CLEAR]: clearSubscribe,
});
