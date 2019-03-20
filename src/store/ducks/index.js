import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as auth } from '~/store/ducks/auth';
import { reducer as user } from '~/store/ducks/user';
import { reducer as subscribe } from '~/store/ducks/subscribe';
import { reducer as next } from '~/store/ducks/next';
import { reducer as recommended } from '~/store/ducks/recommended';
import { reducer as meetup } from '~/store/ducks/meetup';
import { reducer as toastr } from 'react-redux-toastr';


export default history => combineReducers({
  auth,
  user,
  subscribe,
  next,
  recommended,
  meetup,
  toastr,
  router: connectRouter(history),
});
