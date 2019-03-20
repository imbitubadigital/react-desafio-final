import { call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { actions as toastrActions } from 'react-redux-toastr';

import SubscribeActions from '~/store/ducks/subscribe';

export function* subscribes({ page }) {
  try {
    const response = yield call(api.get, `registrations?page=${page}`);

    yield put(SubscribeActions.subscribesSuccess(response.data));
  } catch (err) {
    yield put(SubscribeActions.subscribesFailure());
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
