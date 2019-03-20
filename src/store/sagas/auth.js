import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '~/services/api';

import { actions as toastrActions } from 'react-redux-toastr';


import AuthActions from '~/store/ducks/auth';


export function* login({ email, password }) {
  try {
    const response = yield call(api.post, 'session', { email, password });
    const { token, user } = response.data;
    const isPref = user.preferences[0] ? user.preferences[0].id : 'null';
    localStorage.setItem('@Challenge:token', token);
    localStorage.setItem('@Challenge:preferences', isPref);
    localStorage.setItem('@Challenge:user', JSON.stringify(user));
    yield put(AuthActions.signInSuccess(token, isPref, user));

    if (user.preferences[0]) {
      yield put(push('/'));
      yield put(toastrActions.add({
        type: 'success',
        title: 'Tudo certo!',
        message: `Seja bem vindo(a) ${user.username}!`,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    } else {
      yield put(push('/preferencia'));
      yield put(toastrActions.add({
        type: 'infor',
        title: 'Seja bem vindo(a)!',
        message: `Olá,${user.username}, por favor selecione suas preferências`,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    }
  } catch (err) {
    yield put(AuthActions.signInFailure());
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique seu E-mail e/ou senha!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  }
}
