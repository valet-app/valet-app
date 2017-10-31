import { combineReducers } from "redux";
import axios from "axios";

const rootReducer = combineReducers({
  login: loginReducer,
  vehicles: vehiclesReducer,
  employees: employeesReducer,
  currentValet: chooseValetReducer,
  chosenVehicle: chooseVehicleReducer
});

export const LOGIN = "LOGIN";
export const GET_VEHICLES = "GET_VEHICLES";
export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const CHOOSE_VALET = "CHOOSE_VALET";
export const CHOOSE_VEHICLE = "CHOOSE_VEHICLE";

const ROOT_URL = "";

///Action creator
export function loginAction(user, cb) {
  const request = axios.post(`${ROOT_URL}/auth/login`, user).then(response => {
    cb();
    return response;
  });

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

export function getEmployeesAction() {
  const request = axios.get(`${ROOT_URL}/api/empl`);

  return {
    type: GET_EMPLOYEES,
    payload: request
  };
}

export function chooseValetAction(valet) {
  console.log(valet);
  const request = axios.get(`${ROOT_URL}/api/empl`);

  return {
    type: CHOOSE_VALET,
    payload: valet
  };
}

export function chooseVehicleAction(vehicle) {
  console.log(vehicle);

  return {
    type: CHOOSE_VEHICLE,
    payload: vehicle
  };
}

///Reducer

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN + "_FULFILLED":
      return { username: action.payload.username };
    case LOGIN + "_REJECTED":
      return {
        username: "",
        error: action.payload.response.status
      };
    case LOGIN + "_PENDING":
      return { username: "", loading: true };
    default:
      return state;
  }
}

export function vehiclesReducer(state = [], action) {
  switch (action.type) {
    case GET_VEHICLES + "_FULFILLED":
      return action.payload.data;
    case GET_VEHICLES + "_REJECTED":
      return {
        vehicles: [],
        error: action.payload.response.status
      };
    case GET_VEHICLES + "_PENDING":
      return { vehicles: [], loading: true };
    default:
      return state;
  }
}
export function employeesReducer(state = [], action) {
  switch (action.type) {
    case GET_EMPLOYEES + "_FULFILLED":
      return action.payload.data;
    case GET_EMPLOYEES + "_REJECTED":
      return {
        employees: [],
        error: action.payload.response.status
      };
    case GET_EMPLOYEES + "_PENDING":
      return { employees: [], loading: true };
    default:
      return state;
  }
}
export function chooseValetReducer(state = "", action) {
  switch (action.type) {
    case CHOOSE_VALET:
      console.log(action);
      return action.payload;
    default:
      return state;
  }
}
export function chooseVehicleReducer(state = {}, action) {
  switch (action.type) {
    case CHOOSE_VEHICLE:
      console.log(action);
      return action.payload;
    default:
      return state;
  }
}

export default rootReducer;
