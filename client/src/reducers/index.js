import axios from "axios";

export const LOGIN = "login";
const ROOT_URL = "";

///Action creator
export function loginAction(user) {
  const request = axios.post(`${ROOT_URL}/api/login`, user);
  // const request = axios.get("https://swapi.co/api/people/1");
  return {
    type: LOGIN,
    payload: request
  };
}

///Reducer

export default function loginReducer(state = { user: "" }, action) {
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
