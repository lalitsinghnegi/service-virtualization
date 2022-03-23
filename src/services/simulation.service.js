import CommonService from "./common.service";
import { hoverflySchema } from "./hoverflySchema";
import Ajv from "ajv";
import { Row, Col, Container, Table } from "reactstrap";
import React from "react";
const objectPath = require("object-path");
const _ = require("lodash");

// Purpose : Edit and Save stub related method

function getAll(params) {
  const api = CommonService.getApiUrl("stub/getAll");
  return CommonService.httpPost(api, params);
}
function getS3ObjectVerions(params) {
  const api = CommonService.getApiUrl("s3/getS3ObjectVerions");
  return CommonService.httpPost(api,params);
}

function deleteOne(params) {
  const api = CommonService.getApiUrl("stub/deleteOne");
  return CommonService.httpDelete(api, params);
}

function getFile(params) {
  const api = CommonService.getApiUrl("stub/getFile");
  return CommonService.httpPost(api, params);
}
function getFileData(params) {
  const api = CommonService.getApiUrl("stub/getFileData");
  return CommonService.httpDelete(api, params);
}
function getFileDataS3(params) {
  // Params should include the path of S3
  const api = CommonService.getApiUrl("s3/getFileData");
  return CommonService.httpPost(api, params);
}
function changeDeploymentStatus(params) {
  // Params should include the path of S3
  const api = CommonService.getApiUrl("stub/changeDeploymentStatus");
  return CommonService.httpPost(api, params);
}


function getRawFileData(params) {
  // const api = CommonService.getApiUrl("stub/getRawFileData");
  const api = CommonService.getApiUrl("stub/getFileJustData");
  return CommonService.httpPost(api, params);
}
function changeDeployStatuses(params) {
  // const api = CommonService.getApiUrl("stub/getRawFileData");
  const api = CommonService.getApiUrl("stub/changeDeployColumns");
  return CommonService.httpPost(api, params);
}

function createSimulation(params) {
  let newConfigData =  JSON.parse(params.configData);
  let ajv = new Ajv({ allErrors: true });
  var valid = ajv.validate(hoverflySchema, newConfigData);
  if (valid) {
    if (
      params.modifiedHost !== undefined &&
      params.modifiedHost !== ""
    ) {

      newConfigData.data.pairs.forEach((pair, index) => {
       
        delete pair.request.headers.Svhost

      });

      newConfigData.data.pairs.forEach((pair, index) => {
        let newObj ={};
        Object.assign(newObj,params.modifiedHost);
        pair.request.headers = Object.assign(newObj,pair.request.headers);
      });
    }

    params.configData = JSON.stringify(newConfigData);
    const api = CommonService.getApiUrl("s3/addFileBucket");

    return CommonService.httpPost(api, params);
  } else {
    return new Promise((resolve, reject) => {
      let error = formatError(ajv.errors);
      return reject(error);
    });
  }
}

function formatError(errorArray) {
  console.log("errorArray::", errorArray);

  let errorComp = (
    <Row className="mt-3 mb-0 mr-0 ml-0">
      <Col xs="12">
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>Issue Type</th>
              <th>Issue</th>
              <th>Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {errorArray.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{item.keyword}</td>
              <td>{item.dataPath} {JSON.stringify(item.params)}</td>
                    <td>{item.message}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
  return { errorComp: errorComp, type: "validation" };
}

function saveSimulation(params) {
  let newConfigData = params.updatedData;
  let ajv = new Ajv({ allErrors: true });
  let valid = ajv.validate(hoverflySchema, newConfigData);
   if (valid) {
    const api = CommonService.getApiUrl("stub/saveStub");
    return CommonService.httpPost(api, params);
  } else {
    return new Promise((resolve, reject) => {
      let error = formatError(ajv.errors);
      return reject(error);
    });
  }
 
}

function getTagedObject(headers) {
  let finalTag = {};

  _.forEach(headers, (item) => {
    let arr = getMatcherObject(item);
    objectPath.set(finalTag, item.key, arr);
  });

  return finalTag;
}

function getRepoList(params) {
  const api = CommonService.getApiUrl("s3/getListOfTeamsReposS3");
  return CommonService.httpGet(api, params);
}

function getResponseHeadersObject(headers) {
  let finalTag = {};
  _.forEach(headers, (item) => {
    let arr = [item.value];
    objectPath.set(finalTag, item.key, arr);
  });

  return finalTag;
}

function getMatcherObject(item) {
  let obj = {};
  let arr = [];
  objectPath.set(obj, "value", item.value);
  objectPath.set(obj, "matcher", item.matcher);
  arr.push(obj);
  return arr;
}

function resonseObject(formdata) {
  let blk = {};
  objectPath.set(blk, "status", parseInt(formdata.resStatus.value));
  objectPath.set(blk, "body", formdata.resBody.value);
  objectPath.set(blk, "templated", formdata.templated.value);
  objectPath.set(blk, "encodedBody", formdata.encodedBody.value);

  let headersObj = getResponseHeadersObject(formdata.resHeaders);
  objectPath.set(blk, "headers", headersObj);
  return blk;
}

const generateEpjson = (formdata) => {
  let blank = {};
  let sets = {};

  let pathObj = getMatcherObject(formdata.path);
  objectPath.set(blank, "path", pathObj);

  let headersObj = getTagedObject(formdata.reqHeaders);
  objectPath.set(blank, "headers", headersObj);

  let queryObj = getTagedObject(formdata.query);
  objectPath.set(blank, "query", queryObj);

  let methodObj = getMatcherObject(formdata.reqMethod);
  objectPath.set(blank, "method", methodObj);

  let reqBodyObj = getMatcherObjectResponse(formdata.reqBody);
  objectPath.set(blank, "body", reqBodyObj);

  objectPath.set(sets, "request", blank);

  let resonseObjectValue = resonseObject(formdata);
  objectPath.set(sets, "response", resonseObjectValue);

  let delaysObject = getDelayObject(formdata.delay);
  objectPath.set(sets, "delays", delaysObject);

  return sets;
};

const generatePreview = (epdata) => {
  let pairs = [];
  let root = {};
  let data = {};
  let delays = [];
  let meta = {
    schemaVersion: "v5",
  };

  epdata.forEach((element) => {
    let sets = {};
    objectPath.set(sets, "request", element.epjson.request);
    objectPath.set(sets, "response", element.epjson.response);
    delays = element.epjson.delays;
    // pairs contains sets of requests and responses
    pairs.push(sets);
  });

  objectPath.set(root, "pairs", pairs);

  if (delays.length > 0) {
    let globalActionObj = {};
    let delayObj = getDelayObject(delays);
    if(delayObj.length > 0){
    objectPath.set(globalActionObj, "delays", delayObj);
    // root contains delays and pairs of req and response
    objectPath.set(root, "globalActions", globalActionObj);
    }
    
  }

  objectPath.set(data, "data", root);
  objectPath.set(data, "meta", meta);
  return data;
};
function getDelayMatcherObject(item) {
  let blk = {};
  if (item.urlPattern === undefined || item.urlPattern === "") {
    //do nothing
  } else if (item.delay === undefined || item.delay === null || item.delay === "NaN" || item.delay === "") {
    // do nothing
    } else {
   
    if (item.httpMethod === null || item.httpMethod === "" || item.httpMethod === undefined) {
      item.httpMethod = "GET";
    }
    objectPath.set(blk, "urlPattern", item.urlPattern);
    objectPath.set(blk, "httpMethod", item.httpMethod);
    objectPath.set(blk, "delay", parseInt(item.delay));
  }

  return blk;
}
function getDelayObject(delays) {
  let arr = [];
  _.forEach(delays, (item) => {
    let obj = getDelayMatcherObject(item);
    let emptyObject = _.isEmpty(obj);
    if(obj !== undefined && !emptyObject && obj !== ""){
    arr.push(obj);}
  });

  return arr;
}
function getMatcherObjectResponse(item) {
  let obj = {};
  let arr = [];
  if (item.value!=""){
  objectPath.set(obj, "value", item.value);
  objectPath.set(obj, "matcher", item.matcher);
  arr.push(obj);}
  return arr;
}
function upload(params) {
  const api = CommonService.getApiUrl("stub/uploadStub");
  return CommonService.httpPost(api, params);
}
function getObjectByVersion(params) {
  const api = CommonService.getApiUrl("s3/getS3ObjectByVersion");
  return CommonService.httpPost(api, params);
}
function callLambda(params) {
  const api = CommonService.getApiUrl("lambda/runLambda");
  return CommonService.httpPost(api, params);
}
function setApplicationDeploymentStatus(params) {
  const api = CommonService.getApiUrl("application/setApplicationDeploymentStatus");
  return CommonService.httpPost(api, params);
}
function checkApplicationDeploymentStatus(params) {
  const api = CommonService.getApiUrl("application/checkApplicationDeploymentStatus");
  return CommonService.httpPost(api, params);
}
function copyTeamFolder(params) {
  const api = CommonService.getApiUrl("s3/copyTeamFolder");
  return CommonService.httpPost(api, params);
}
function getS3PathsToDeploy(params) {
  const api = CommonService.getApiUrl("s3/getS3PathsToDeploy");
  return CommonService.httpPost(api, params);
}

const simulationService = {
  getAll,
  deleteOne,
  getFileData,
  getFileDataS3,
  generateEpjson,
  generatePreview,
  getRawFileData,
  saveSimulation,
  createSimulation,
  getRepoList,
  getFile,
  upload,
  getS3ObjectVerions,
  changeDeploymentStatus,
  changeDeployStatuses,
  getObjectByVersion,
  callLambda,
  setApplicationDeploymentStatus,
  checkApplicationDeploymentStatus,
  copyTeamFolder,
  getS3PathsToDeploy
};
export default simulationService;
