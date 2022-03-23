import axios from "axios";
import {
  CREATE_REQUEST,
  CHANGEPASS,
  PROGRAM_LIST,
  TEAM_LIST_ByProgramId
} from "./endpoints";

import { getToken } from "./authentication";


// Purpose : User operation like registeration etc 


export const register = async (user) => {
  let response;
  try {
    response = await axios.post(CREATE_REQUEST, user);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const changepass = async (user) => {
  let response;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
  try {
    response = await axios.post(CHANGEPASS, user);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const getProgramList = async () => {
  let apiResponse;

  await axios
    .get(PROGRAM_LIST)
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

export const getTeamList = async (program_id) => {
  let apiResponse;

  await axios
    .post(TEAM_LIST_ByProgramId,{program_id:program_id})
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