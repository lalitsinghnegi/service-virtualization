import axios from "axios";
import {
  GET_ALL_NAME_AND_ID,
  GET_EMPLOYEE_FOR_ID,
  GET_PROFILE_BY_EMAIL,
  GETALL,
  DELETE_ONE,
  CREATE_USER,
  SEND_ACTIVATION,
  USERCOUNT_DATA,
  STUBS_DATA,
  TEAM_DATA,
  DASH_METRICS,
  TESTMAIL_REQUEST
} from "./endpoints";

import { getToken } from "./authentication";


// Purpose : Support user will have these function for meterics, user etc

export const getAllNameAndId = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(GET_ALL_NAME_AND_ID)
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

export const getEmployeeForId = async (id) => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .post(GET_EMPLOYEE_FOR_ID, { id: id })
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

export const getProfileByEmail = async (email) => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .post(GET_PROFILE_BY_EMAIL, { email: email })
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

export const getAll = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(GETALL)
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

export const deleteOne = async (user) => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .post(DELETE_ONE,user)
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
export const createUser = async (user) => {
  let response;
  try {
    response = await axios.post(CREATE_USER, user);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const sendActivation = async (user) => {
  let response;
  try {
    response = await axios.post(SEND_ACTIVATION, user);
  } catch (error) {
    response = error.response;
  }
  return response.data;
};

export const usercountData = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(USERCOUNT_DATA)
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

export const stubcountData = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(STUBS_DATA)
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

export const teamcountData = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(TEAM_DATA)
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
export const getDashboardMetrics = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(DASH_METRICS)
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

export const sendTestMail = async () => {
  let apiResponse;
  axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

  await axios
    .get(TESTMAIL_REQUEST)
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