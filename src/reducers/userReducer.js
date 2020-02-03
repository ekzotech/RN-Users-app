import * as ActionTypes from '../actions/ActionTypes';
import * as NavigationService from '../services/NavigationService';

const initialState = {
  usersList: [],
  listPage: 1,
  maxPages: null,
  currentUser: null,
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USER_ITEM:
    case ActionTypes.DELETE_USER_ITEM:
    case ActionTypes.UPDATE_USER_ITEM:
    case ActionTypes.GET_USERS_LIST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.GET_USERS_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        usersList: action.payload,
        maxPages: action.payload.total_pages,
      };
    }
    case ActionTypes.DELETE_USER_ITEM_SUCCESS:
    case ActionTypes.CREATE_USER_ITEM_SUCCESS: {
      NavigationService.goBack({});
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.GET_USER_ITEM_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.UPDATE_USER_ITEM_SUCCESS: {
      NavigationService.goBack({});
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case ActionTypes.CREATE_USER_ITEM_ERROR:
    case ActionTypes.DELETE_USER_ITEM_ERROR:
    case ActionTypes.UPDATE_USER_ITEM_ERROR:
    case ActionTypes.GET_USERS_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ActionTypes.INCREMENT_PAGE_SUCCESS: {
      return {
        ...state,
        listPage: state.listPage + action.payload,
      };
    }
    case ActionTypes.DECREMENT_PAGE_SUCCESS: {
      return {
        ...state,
        listPage: state.listPage - action.payload,
      };
    }
    case ActionTypes.SET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
