import { combineReducers } from "redux";
import axios from "axios";
const rootReducer = combineReducers({
  login: loginReducer,
  session: getUserSessionReducer,
  vehicles: vehiclesReducer,
  employees: employeesReducer,
  currentValet: chooseValetReducer,
  chosenVehicle: chooseVehicleReducer,
  openSpaces: getOpenSpacesReducer,
  navTitle: setNavTitleReducer,
  lotStatus: getLotStatusReducer
});
export const LOGIN = "LOGIN";
export const GET_VEHICLES = "GET_VEHICLES";
export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const CHOOSE_VALET = "CHOOSE_VALET";
export const CHOOSE_VEHICLE = "CHOOSE_VEHICLE";
export const GET_OPEN_SPACES = "GET_OPEN_SPACES";
export const SET_NAV_TITLE = "SET_NAV_TITLE";
export const GET_USER_SESSION = "GET_USER_SESSION";
export const GET_LOT_STATUS = "GET_LOT_STATUS";

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
  return {
    type: CHOOSE_VALET,
    payload: valet
  };
}
export function chooseVehicleAction(vehicle) {
  return {
    type: CHOOSE_VEHICLE,
    payload: vehicle
  };
}
export function getOpenSpacesAction(vehicle) {
  //the lotid and typeid are hardcoded but will need to be dynamic with vehicle info
  console.log(vehicle);
  return {
    type: GET_OPEN_SPACES,
    payload: axios.get(
      `/api/parkingspot/?lotid=1&typeid=${vehicle.parkingspacetype_id}&carid=${vehicle.car_id}`
    )
  };
}
export function setNavTitleAction(title, cb) {
  //the lotid and typeid are hardcoded but will need to be dynamic with vehicle info
  return {
    type: SET_NAV_TITLE,
    payload: { title, cb }
  };
}
export function getUserSessionAction() {
  //the lotid and typeid are hardcoded but will need to be dynamic with vehicle info
  return {
    type: GET_USER_SESSION,
    payload: axios.get("/auth/me")
  };
}
export function getLotStatusAction(lotid) {
  //the lotid and typeid are hardcoded but will need to be dynamic with vehicle info
  console.log("LotAction")
  return {
    type: GET_LOT_STATUS,
    payload: axios.get("/api/parkinglotstatus?lotid=1")
  };
}

///Reducer
export function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN + "_FULFILLED":
      console.log(action);
      return action.payload.data;
    case LOGIN + "_REJECTED":
      return {
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
      console.log(action);
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
export function employeesReducer(state = [{ name: "Fake Valet" }], action) {
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
      return action.payload;
    default:
      return state;
  }
}
export function chooseVehicleReducer(state = null, action) {
  switch (action.type) {
    case CHOOSE_VEHICLE:
      return action.payload;
    default:
      return state;
  }
}
export function getOpenSpacesReducer(state = [], action) {
  switch (action.type) {
    case GET_OPEN_SPACES + "_FULFILLED":
      console.log(action);
      return action.payload.data;
    default:
      return state;
  }
}
export function setNavTitleReducer(state = "youcantseeme", action) {
  switch (action.type) {
    case SET_NAV_TITLE:
      return action.payload;
    default:
      return state;
  }
}
export function getUserSessionReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_SESSION + "_FULFILLED":
      return action.payload.data;
    default:
      return state;
  }
}
export function getLotStatusReducer(state = [], action) {
  switch (action.type) {
    case GET_LOT_STATUS + "_FULFILLED":
      return action.payload.data;
    default:
      return state;
  }
}
export default rootReducer;
