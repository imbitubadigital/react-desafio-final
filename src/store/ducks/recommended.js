import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  recommendedsRequest: ['page'],
  recommendedsSuccess: ['data'],
  recommendedsFailure: null,
  recommendedsRefreshSuccess: ['data'],
  recommendedsClear: null,
});

export const RecommendedTypes = Types;
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

export const clearRecommendeds = state => state.merge({
  data: [],
  page: '',
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECOMMENDEDS_REQUEST]: setLoaderTrue,
  [Types.RECOMMENDEDS_SUCCESS]: success,
  [Types.RECOMMENDEDS_REFRESH_SUCCESS]: refreshSuccess,
  [Types.RECOMMENDEDS_FAILURE]: setLoaderFalse,
  [Types.RECOMMENDEDS_CLEAR]: clearRecommendeds,

});
