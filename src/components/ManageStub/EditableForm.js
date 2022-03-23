import React, { useState, useEffect } from "react";
import classNames from "classnames";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import FaAngleDown from "react-icons/lib/fa/angle-down";
import { Verbs } from "../../services/verbiage";

import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Typography,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardTitle,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";
import "../Create/create.css";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import FaMinusCircle from "react-icons/lib/fa/minus-circle";

import { AddToolTip } from "../../components/common/custom/AddToolTip";
const _ = require("lodash");
export default function EditableForm(props) {
  const {
    className,
    saveChanges,
    previewFinal,
    finish,
    uniqueId,
    application_code,
    handleAddEndPoint,
    ...rest
  } = props;

  // Hides or shows the Request part of the form
  const [method, setMethod] = useState({ matcher: "exact", value: "" });
  const [path, setPath] = useState({ matcher: "exact", value: "" });
  const [reqbody, setReqBody] = useState({ matcher: "exact", value: "" });

  const [resBody, setResBody] = useState({ matcher: "exact", value: "" });

  const [resStatus, setResStatus] = useState(200);
  const [templated, setTemplated] = useState(false);

  const [delayList, setDelayList] = useState([
    { urlPattern: "", delay: "", httpMethod: "GET" },
  ]);

  const [headerList, setHeaderList] = useState([
    { key: "", matcher: "exact", value: "" },
  ]);
  const [headerResList, setHeaderResList] = useState([
    { key: "", matcher: "exact", value: "" },
  ]);

  const [queryList, setQueryList] = useState([
    { key: "", matcher: "exact", value: "" },
  ]);

  const [hideRequestForm, setHideRequestForm] = useState(true);

  const [saveChangesPressed, setSaveChanges] = useState(false);

  //   More responses needs to be added
  const responseStatus = [
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    226,
    300,
    301,
    302,
    303,
    304,
    305,
    307,
    400,
    401,
    404,
    500,
    502,
  ];

  const getAllContainer = () => {
    // It populates the form from here
   let emptyObject =  _.isEmpty(props.data);
    if (props.data !== undefined && ! emptyObject) {
      let sectionData = props.data;
      console.log("Section Data i s ", sectionData);
     
      setMethod({
        matcher:sectionData.request.method[0].matcher,
        value:sectionData.request.method[0].value
      });

     
      let newPath = {
        matcher: sectionData.request.path[0].matcher,
        value: sectionData.request.path[0].value
      };
      setPath(newPath);

      let object = sectionData.request.headers;
      let headers = [];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          headers.push({
            key: key,
            matcher: element[0].matcher,
            value: element[0].value,
          });
        }
      }
      setHeaderList(headers);

      let object1 = sectionData.request.query;
      let querys = [];
      for (const key in object1) {
        if (object1.hasOwnProperty(key)) {
          const element1 = object1[key];
          querys.push({
            key: key,
            matcher: element1[0].matcher,
            value: element1[0].value,
          });
        }
      }
      setQueryList(querys);

      let object2 = sectionData.response.headers;
      let resheaders = [];
      for (const key in object2) {
        if (object2.hasOwnProperty(key)) {
          const element2 = object2[key];
          resheaders.push({
            key: key,
            matcher: "exact",
            value: element2[0],
          });
        }
      }

      setHeaderResList(resheaders);
      console.log("Debugg ", sectionData.request.body)
      if (sectionData.request.body && sectionData.request.body.length>0) {
        // checking if the body is greater than 0.
        
        setReqBody(sectionData.request.body[0]);
      } 
       else {
         setReqBody({ matcher: "exact", value: "" });
       }

      if (sectionData.response.body) {
        setResBody({ matcher: "exact", value: sectionData.response.body });
      } else {
        setResBody({ matcher: "exact", value: "" });
      }

      setTemplated(sectionData.response.templated);
      setResStatus(sectionData.response.status);

      if (sectionData.delays.length > 0) {
        let object3 = sectionData.delays;
        let delays = [];
        for (const element3 of object3) {
          delays.push({
            urlPattern: element3.urlPattern,
            httpMethod: element3.httpMethod,
            delay: element3.delay,
          });
        }
        setDelayList(delays);
      }
    }
  };

  const getStyle = () => {
    return hideRequestForm
      ? { visibility: "hidden", height: "1vh" }
      : { visibility: "visible" };
  };
  // handle input change for Queries
  const handleInputChangeQuery = (e, index) => {
    const { name, value } = e.target;
    const list = [...queryList];
    list[index][name] = value;
    setQueryList(list);
  };

  // Remove Queries
  const handleRemoveQuery = (index) => {
    const list = [...queryList];
    list.splice(index, 1);
    setQueryList(list);
  };
  // handle input change for Headers
  const handleInputChangeDelay = (e, index) => {
    const { name, value } = e.target;
    const list = [...delayList];
    list[index][name] = value;
    setDelayList(list);
  };

  // handle input change for Headers
  const handleInputChangeHeader = (e, index) => {
    const { name, value } = e.target;
    const list = [...headerList];
    list[index][name] = value;
    setHeaderList(list);
  };

  // Remove delay
  const handleRemoveDelay = (index) => {
    const list = [...delayList];
    list.splice(index, 1);
    setDelayList(list);
  };

  // Remove Header
  const handleRemoveHeader = (index) => {
    const list = [...headerList];
    list.splice(index, 1);
    setHeaderList(list);
  };

  // Response Headers
  // handle input change for Headers
  const handleInputChangeHeaderRes = (e, index) => {
    const { name, value } = e.target;
    const list = [...headerResList];
    list[index][name] = value;
    setHeaderResList(list);
  };

  // Remove Header
  const handleRemoveHeaderRes = (index) => {
    const list = [...headerResList];
    list.splice(index, 1);
    setHeaderResList(list);
  };
  const addDelay = () => {
    setDelayList([...delayList, { urlPattern: "", delay: 0, httpMethod: "GET" }]);
  };

  const addHeader = () => {
    setHeaderList([...headerList, { key: "", matcher: "exact", value: "" }]);
  };

  const addHeaderRes = () => {
    setHeaderResList([
      ...headerResList,
      { key: "", matcher: "exact", value: "" },
    ]);
  };
  const addQuery = () => {
    setQueryList([...queryList, { key: "", matcher: "exact", value: "" }]);
  };

  //call only once
  useEffect(() => {
    getAllContainer();
  }, [props.data]);

  const handleSaveChanges = (event) => {
    event.preventDefault();
     const formdata = {
      reqMethod: method,
      path: {
        value: path.value,
        matcher: path.matcher,
      },
      query: queryList,
      reqHeaders: headerList,
      reqBody: reqbody,
      resStatus: { value: resStatus },
      resHeaders: headerResList,
      resBody: {
        value: resBody.value,
      },
      templated: {
        value: templated === true ? true : false,
      },
      delay: delayList,
      encodedBody: {
        value: false,
      },
    };

    saveChanges(formdata);
    setSaveChanges(true);

  
    
    const target = event.target.name;
    console.log("target::", target);
    if (target === "FinishAndSubmit") {
      // if its a finish button , it would save changes and then finish
      finish();
    } else if (target === "AddEndPoint") {
      // if its a add end point  , it would save chnages and then add end point
      handleAddEndPoint();
    } else if (target === "FinishBesideAddEndPoint"){
       // if its a finish button beside add end point  , it would save changes and then finish
       finish();
    }
  };

  const handlePreviewFinal = (event) => {
    event.preventDefault();
    previewFinal();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(0),
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        <Col>
          <br></br>
          <Navbar expand="md">
            <Nav className="mr-auto" navbar></Nav>
            <Nav>
              <NavItem>
                <AddToolTip
                  placement="top-start"
                  title={Verbs.title.btn_Edit_AddEndPoints}
                >
                  <Button
                    name="AddEndPoint"
                    onClick={handleSaveChanges}
                    className={classNames(
                      "btn",
                      "btn-md",
                      "btn-secondary",
                      "ld-ext-right"
                    )}
                  >
                    Add More EndPoint
                  </Button>
                </AddToolTip>
              </NavItem>
            </Nav>

            {uniqueId === undefined ? (
              <Nav>
                <NavItem style={{ marginLeft: "5px" }}>
                  <AddToolTip
                    placement="top-start"
                    title={Verbs.title.btn_Edit_FinishSubmit}
                  >
                    <Button
                    name={"FinishBesideAddEndPoint"}
                      onClick={handleSaveChanges}
                      className={classNames(
                        "btn",
                        "btn-md",
                        "btn-success",
                        "ld-ext-right"
                      )}
                    >
                      Finish & Submit
                    </Button>
                  </AddToolTip>
                </NavItem>
              </Nav>
            ) : (
              ""
            )}
          </Navbar>
        </Col>
      </Row>
      {uniqueId !== undefined ? (
        <Form>
          <FormGroup>
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader
                subheader="Change the Request / Response matchers below and 'Validate Changes' before you update the changes."
                title="Edit EndPoint"
              />
              <Divider />

              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={7} xs={12}>
                    <Typography gutterBottom variant="h6">
                      <b> Request Matchers</b>
                    </Typography>
                    <br></br>
                    {/* Start of request Form */}
                    <div>
                      <Row>
                        <Col xs="2" style={{ paddingTop: "5px" }}>
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.method}
                          >
                            <InputLabel className="asterisk">Method</InputLabel>
                          </AddToolTip>
                        </Col>
                        <Col xs="10" style={{ paddingTop: "5px" }}>
                          <Row>
                            <Col xs="4">
                              <Input
                                type="select"
                                name="reqMethodValue"
                                size="sm"
                                value={method.value}
                                onChange={(e) => {
                                  let { matcher, value } = method;
                                  setMethod({
                                    matcher: matcher,
                                    value: e.target.value,
                                  });
                                }}
                              >
                                <option>GET</option>
                                <option>PUT</option>
                                <option>POST</option>
                                <option>DELETE</option>
                                <option>PATCH</option>
                                <option>HEAD</option>
                                <option>OPTIONS</option>
                                <option>TRACE</option>
                              </Input>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {/* Path */}
                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.path}
                          >
                            <InputLabel className="asterisk">Path</InputLabel>
                          </AddToolTip>
                        </Col>
                        <Col xs="10">
                          <Row>
                            <Col xs="4">
                              <Input
                                type="select"
                                name="pathMatcher"
                                size="sm"
                                value={path.matcher}
                                onChange={(e) => {
                                  let { matcher, value } = path;
                                  setPath({
                                    matcher: e.target.value,
                                    value: value,
                                  });
                                }}
                              >
                                <option>exact</option>
                                <option>glob</option>
                                <option>regex</option>
                              </Input>
                            </Col>
                           
                            <Col>
                              <Input
                                type="text"
                                name="pathValue"
                                placeholder="/api"
                                size="sm"
                                required
                                value={path.value}
                                onChange={(e) => {
                                  let { matcher, value } = path;
                                  setPath({
                                    matcher: matcher,
                                    value: e.target.value,
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      {/* Query 2.0  */}

                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.query}
                          >
                            <InputLabel>Query</InputLabel>
                          </AddToolTip>
                        </Col>

                        <Col xs="10">
                          <Row>
                            <div
                              style={{ paddingLeft: "4%", cursor: "pointer" }}
                              onClick={() => addQuery()}
                            >
                              <FaPlusCircle />
                            </div>
                          </Row>
                        </Col>
                      </Row>
                      {/* Dynamix Query Inputs  */}
                      {queryList.map((x, i) => {
                        return (
                          <Row style={{ marginTop: "3%" }} key={i}>
                            <Col xs="2"></Col>

                            <Col xs="10">
                              <Row>
                                <Col xs="4">
                                  <Input
                                    size="sm"
                                    type="text"
                                    name="key"
                                    placeholder="Query Key"
                                    value={x.key}
                                    onChange={(e) =>
                                      handleInputChangeQuery(e, i)
                                    }
                                  />
                                </Col>
                                <Col xs="2">
                                  <Input
                                    size="sm"
                                    type="select"
                                    name="matcher"
                                    value={x.matcher}
                                    onChange={(e) =>
                                      handleInputChangeQuery(e, i)
                                    }
                                  >
                                    <option>exact</option>
                                    <option>glob</option>
                                    <option>regex</option>
                                  </Input>
                                </Col>
                                <Col>
                                  <Input
                                    size="sm"
                                    type="text"
                                    name="value"
                                    placeholder="Query Value"
                                    value={x.value}
                                    onChange={(e) =>
                                      handleInputChangeQuery(e, i)
                                    }
                                  />
                                </Col>
                                {queryList.length !== 1 ? (
                                  <Col xs="1">
                                    <FaMinusCircle
                                      style={{
                                        color: "maroon",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleRemoveQuery(i)}
                                    />
                                  </Col>
                                ) : null}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}

                      {/* Header  */}

                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.requestHeader}
                          >
                            <InputLabel>Header</InputLabel>
                          </AddToolTip>
                        </Col>

                        <Col xs="10">
                          <Row>
                            <div
                              style={{ paddingLeft: "4%", cursor: "pointer" }}
                              onClick={() => addHeader()}
                            >
                              <FaPlusCircle />
                            </div>
                          </Row>
                        </Col>
                      </Row>

                      {/* Dynamix Header Inputs  */}
                      {headerList.map((x, i) => {
                        return (
                          <Row style={{ marginTop: "3%" }} key={i}>
                            <Col xs="2"></Col>

                            <Col xs="10">
                              <Row>
                                <Col xs="4">
                                  <Input
                                   disabled={i===0}
                                    size="sm"
                                    type="text"
                                    name="key"
                                    placeholder="Header Key"
                                    value={x.key}
                                    onChange={(e) =>
                                      handleInputChangeHeader(e, i)
                                    }
                                  />
                                </Col>
                                <Col xs="2">
                                  <Input
                                    disabled={i===0}
                                    size="sm"
                                    type="select"
                                    name="matcher"
                                    value={x.matcher}
                                    onChange={(e) =>
                                      handleInputChangeHeader(e, i)
                                    }
                                  >
                                    <option>exact</option>
                                    <option>glob</option>
                                    <option>regex</option>
                                  </Input>
                                </Col>
                                <Col>
                                  <Input
                                    disabled={i===0}
                                    size="sm"
                                    type="text"
                                    name="value"
                                    placeholder="Header Value"
                                    value={x.value}
                                    onChange={(e) =>
                                      handleInputChangeHeader(e, i)
                                    }
                                  />
                                </Col>
                                { i > 0 && headerList.length !== 1 ? (
                                  <Col xs="1">
                                    <FaMinusCircle
                                      style={{
                                        color: "maroon",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleRemoveHeader(i)}
                                    />
                                  </Col>
                                ) : null}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}
                      {/* Body */}
                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.requestBody}
                          >
                            <InputLabel>Body</InputLabel>
                          </AddToolTip>
                        </Col>

                        <Col xs="10">
                          <Row>
                            <Col xs="4">
                              <Input
                                type="select"
                                name="reqBodyMatcher"
                                size="sm"
                                value={reqbody.matcher}
                                onChange={(e) => {
                                  let { matcher, value } = reqbody;
                                  setReqBody({
                                    matcher: e.target.value,
                                    value: value,
                                  });
                                }}
                              >
                                <option>exact</option>
                                <option>glob</option>
                                <option>regex</option>
                                <option>JSON</option>
                                <option>JSON partial</option>
                                <option>JSONPath</option>
                                <option>XML</option>
                                <option>XPath</option>
                              </Input>
                            </Col>
                            <Col>
                              <Input
                                type="select"
                                name="reqBodyContentType"
                                size="sm"
                              >
                                <option>Editor Mode: JSON</option>
                                <option>Editor Mode: XML</option>
                                <option>Editor Mode: HTML</option>
                                <option>Editor Mode: Plain text</option>
                              </Input>
                            </Col>
                          </Row>

                          <Row style={{ marginTop: "3%" }}></Row>
                          <Row style={{ marginTop: "3%" }}>
                            <Col>
                              <Input
                                size="sm"
                                type="textarea"
                                name="reqBodyValue"
                                placeholder="Enter Body Here"
                                maxLength="1000"
                                rows="5"
                                value={reqbody.value}
                                onChange={(e) => {
                                  let { matcher, value } = reqbody;
                                  setReqBody({
                                    matcher: matcher,
                                    value: e.target.value,
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <Typography gutterBottom variant="h6">
                      <b>Response Matchers</b>
                    </Typography>
                    <br></br>
                    <div
                      id="responseForm"
                      style={{
                        borderLeft: "1px solid #eeeeee",
                        paddingLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col xs="2" style={{ paddingTop: "5px" }}>
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.status}
                          >
                            <InputLabel>Status</InputLabel>
                          </AddToolTip>
                        </Col>
                        <Col xs="10" style={{ paddingTop: "5px" }}>
                          <Row>
                            <Col xs="4">
                              <Input
                                size="sm"
                                type="select"
                                name="resStatus"
                                value={resStatus}
                                onChange={(e) => {
                                  setResStatus(e.target.value);
                                }}
                              >
                                {responseStatus.map((res, i) => (
                                  <option key={i}>{res}</option>
                                ))}
                              </Input>
                            </Col>
                            <Col
                              xs="3"
                              style={{ paddingTop: "5px", marginRight: "10px" }}
                            >
                              <InputLabel>Templated</InputLabel>
                            </Col>
                            <Col xs="4">
                              <Input
                                size="md"
                                type="checkbox"
                                name="templated"
                                checked={templated}
                                onChange={(e) => {
                                  setTemplated(e.target.checked);
                                }}
                              ></Input>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      {/* Start of Response Header */}
                      {/* Header  */}

                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.responseHeader}
                          >
                            <InputLabel>Header</InputLabel>
                          </AddToolTip>
                        </Col>

                        <Col xs="10">
                          <Row>
                            <div
                              style={{ paddingLeft: "4%", cursor: "pointer" }}
                              onClick={() => addHeaderRes()}
                            >
                              <FaPlusCircle />
                            </div>
                          </Row>
                        </Col>
                      </Row>

                      {/* Dynamix Header Inputs  */}
                      {headerResList.map((x, i) => {
                        return (
                          <Row style={{ marginTop: "3%" }} key={i}>
                            <Col xs="2"></Col>

                            <Col xs="10">
                              <Row>
                                <Col xs="4">
                                  <Input
                                    size="sm"
                                    type="text"
                                    name="key"
                                    placeholder="Key"
                                    value={x.key}
                                    onChange={(e) =>
                                      handleInputChangeHeaderRes(e, i)
                                    }
                                  />
                                </Col>
                                <Col xs="3">
                                  <Input
                                    size="sm"
                                    type="select"
                                    name="matcher"
                                    value={x.matcher}
                                    onChange={(e) =>
                                      handleInputChangeHeaderRes(e, i)
                                    }
                                  >
                                    <option>exact</option>
                                    <option>glob</option>
                                    <option>regex</option>
                                  </Input>
                                </Col>
                                <Col xs="4">
                                  <Input
                                    size="sm"
                                    type="text"
                                    name="value"
                                    placeholder="Value"
                                    value={x.value}
                                    onChange={(e) =>
                                      handleInputChangeHeaderRes(e, i)
                                    }
                                  />
                                </Col>
                                {headerResList.length !== 1 ? (
                                  <Col xs="1">
                                    <FaMinusCircle
                                      style={{
                                        color: "maroon",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleRemoveHeaderRes(i)}
                                    />
                                  </Col>
                                ) : null}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}
                      {/* Body */}
                      <Row style={{ marginTop: "3%" }}>
                        <Col xs="2">
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.responseBody}
                          >
                            <InputLabel>Body</InputLabel>
                          </AddToolTip>
                        </Col>

                        <Col xs="10">
                          <Row>
                            <Col xs="4">
                              <Input
                                type="select"
                                name="resBodyMatcher"
                                size="sm"
                                value={resBody.matcher}
                                onChange={(e) => {
                                  let { matcher, value } = resBody;
                                  setResBody({
                                    matcher: e.target.value,
                                    value: value,
                                  });
                                }}
                              >
                                <option>exact</option>
                                <option>glob</option>
                                <option>regex</option>
                                <option>JSON</option>
                                <option>JSON partial</option>
                                <option>JSONPath</option>
                                <option>XML</option>
                                <option>XPath</option>
                              </Input>
                            </Col>
                            <Col>
                              <Input
                                type="select"
                                name="resBodyContentType"
                                size="sm"
                              >
                                <option>Editor Mode: JSON</option>
                                <option>Editor Mode: XML</option>
                                <option>Editor Mode: HTML</option>
                                <option>Editor Mode: Plain text</option>
                              </Input>
                            </Col>
                          </Row>

                          <Row style={{ marginTop: "3%" }}>
                            <Col>
                              <Input
                                size="sm"
                                type="textarea"
                                name="resBodyValue"
                                placeholder="Enter Body Here"
                                maxLength="50000"
                                rows="16"
                                value={resBody.value}
                                onChange={(e) => {
                                  let { matcher, value } = resBody;
                                  setResBody({
                                    matcher: matcher,
                                    value: e.target.value,
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Grid>
                </Grid>

                {/* Delays  */}
                <Grid container spacing={2}>
                  <Grid item md={7} xs={12}>
                  <Row style={{ marginTop: "3%" }}>
                    <Col xs="2">
                      <AddToolTip
                        placement="top-start"
                        title={Verbs.title.delays}
                      >
                        <InputLabel>Delays</InputLabel>
                      </AddToolTip>
                    </Col>

                    <Col xs="10">
                      <Row>
                        <div
                          style={{ paddingLeft: "3%", cursor: "pointer" }}
                          onClick={() => addDelay()}
                        >
                          <FaPlusCircle />
                        </div>
                      </Row>
                    </Col>
                  </Row>
                   
                      {/* Dynamix Header Inputs  */}
                      {delayList.map((x, i) => {
                        return (
                          <Row style={{ marginTop: "3%" }} key={i}>
                            <Col xs="2"></Col>

                            <Col xs="10">
                              <Row>
                                <Col xs="5">
                                  <Input
                                    size="sm"
                                    type="text"
                                    name="urlPattern"
                                    placeholder="URL Pattern"
                                    value={x.urlPattern}
                                    onChange={(e) =>
                                      handleInputChangeDelay(e, i)
                                    }
                                  />
                                </Col>
                                <Col xs="3">
                                  <Input
                                    size="sm"
                                    type="number"
                                    name="delay"
                                    placeholder="Delay"
                                    value={x.delay}
                                    onChange={(e) =>
                                      handleInputChangeDelay(e, i)
                                    }
                                  />
                                </Col>
                                <Col>
                                  <Input
                                    size="sm"
                                    type="select"
                                    name="httpMethod"
                                    placeholder="Method"
                                    value={x.httpMethod}
                                    onChange={(e) =>
                                      handleInputChangeDelay(e, i)
                                    }
                                  >
                                    <option>GET</option>
                                    <option>PUT</option>
                                    <option>POST</option>
                                    <option>DELETE</option>
                                    <option>PATCH</option>
                                    <option>HEAD</option>
                                    <option>OPTIONS</option>
                                    <option>TRACE</option>
                                  </Input>
                                </Col>
                                {delayList.length !== 1 ? (
                                  <Col xs="1">
                                    <FaMinusCircle
                                      style={{
                                        color: "maroon",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleRemoveDelay(i)}
                                    />
                                  </Col>
                                ) : null}
                              </Row>
                            </Col>
                          </Row>
                        );
                      })}
                  </Grid>
                </Grid>
                <Row>
                  <Col xs="12">
                    <br></br>
                    <Navbar expand="md">
                      <Nav className="mr-auto" navbar></Nav>
                      <Nav>
                        <NavItem>
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.btn_Edit_SaveChanges}
                          >
                            <Button
                              onClick={handleSaveChanges}
                              name="SaveChanges"
                              className={classNames(
                                "btn",
                                "btn-md",
                                "btn-secondary",
                                "ld-ext-right"
                              )}
                            >
                              Validate Changes
                            </Button>
                          </AddToolTip>
                        </NavItem>
                      </Nav>
                      <Nav>
                        <NavItem style={{ marginLeft: "5px" }}>
                          <AddToolTip
                            placement="top-start"
                            title={Verbs.title.btn_Edit_Preview}
                          >
                            <Button
                              onClick={handlePreviewFinal}
                              className={classNames(
                                "btn",
                                "btn-md",
                                "btn-secondary",
                                "ld-ext-right"
                              )}
                            >
                              Preview
                            </Button>
                          </AddToolTip>
                        </NavItem>
                      </Nav>
                      <Nav>
                        <NavItem style={{ marginLeft: "5px" }}>
                          {saveChangesPressed ? (
                            <AddToolTip
                              placement="top-start"
                              title={Verbs.title.btn_Edit_FinishSubmit}
                            >
                              <Button
                                onClick={handleSaveChanges}
                                name="FinishAndSubmit"
                                className={classNames(
                                  "btn",
                                  "btn-md",
                                  "btn-success",
                                  "ld-ext-right"
                                )}
                              >
                                Finish & Submit
                              </Button>
                            </AddToolTip>
                          ) : (
                            ""
                          )}
                        </NavItem>
                      </Nav>
                    </Navbar>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </FormGroup>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
}

