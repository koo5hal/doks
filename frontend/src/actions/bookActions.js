import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_DETAILS_FAIL,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_REQUEST,
  BOOK_PAY_FAIL,
  BOOK_PAY_SUCCESS,
  BOOK_PAY_REQUEST,
  BOOK_LIST_MY_REQUEST,
  BOOK_LIST_MY_SUCCESS,
  BOOK_LIST_MY_FAIL,
  BOOK_LIST_FAIL,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_DELIVER_FAIL,
  BOOK_DELIVER_SUCCESS,
  BOOK_DELIVER_REQUEST,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_DETAILS_RESET,
  BOOK_UPDATE_FAIL,
} from "../constants/bookConstants";
import { logout } from "./userActions";

export const createBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/books`, book, config);

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getBookDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books/${id}`, config);

    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payBook =
  (bookId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/books/${bookId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: BOOK_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: BOOK_PAY_FAIL,
        payload: message,
      });
    }
  };

export const deliverBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/books/${book._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: BOOK_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELIVER_FAIL,
      payload: message,
    });
  }
};
export const followBook1 = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/books/${book._id}/follow1`,
      {},
      config
    );

    dispatch({
      type: BOOK_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELIVER_FAIL,
      payload: message,
    });
  }
};
export const followBook2 = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/books/${book._id}/follow2`,
      {},
      config
    );

    dispatch({
      type: BOOK_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELIVER_FAIL,
      payload: message,
    });
  }
};
export const followBook3 = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/books/${book._id}/follow3`,
      {},
      config
    );

    dispatch({
      type: BOOK_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELIVER_FAIL,
      payload: message,
    });
  }
};
export const followBook4 = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/books/${book._id}/follow4`,
      {},
      config
    );

    dispatch({
      type: BOOK_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_DELIVER_FAIL,
      payload: message,
    });
  }
};
export const listMyBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books/mybooks`, config);

    dispatch({
      type: BOOK_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books`, config);

    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: message,
    });
  }
};
export const updateBookProfile = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/books/${book._id}`, book, config);

    dispatch({ type: BOOK_UPDATE_SUCCESS });

    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });

    dispatch({ type: BOOK_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload: message,
    });
  }
};
