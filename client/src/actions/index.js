import axios from "axios";

export const LOGIN = "login";

const ROOT_URL = "";

export function login(user) {
  const request = axios.post(`${ROOT_URL}/api/login`, user);
  return {
    type: LOGIN,
    payload: request
  };
}
