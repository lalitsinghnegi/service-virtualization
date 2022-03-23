import axios from 'axios';
import config from "./config";
import { getToken } from './authentication';
import {getUserDetails,handleError} from './authentication';

// Purpose : Common get post method for all calls

function getApiUrl (route) {
  const apiUrl = config.api.uri;
  if (route) {
    return apiUrl + route;
  } else return apiUrl;
}

function httpPost (url, params) {
axios.defaults.headers.common = {'Authorization': `Bearer ${getToken()}`,'loggedinid': `${getUserDetails().id}`}

const configuration = {
method:'post',
url:url,
data:params
 };
return axios(configuration)
 .then(response=>Promise.resolve(response))
 .catch(error=> {
 handleError(error);
 });
}



function httpGet (url) {
axios.defaults.headers.common = {'Authorization': `Bearer ${getToken()}`,'loggedinid': `${getUserDetails().id}`}

  const configuration = {
    method: 'get',
    url: url
  };
  return axios(configuration)
    .then(response => Promise.resolve(response))
    .catch(error => {
      handleError(error);
    });
}

function httpDelete (url, params) {
axios.defaults.headers.common = {'Authorization': `Bearer ${getToken()}`}
  const configuration = {
    method: 'delete',
    url: url,
    data: params
  };
  return axios(configuration)
    .then(response => Promise.resolve(response))
    .catch(error => {
      handleError(error);
    });
}

const CommonService = {
  getApiUrl,
  httpGet, 
  httpPost,
  httpDelete
};

export default CommonService;
