import {
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_PAY_REQUEST,
  BOOK_PAY_FAIL,
  BOOK_PAY_SUCCESS,
  BOOK_PAY_RESET,
  BOOK_LIST_MY_REQUEST,
  BOOK_LIST_MY_SUCCESS,
  BOOK_LIST_MY_FAIL,
  BOOK_LIST_MY_RESET,
  BOOK_LIST_FAIL,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_DELIVER_FAIL,
  BOOK_DELIVER_SUCCESS,
  BOOK_DELIVER_REQUEST,
  BOOK_DELIVER_RESET,
  BOOK_CREATE_RESET,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_RESET,
  BOOK_UPDATE_SUCCESS,
} from "../constants/bookConstants";

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return {
        loading: true,
      };
    case BOOK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        book: action.payload,
      };
    case BOOK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = { loading: true, bookItems: [], patientInfo: {} },
  action
) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOK_DETAILS_SUCCESS:
      return {
        loading: false,
        book: action.payload,
      };
    case BOOK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bookPayReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_PAY_REQUEST:
      return {
        loading: true,
      };
    case BOOK_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BOOK_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOK_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const bookDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case BOOK_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BOOK_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOK_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const bookListMyReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case BOOK_LIST_MY_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case BOOK_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOK_LIST_MY_RESET:
      return { books: [] };
    default:
      return state;
  }
};

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return {
        loading: true,
      };
    case BOOK_LIST_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case BOOK_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const bookUpdateReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_UPDATE_RESET:
      return {
        book: {},
      };
    default:
      return state;
  }
};
