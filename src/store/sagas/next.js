import { call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { actions as toastrActions } from 'react-redux-toastr';


import NextActions from '~/store/ducks/next';


export function* nexts({ page }) {
  try {
    const response = yield call(api.get, `nexts?page=${page}`);
    yield put(NextActions.nextsSuccess(response.data));
  } catch (err) {
    yield put(NextActions.nextsFailure());
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
