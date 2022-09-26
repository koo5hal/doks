import axios from "axios";
import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_CREATE_REVIEW_REQUEST,
  APPOINTMENT_CREATE_REVIEW_SUCCESS,
  APPOINTMENT_CREATE_REVIEW_FAIL,
  APPOINTMENT_TOP_REQUEST,
  APPOINTMENT_TOP_SUCCESS,
  APPOINTMENT_TOP_FAIL,
} from "../constants/appointmentConstants";
import { logout } from "./userActions";

export const listAppointments =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: APPOINTMENT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/appointments?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: APPOINTMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAppointmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/appointments/${id}`);

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/appointments/${id}`, config);

    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS,
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
      type: APPOINTMENT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createAppointment = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/appointments`, {}, config);

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
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
      type: APPOINTMENT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateAppointment =
  (appointment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_UPDATE_REQUEST,
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
        `/api/appointments/${appointment._id}`,
        appointment,
        config
      );

      dispatch({
        type: APPOINTMENT_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: APPOINTMENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const createAppointmentReview =
  (appointmentId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_CREATE_REVIEW_REQUEST,
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

      await axios.post(
        `/api/appointments/${appointmentId}/reviews`,
        review,
        config
      );

      dispatch({
        type: APPOINTMENT_CREATE_REVIEW_SUCCESS,
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
        type: APPOINTMENT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listTopAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_TOP_REQUEST });

    const { data } = await axios.get(`/api/appointments/top`);

    dispatch({
      type: APPOINTMENT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
