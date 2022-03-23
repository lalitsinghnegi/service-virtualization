import axios from "axios";
import { getToken, getUserDetails, session_logout } from "./authentication";

import {
  VC_REQUEST,
  APP_REQUEST,
  FOLDERID_REQUEST,
  PROGRAM_TEAM_REQUEST,
  FOLDER_REQUEST,
} from "./endpoints";

// Purpose : Keep all forlder structure related methods

export const getVCData = async (params) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(VC_REQUEST, params);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};
export const getAppData = async (params) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(APP_REQUEST, params);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};
export const getFolderIDData = async (params) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(FOLDERID_REQUEST, params);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const getProgram = async (params) => {
  let user = getUserDetails();
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(PROGRAM_TEAM_REQUEST, {
      user_id: user.user_id,
    });
  } catch (error) {
    response = error.response;
  }
  console.log(response.data)
if(response.data.code === 498)
{
  session_logout();
}

  return response.data;
};

export const getFolderStructureId = async (params) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(FOLDER_REQUEST, params);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};
