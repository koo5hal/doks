import {
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_ERROR,
    PATIENT_ADD_ERROR,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_UPDATE_ERROR,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_RESET,
    PATIENT_DELETE_ERROR,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_SUCCESS,
    PATIENT_DELETE_RESET,
    PATIENT_DETAILS_REQUEST,
    PATIENT_DETAILS_SUCCESS,
    PATIENT_DETAILS_ERROR,
    PATIENT_ROOM_NO_REQUEST,
    PATIENT_ROOM_NO_SUCCESS,
    PATIENT_ROOM_NO_ERROR,
    PATIENT_ROOM_NO_RESET,
  } from "../constants/patientConstant";
  
  export const patientListReducer = (state = { patients: [] }, action) => {
    switch (action.type) {
      case PATIENT_LIST_REQUEST:
        return { ...state, loading: true };
      case PATIENT_LIST_SUCCESS:
        return {
          loading: false,
          patients: action.payload.patients,
          pages: action.payload.pages,
          page: action.payload.page,
        };
      case PATIENT_LIST_ERROR:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const patientAddReducer = (state = { patients: {} }, action) => {
    switch (action.type) {
      case PATIENT_ADD_REQUEST:
        return { ...state, loading: true };
      case PATIENT_ADD_SUCCESS:
        return { loading: false, success: true };
      case PATIENT_ADD_ERROR:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const patientDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case PATIENT_DETAILS_SUCCESS:
        return { loading: false, patient: action.payload };
      case PATIENT_DETAILS_ERROR:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const patientUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_UPDATE_REQUEST:
        return { ...state, loading: true };
      case PATIENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PATIENT_UPDATE_ERROR:
        return { loading: false, error: action.payload };
      case PATIENT_UPDATE_RESET:
        return {};
  
      default:
        return state;
    }
  };
  
  export const patientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_DELETE_REQUEST:
        return { ...state, loading: true };
      case PATIENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PATIENT_DELETE_ERROR:
        return { loading: false, error: action.payload };
      case PATIENT_DELETE_RESET:
        return {};
  
      default:
        return state;
    }
  };
  export const getPatientsByRoomNoReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_ROOM_NO_REQUEST:
        return { ...state, loading: true };
      case PATIENT_ROOM_NO_SUCCESS:
        return {
          loading: false,
          patients: action.payload.patients,
          attendance: action.payload.attendance,
        };
      case PATIENT_ROOM_NO_ERROR:
        return { loading: false, error: action.payload };
      case PATIENT_ROOM_NO_RESET:
        return {};
  
      default:
        return state;
    }
  };
  