import axios from "axios";
import {SIGNIN,LOGOUT} from "./endpoints";
const jwtDecode = require("jwt-decode");

// Purpose : Have all method for authentication, Token storage , using profile etc 


export const storeToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getToken = () => {
 
  if (isTokenExpired(localStorage.getItem("accessToken"))) {
    console.log("isTokenExpired")
    logout();
    return false;
  } else {
    return localStorage.getItem("accessToken");
  }
};

export const isLoggedIn = () => {
  const accessToken = getToken();
  return accessToken;
};

export const logout = () => {
  localStorage.clear();
};

export const handleError = (error) => {
  if (typeof error.response !== "undefined") {
    if (error.response.status === 401) {
      console.log("Error-34::", error.response.status);
      logout();
    }
  } else {
    console.log("Error-37::", error.response);
  }
};

export const getRole = () => {
  let token = localStorage.getItem("accessToken");
  let decoded = jwtDecode(token);
  return decoded.user.role;
};

export const isTokenExpired = (accessToken) => {
  try {
    const decoded = jwtDecode(accessToken);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
};

export const getUserDetails = () => {
  let token = localStorage.getItem("accessToken");
  let decoded = jwtDecode(token);
  return decoded.user;
};

export const getUserRolesFromToken = (token) => {
  let decoded = jwtDecode(token);
  return decoded.user.role;
};

export const getProfileDataFromToken = (token) => {
  let decoded = jwtDecode(token);
  return decoded.user;
};

export const signin = async (user) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(SIGNIN, user);
    return response.data;
  } catch (error) {
    response = error.response;
    return response;
  }
 
};

export const session_logout = async (user) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(LOGOUT, user);
    console.log("session_logout:",response);
    localStorage.clear();
    return response.data;
  } catch (error) {
    response = error.response;
    return response;
  }
 
};