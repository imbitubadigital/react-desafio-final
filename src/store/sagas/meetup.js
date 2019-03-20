import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '~/services/api';
import { actions as toastrActions } from 'react-redux-toastr';

import MeetupActions from '~/store/ducks/meetup';
import NextActions from '~/store/ducks/next';
import RecommendedActions from '~/store/ducks/recommended';
import SubscribeActions from '~/store/ducks/subscribe';

export function* createMeetup({
  categories, title, description, location, date, images,
}) {
  try {
    const dataForm = new FormData();
    images.map(file => dataForm.append('file', file, file.name));
    const configHeader = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const { data: { id } } = yield call(api.post, 'files', dataForm, configHeader);
    if (id) {
      const response = yield call(api.post, 'meetups', {
        title, description, location, date, image_id: id, categories,
      });

      yield put(MeetupActions.createMeetupSuccess(response.data));
      yield put(NextActions.nextsClear());
      yield put(NextActions.nextsRequest(1));
      yield put(RecommendedActions.recommendedsClear());
      yield put(RecommendedActions.recommendedsRequest(1));

      yield put(toastrActions.add({
        type: 'success',
        title: 'Tudo Certo!',
        message: 'Seu evento foi criado com sucesso!',
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
      yield put(push('/'));
    }
  } catch (err) {
    yield put(MeetupActions.createMeetupFailure());
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
        message: 'Erro no sistema ao realizar o cadastro de meetup!',
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
    }
  }
}

export function* updateMeetup({
  categories, title, description, location, date, images, id, imageId,
}) {
  try {
    if (images.length > 0) {
      const dataForm = new FormData();
      images.map(file => dataForm.append('file', file, file.name));
      const configHeader = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      yield call(api.put, `files/${imageId}`, dataForm, configHeader);
    }

    const response = yield call(api.put, `meetups/${id}`, {
      title, description, location, date, categories,
    });
    yield put(MeetupActions.setMeetupUpdate(response.data));

    yield put(NextActions.nextsClear());
    yield put(NextActions.nextsRequest(1));
    yield put(SubscribeActions.subscribesClear());
    yield put(SubscribeActions.subscribesRequest(1));
    yield put(RecommendedActions.recommendedsClear());
    yield put(RecommendedActions.recommendedsRequest(1));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Tudo Certo!',
      message: 'Seu evento foi atualizado com sucesso!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
    yield put(push('/'));
  } catch (err) {
    yield put(MeetupActions.createMeetupFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'warning',
        title: 'Atenção!',
        message: err.response.data.error.message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
      return;
    }
    yield put(toastrActions.add({
      type: 'error',
      title: 'Opps',
      message: 'Erro no sistema ao realizar o atualização de meetup!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  }
}

export function* meetupSubscribe({ id }) {
  try {
    const response = yield call(api.post, 'subscribes', { id });
    yield put(MeetupActions.setMeetupUpdate(response.data[0].meetup));

    yield put(NextActions.nextsClear());
    yield put(NextActions.nextsRequest(1));
    yield put(SubscribeActions.subscribesClear());
    yield put(SubscribeActions.subscribesRequest(1));
    yield put(RecommendedActions.recommendedsClear());
    yield put(RecommendedActions.recommendedsRequest(1));

    yield put(MeetupActions.createMeetupFailure());
    yield put(toastrActions.add({
      type: 'success',
      title: 'Parabéns!',
      message: 'Obrigado por se inscrever, aguardamos você!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
    yield put(MeetupActions.setIsSubscribe());
  } catch (err) {
    yield put(MeetupActions.createMeetupFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'info',
        title: 'Atenção!',
        message: err.response.data.error.message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
      return;
    }
    yield put(toastrActions.add({
      type: 'error',
      title: 'Opps',
      message: 'Erro no sistema ao realizar o atualização de meetup!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  }
}

export function* deleteMeetup({ id }) {
  try {
    yield call(api.delete, `meetups/${id}`);

    yield put(NextActions.nextsClear());
    yield put(NextActions.nextsRequest(1));
    yield put(SubscribeActions.subscribesClear());
    yield put(SubscribeActions.subscribesRequest(1));
    yield put(RecommendedActions.recommendedsClear());
    yield put(RecommendedActions.recommendedsRequest(1));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Tudo certo!!',
      message: 'O meetup foi deletado com sucesso!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
    yield put(push('/'));
  } catch (err) {
    yield put(MeetupActions.createMeetupFailure());
    if (err.response.request.status === 400) {
      yield put(toastrActions.add({
        type: 'info',
        title: 'Atenção!',
        message: err.response.data.error.message,
        options: {
          timeOut: 10000,
          progressBar: true,
          closeOnToastrClick: true,
        },
      }));
      return;
    }
    yield put(toastrActions.add({
      type: 'error',
      title: 'Opps',
      message: 'Erro ao deletar meetup!',
      options: {
        timeOut: 10000,
        progressBar: true,
        closeOnToastrClick: true,
      },
    }));
  }
}

export function* search({ term }) {
  try {
    const response = yield call(api.get, `search/${term}`);
    yield put(MeetupActions.searchSuccess(response.data));
  } catch (err) {
    console.log('Erro');
  }
}
