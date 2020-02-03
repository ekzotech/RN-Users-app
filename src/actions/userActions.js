import * as ActionTypes from './ActionTypes';

export const createUserItem = payloadData => ({
  type: ActionTypes.CREATE_USER_ITEM,
  payload: payloadData,
});

export const createUserItemSuccess = payloadData => ({
  type: ActionTypes.CREATE_USER_ITEM_SUCCESS,
  payload: payloadData,
});

export const createUserItemError = error => ({
  type: ActionTypes.CREATE_USER_ITEM_ERROR,
  payload: error,
});

export const updateUserItem = payloadData => ({
  type: ActionTypes.UPDATE_USER_ITEM,
  payload: payloadData.user,
  userId: payloadData.userId,
});

export const updateUserItemSuccess = payloadData => ({
  type: ActionTypes.UPDATE_USER_ITEM_SUCCESS,
  payload: payloadData,
});

export const updateUserItemError = error => ({
  type: ActionTypes.UPDATE_USER_ITEM_ERROR,
  payload: error,
});

export const deleteUserItem = payloadData => ({
  type: ActionTypes.DELETE_USER_ITEM,
  payload: payloadData,
});

export const deleteUserItemSuccess = payloadData => ({
  type: ActionTypes.DELETE_USER_ITEM_SUCCESS,
  payload: payloadData,
});

export const deleteUserItemError = error => ({
  type: ActionTypes.DELETE_USER_ITEM_ERROR,
  payload: error,
});

export const getUserItem = payloadData => ({
  type: ActionTypes.GET_USER_ITEM,
  payload: payloadData,
});

export const getUserItemSuccess = payloadData => ({
  type: ActionTypes.GET_USER_ITEM_SUCCESS,
  payload: payloadData,
});

export const getUserItemError = error => ({
  type: ActionTypes.GET_USER_ITEM_ERROR,
  payload: error,
});

export const getUsersList = payloadData => ({
  type: ActionTypes.GET_USERS_LIST,
  payload: payloadData,
});

export const getUsersListSuccess = payloadData => ({
  type: ActionTypes.GET_USERS_LIST_SUCCESS,
  payload: payloadData,
});

export const getUsersListError = error => ({
  type: ActionTypes.GET_USERS_LIST_ERROR,
  payload: error,
});

export const incrementListPage = payloadData => ({
  type: ActionTypes.INCREMENT_PAGE,
  payload: payloadData,
});

export const decrementListPage = payloadData => ({
  type: ActionTypes.DECREMENT_PAGE,
  payload: payloadData,
});

export const setCurrentUser = payloadData => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: payloadData,
});
