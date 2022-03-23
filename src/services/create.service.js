const objectPath = require("object-path");
const _ = require("lodash");

// Purpose : Service for create a new stub

const generatePreview = (preview, formdata) => {
  let blank = {};
  let sets = {};
  let data = {};
  let pairs = [];
  let root = {};
  // contains the value of previous APIs
  let prevAPI = preview;
  let meta = {
    schemaVersion: "v5",
  };

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
  // pairs contains sets of requests and responses
  pairs.push(sets);
  objectPath.set(root, "pairs", pairs);

  let globalActionObj = {};
  let delayObj = getDelayObject(formdata.delay);

  objectPath.set(globalActionObj, "delays", delayObj);
  // root contains delays and pairs of req and response
  objectPath.set(root, "globalActions", globalActionObj);

  objectPath.set(data, "data", root);
  objectPath.set(data, "meta", meta);
  if (preview !== "") {
    var previewPairs = objectPath.get(prevAPI, "data.pairs");
    var previewDelays = objectPath.get(prevAPI, "data.globalActions.delays");
    previewPairs.push(sets);
    if (typeof previewDelays !== "undefined" && previewDelays !== []) {
      if (typeof delayObj[0] !== "undefined") {
        previewDelays.push(delayObj[0]);
        objectPath.set(prevAPI, "data.globalActions.delays", previewDelays);
      }

    }
    objectPath.set(prevAPI, "data.pairs", previewPairs);
  } else {
    console.log("PREVIEW is empty");
  }
  return [prevAPI, data];
};

function getDelayObject(delays) {
  let arr = [];
  _.forEach(delays, (item) => {
    let obj = getDelayMatcherObject(item);
    let emptyObject = _.isEmpty(obj);
    if(obj !== undefined && !emptyObject && obj !== ""){
      console.log("obj",obj)
    arr.push(obj);
    }
  });

  return arr;
}
function getDelayMatcherObject(item) {
  let blk;
  if (item.urlPattern === undefined || item.urlPattern === "") {
    //do nothing
  } else if (item.delay === undefined || item.delay === null || item.delay === "NaN" || item.delay === "") {
    // do nothing
    } else {
   
    if (item.httpMethod === null || item.httpMethod === "" || item.httpMethod === undefined) {
      item.httpMethod = "GET";
    }
    blk = {};
    objectPath.set(blk, "urlPattern", item.urlPattern);
    objectPath.set(blk, "httpMethod", item.httpMethod);
    objectPath.set(blk, "delay", parseInt(item.delay));
  }

  return blk;
}

function resonseObject(formdata) {
  let blk = {};
  objectPath.set(blk, "status", parseInt(formdata.resStatus.value));
  objectPath.set(blk, "body", formdata.resBody.value);
  objectPath.set(blk, "templated", formdata.templated.value);
  objectPath.set(blk, "encodedBody", formdata.encodedBody.value);

  let headersObj = getTagedObject(formdata.resHeaders);
  objectPath.set(blk, "headers", headersObj);
  return blk;
}

function getTagedObject(headers) {
  let finalTag = {};

  _.forEach(headers, (item) => {
    let arr = getMatcherObject(item);
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
function getMatcherObjectResponse(item) {
  let obj = {};
  let arr = [];
  if (item.value!=""){
  objectPath.set(obj, "value", item.value);
  objectPath.set(obj, "matcher", item.matcher);
  arr.push(obj);}
  return arr;
}
const CreateService = {
  generatePreview,
};
export default CreateService;
