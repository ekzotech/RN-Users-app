import * as ActionTypes from '../actions/ActionTypes';
import * as UserActions from '../actions/userActions';

import {call, put, takeLatest} from 'redux-saga/effects';

import API from '../api/baseApi';

function* createUserData(action) {
  try {
    const response = yield call(API.post, '/users', action.payload);
    yield put(UserActions.createUserItemSuccess(response));
  } catch (e) {
    yield put(UserActions.createUserItemError(e.message));
  }
}

function* deleteUserItem(action) {
  try {
    const response = yield call(API.delete, `/users/${action.payload}`);
    yield put(UserActions.deleteUserItemSuccess(response));
  } catch (e) {
    yield put(UserActions.deleteUserItemError(e.message));
  }
}

function* updateUserItem(action) {
  try {
    const response = yield call(
      API.put,
      `/users/${action.userId}`,
      action.payload,
    );
    yield put(UserActions.updateUserItemSuccess(response));
  } catch (e) {
    yield put(UserActions.updateUserItemError(e.message));
  }
}

function* getUserItem(action) {
  try {
    const response = yield call(API.get, `/users/${action.payload}`);
    yield put(UserActions.getUserItemSuccess(response));
  } catch (e) {
    yield put(UserActions.getUserItemError(e.message));
  }
}

function* fetchUsersData(action) {
  try {
    const response = yield call(API.get, `/users?page=${action.payload}`);
    yield put(UserActions.getUsersListSuccess(response));
  } catch (e) {
    yield put(UserActions.getUsersListError(e.message));
  }
}

function* incrementPage(action) {
  try {
    yield put({
      type: ActionTypes.INCREMENT_PAGE_SUCCESS,
      payload: 1,
    });
    yield put({
      type: ActionTypes.GET_USERS_LIST,
      payload: action.payload + 1,
    });
  } catch (e) {
    console.log('error ', e);
  }
}

function* decrementPage(action) {
  try {
    yield put({
      type: ActionTypes.DECREMENT_PAGE_SUCCESS,
      payload: 1,
    });
    yield put({
      type: ActionTypes.GET_USERS_LIST,
      payload: action.payload - 1,
    });
  } catch (e) {
    console.log('error ', e);
  }
}

function* setCurrentUser(action) {
  try {
    yield put({
      type: ActionTypes.SET_CURRENT_USER_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    console.log('error ', e);
  }
}

export function* watchCreateUser() {
  yield takeLatest(ActionTypes.CREATE_USER_ITEM, createUserData);
}

export function* watchDeleteUser() {
  yield takeLatest(ActionTypes.DELETE_USER_ITEM, deleteUserItem);
}

export function* watchUpdateUser() {
  yield takeLatest(ActionTypes.UPDATE_USER_ITEM, updateUserItem);
}

export function* watchGetUser() {
  yield takeLatest(ActionTypes.GET_USER_ITEM, getUserItem);
}

export function* watchGetUsersList() {
  yield takeLatest(ActionTypes.GET_USERS_LIST, fetchUsersData);
}

export function* watchIncrementPage() {
  yield takeLatest(ActionTypes.INCREMENT_PAGE, incrementPage);
}

export function* watchDecrementPage() {
  yield takeLatest(ActionTypes.DECREMENT_PAGE, decrementPage);
}

export default function* root() {
  yield [
    yield takeLatest(ActionTypes.CREATE_USER_ITEM, createUserData),
    yield takeLatest(ActionTypes.DELETE_USER_ITEM, deleteUserItem),
    yield takeLatest(ActionTypes.UPDATE_USER_ITEM, updateUserItem),
    yield takeLatest(ActionTypes.GET_USER_ITEM, getUserItem),
    yield takeLatest(ActionTypes.GET_USERS_LIST, fetchUsersData),
    yield takeLatest(ActionTypes.INCREMENT_PAGE, incrementPage),
    yield takeLatest(ActionTypes.DECREMENT_PAGE, decrementPage),
    yield takeLatest(ActionTypes.SET_CURRENT_USER, setCurrentUser),
  ];
}
