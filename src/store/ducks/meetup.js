import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  createMeetupRequest: ['categories', 'title', 'description', 'location', 'date', 'images'],
  createMeetupSuccess: ['data'],
  createMeetupFailure: null,
  setMeetupUpdate: ['meetup'],
  updateMeetupRequest: [
    'categories',
    'title',
    'description',
    'location',
    'date',
    'images',
    'id',
    'imageId',
  ],
  subscribeMeetup: ['id'],
  refreshDashboard: null,
  setIsSubscribe: null,
  searchRequest: ['term'],
  searchSuccess: ['results'],
  searchClear: null,
  deleteMeetupRequest: ['id'],
});


export const MeetupTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  loader: false,
  meetup: null,
  isSubscrite: false,
  results: [],
});

/* Reducers */
export const setLoaderTrue = state => state.merge({ loader: true });
export const setLoaderFalse = state => state.merge({ loader: false });
export const successResults = (state, { results }) => state.merge({
  loader: false,
  results,
});
export const createSuccess = (state, { data }) => state.merge({
  loader: false,
  data,
});
export const clearResults = state => state.merge({ results: [], loader: false });

export const setUpdate = (state, { meetup }) => state.merge({
  loader: false, isSubscrite: false, meetup,
});

export const showSubscribe = state => state.merge({ isSubscrite: true });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_MEETUP_REQUEST]: setLoaderTrue,
  [Types.CREATE_MEETUP_SUCCESS]: createSuccess,
  [Types.CREATE_MEETUP_FAILURE]: setLoaderFalse,
  [Types.SET_MEETUP_UPDATE]: setUpdate,
  [Types.UPDATE_MEETUP_REQUEST]: setLoaderTrue,
  [Types.SUBSCRIBE_MEETUP]: setLoaderTrue,
  [Types.SET_IS_SUBSCRIBE]: showSubscribe,
  [Types.SEARCH_REQUEST]: setLoaderTrue,
  [Types.SEARCH_SUCCESS]: successResults,
  [Types.SEARCH_CLEAR]: clearResults,

});
