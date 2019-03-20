import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '~/services/api';

import { actions as toastrActions } from 'react-redux-toastr';

import AuthActions from '~/store/ducks/auth';
import UserActions from '~/store/ducks/user';

export function* createUser({ username, email, password }) {
  try {
    const response = yield call(api.post, 'users', { username, email, password });

    const { token, user } = response.data;
    const isPref = user.preferences[0] ? user.preferences[0].id : 'null';
    localStorage.setItem('@Omni:token', token);
    localStorage.setItem('@Omni:preferences', isPref);
    yield put(UserActions.createUserSuccess(user));
    yield put(AuthActions.signInSuccess(token, isPref));

    yield put(push('/preferencia'));
    yield put(toastrActions.add({
      type: 'info',
      title: 'Seja bem vindo(a)!',
      message: `Olá,${user.username}, falta pouco! Por favor selecione suas preferências`,
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  } catch (err) {
    yield put(UserActions.createUserFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'warning',
        title: 'Atenção!',
        message: err.response.data[0].message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    } else {
      yield put(toastrActions.add({
        type: 'error',
        title: 'Opps',
        message: 'Erro no sistema ao realizar o cadastro!',
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    }
  }
}

export function* updateUser({
  username,
  password,
  passwordConfirmation,
  preferences,
}) {
  try {
    const response = yield call(
      api.put,
      'users',
      {
        username,
        password,
        password_confirmation: passwordConfirmation,
        preferences,
      },
    );
    const { data } = response;
    const isPref = data.preferences[0] ? data.preferences[0].id : 'null';

    localStorage.setItem('@Omni:preferences', isPref);
    yield put(UserActions.createUserSuccess(data));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Tudo certo!',
      message: `${data.username}, seu perfil foi atualizado com sucesso!`,
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  } catch (err) {
    yield put(UserActions.createUserFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'warning',
        title: 'Atenção!',
        message: err.response.data[0].message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    } else {
      yield put(toastrActions.add({
        type: 'error', // success info warning light
        title: 'Opps',
        message: 'Erro no sistema ao realizar o cadastro!',
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    }
  }
}

export function* attachPreferences({ preferences }) {
  try {
    const response = yield call(api.put, 'my-preferences', { preferences });

    const { data } = response;
    const isPref = data.preferences[0] ? data.preferences[0].id : 'null';
    localStorage.setItem('@Omni:preferences', isPref);
    yield put(UserActions.createUserSuccess(data));
    yield put(AuthActions.signOut());

    yield put(push('/login'));
    yield put(toastrActions.add({
      type: 'success',
      title: 'Tudo certo!',
      message: `Olá,${data.username}, Preferências anexadas com sucesso. Faça seu login e seja bem vindo!`,
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  } catch (err) {
    yield put(UserActions.createUserFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'warning',
        title: 'Atenção!',
        message: err.response.data[0].message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    } else {
      yield put(toastrActions.add({
        type: 'error',
        title: 'Opps',
        message: 'Erro no sistema ao salvar preferências!',
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    }
  }
}
