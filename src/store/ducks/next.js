import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  nextsRequest: ['page'],
  nextsSuccess: ['data'],
  nextsFailure: null,
  nextsRefreshSuccess: ['data'],
  nextsClear: null,
});

export const NextTypes = Types;
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
export const clearNext = state => state.merge({
  data: [],
});


/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEXTS_REQUEST]: setLoaderTrue,
  [Types.NEXTS_SUCCESS]: success,
  [Types.NEXTS_REFRESH_SUCCESS]: refreshSuccess,
  [Types.NEXTS_CLEAR]: clearNext,

});
