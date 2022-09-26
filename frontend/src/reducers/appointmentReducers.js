import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_CREATE_REVIEW_REQUEST,
  APPOINTMENT_CREATE_REVIEW_SUCCESS,
  APPOINTMENT_CREATE_REVIEW_FAIL,
  APPOINTMENT_CREATE_REVIEW_RESET,
  APPOINTMENT_TOP_REQUEST,
  APPOINTMENT_TOP_SUCCESS,
  APPOINTMENT_TOP_FAIL,
} from "../constants/appointmentConstants";

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true, appointments: [] };
    case APPOINTMENT_LIST_SUCCESS:
      return {
        loading: false,
        appointments: action.payload.appointments,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { appointment: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_UPDATE_RESET:
      return { appointment: {} };
    default:
      return state;
  }
};

export const appointmentReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentTopRatedReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_TOP_REQUEST:
      return { loading: true, appointments: [] };
    case APPOINTMENT_TOP_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
