import { all, takeLatest } from 'redux-saga/effects';

import { login } from './auth';
import { AuthTypes } from '~/store/ducks/auth';

import { createUser, attachPreferences, updateUser } from './user';
import { UserTypes } from '~/store/ducks/user';

import { subscribes } from './subscribe';
import { SubscribeTypes } from '~/store/ducks/subscribe';

import { nexts } from './next';
import { NextTypes } from '~/store/ducks/next';

import { recommendeds } from './recommended';
import { RecommendedTypes } from '~/store/ducks/recommended';

import {
  createMeetup,
  updateMeetup,
  meetupSubscribe,
  search,
  deleteMeetup,
} from './meetup';

import { MeetupTypes } from '~/store/ducks/meetup';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UserTypes.ATTACH_PREFERENCES_REQUEST, attachPreferences),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(SubscribeTypes.SUBSCRIBES_REQUEST, subscribes),
    takeLatest(NextTypes.NEXTS_REQUEST, nexts),
    takeLatest(RecommendedTypes.RECOMMENDEDS_REQUEST, recommendeds),
    takeLatest(MeetupTypes.CREATE_MEETUP_REQUEST, createMeetup),
    takeLatest(MeetupTypes.UPDATE_MEETUP_REQUEST, updateMeetup),
    takeLatest(MeetupTypes.DELETE_MEETUP_REQUEST, deleteMeetup),
    takeLatest(MeetupTypes.SUBSCRIBE_MEETUP, meetupSubscribe),
    takeLatest(MeetupTypes.SEARCH_REQUEST, search),
  ]);
}
