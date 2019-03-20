import { call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { actions as toastrActions } from 'react-redux-toastr';


import RecommendedActions from '~/store/ducks/recommended';


export function* recommendeds({ page }) {
  try {
    const response = yield call(api.get, `recommendeds?page=${page}`);
    yield put(RecommendedActions.recommendedsSuccess(response.data));
  } catch (err) {
    yield put(RecommendedActions.recommendedsFailure());
    yield put(toastrActions.add({
      type: 'error',
      title: 'Opss',
      message: 'Erro ao ler meetups!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  }
}
