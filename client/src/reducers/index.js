import { combineReducers } from "redux";
import axios from "axios";

const rootReducer = combineReducers({
  login: loginReducer,
  vehicles: vehiclesReducer
});

export const LOGIN = "LOGIN";
export const GET_VEHICLES = "GET_VEHICLES";
const ROOT_URL = "";

///Action creator
export function loginAction(user) {
  const request = axios.post(`${ROOT_URL}/auth/login`, user);

  return {
    type: LOGIN,
    payload: request
  };
}

export function getVehiclesAction() {
  const request = axios.get(`${ROOT_URL}/api/cars`);

  return {
    type: GET_VEHICLES,
    payload: request
  };
}

///Reducer

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN + "_FULFILLED":
      return Object.assign({}, state, { username: action.payload.username });
    case LOGIN + "_REJECTED":
      return Object.assign({}, state, {
        error: action.payload.response.status
      });
    case LOGIN + "_PENDING":
      return Object.assign({}, state, { loading: true });
    default:
      console.log("uncaught action", action);
      return state;
  }
}

export function vehiclesReducer(state = {}, action) {
  switch (action.type) {
    case GET_VEHICLES + "_FULFILLED":
      return Object.assign({}, state, { vehicles: action.payload.data });
    case GET_VEHICLES + "_REJECTED":
      return Object.assign({}, state, {
        error: action.payload.response.status
      });
    case GET_VEHICLES + "_PENDING":
      return Object.assign({}, state, { loading: true });
    default:
      console.log("uncaught action", action);
      return state;
  }
}

export default rootReducer;
