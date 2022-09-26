import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  appointmentListReducer,
  appointmentDetailsReducer,
  appointmentDeleteReducer,
  appointmentCreateReducer,
  appointmentUpdateReducer,
  appointmentReviewCreateReducer,
  appointmentTopRatedReducer,
} from "./reducers/appointmentReducers";
import {
  patientListReducer,
  patientAddReducer,
  patientDetailsReducer,
  getPatientsByRoomNoReducer,
  patientUpdateReducer,
  patientDeleteReducer,
} from "./reducers/patientsReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  bookCreateReducer,
  bookDetailsReducer,
  bookPayReducer,
  bookDeliverReducer,
  bookListMyReducer,
  bookListReducer,
  bookUpdateReducer,
} from "./reducers/bookReducers";

const reducer = combineReducers({
  patientsList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientAdd: patientAddReducer,
  patientUpdate: patientUpdateReducer,
  patientDelete: patientDeleteReducer,
  getPatientsByRoomNo: getPatientsByRoomNoReducer,
  appointmentList: appointmentListReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentDelete: appointmentDeleteReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentUpdate: appointmentUpdateReducer,
  appointmentReviewCreate: appointmentReviewCreateReducer,
  appointmentTopRated: appointmentTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookCreate: bookCreateReducer,
  bookDetails: bookDetailsReducer,
  bookPay: bookPayReducer,
  bookDeliver: bookDeliverReducer,
  bookListMy: bookListMyReducer,
  bookList: bookListReducer,
  bookUpdate: bookUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const patientInfoFromStorage = localStorage.getItem("patientInfo")
  ? JSON.parse(localStorage.getItem("patientInfo"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    patientInfo: patientInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
