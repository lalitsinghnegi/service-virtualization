import axios from "axios";
import { getToken } from "./authentication";
import {
  CREATE_REQUEST,
  NEW_REQUEST_LIST,
  REQUEST_LIST,
  PROCESS_REQUEST
} from "./endpoints";

//Purpose : user registeration methods

export const register = async (user) => {
  let response;

  try {
    response = await axios.post(CREATE_REQUEST, user);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const process = async (params) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(PROCESS_REQUEST, params);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const getRequestList = async () => {
  let apiResponse;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  await axios
    .get(REQUEST_LIST)
    .then((res) => {
      apiResponse = res;
    })
    .catch((e) => {
      const { response } = e;
      if (response) {
        apiResponse = e;
      }
    });

   
  return apiResponse;
};

export const getNewRequestList = async () => {
  let apiResponse;
axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  await axios
    .get(NEW_REQUEST_LIST)
    .then((res) => {
      apiResponse = res;
    })
    .catch((e) => {
      const { response } = e;
      if (response) {
        apiResponse = e;
      }
    });

   
  return apiResponse;
};