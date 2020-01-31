import {all, fork} from 'redux-saga/effects';
import {
  watchCreateUser,
  watchDecrementPage,
  watchDeleteUser,
  watchGetUser,
  watchGetUsersList,
  watchIncrementPage,
  watchUpdateUser,
} from './userSaga';

export function* rootSaga() {
  yield all([
    fork(watchCreateUser),
    fork(watchDeleteUser),
    fork(watchUpdateUser),
    fork(watchGetUser),
    fork(watchGetUsersList),
    fork(watchIncrementPage),
    fork(watchDecrementPage),
  ]);
}
