import {
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_ERROR,
    PATIENT_ADD_ERROR,
    PATIENT_ADD_REQUEST,
    PATIENT_ADD_SUCCESS,
    PATIENT_DELETE_ERROR,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_SUCCESS,
    PATIENT_UPDATE_ERROR,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_DETAILS_REQUEST,
    PATIENT_DETAILS_SUCCESS,
    PATIENT_DETAILS_ERROR,
    PATIENT_ROOM_NO_REQUEST,
    PATIENT_ROOM_NO_SUCCESS,
    PATIENT_ROOM_NO_ERROR,
  } from "../constants/patientConstant";
  import axios from "axios";
  
  export const listPatients = (keyword = "", pageNumber = "") => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({ type: PATIENT_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(
        `/patient/all?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({
        type: PATIENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_LIST_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const addPatient = (patient) => async (dispatch, getState) => {
    try {
      dispatch({ type: PATIENT_ADD_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/patient/addPatient`, patient, config);
  
      dispatch({
        type: PATIENT_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_ADD_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const getPatientDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PATIENT_DETAILS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/patient/${id}`, config);
  
      dispatch({
        type: PATIENT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_DETAILS_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const updatePatient = (patient) => async (dispatch, getState) => {
    try {
      dispatch({ type: PATIENT_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/patient/${patient._id}`,
        patient,
        config
      );
  
      dispatch({
        type: PATIENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_UPDATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deletePatient = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PATIENT_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/patient/${id}`, config);
  
      dispatch({
        type: PATIENT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_DELETE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const getPatientsByRoomNo = (roomNo) => async (dispatch, getState) => {
    try {
      dispatch({ type: PATIENT_ROOM_NO_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/patient/room/${roomNo}`, config);
      dispatch({
        type: PATIENT_ROOM_NO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_ROOM_NO_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  