import React, { useState ,useContext} from "react";
import classNames from "classnames";
import { getRole } from "../../services/authentication";
import SimulationService from "../../services/simulation.service";
import Swal from "sweetalert2";
import { AddToolTip } from "../../components/common/custom/AddToolTip";
import { Verbs } from "../../services/verbiage";
import ValidationDialog from "../ManageStub/ValidationDialog";
import { Grid, Divider, Typography, InputLabel } from "@material-ui/core";

import {
  Container,
  Button,
  Form,
  Input,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
  Spinner,
} from "reactstrap";
import "./create.css";
import FaPlusCircle from "react-icons/lib/fa/plus-circle";
import FaMinusCircle from "react-icons/lib/fa/minus-circle";
import CreateService from "../../services/create.service";
import Preview from "./Preview";
import { GlobalContext } from "../../context/GlobalState";
export default function Create(props) {
    
 //Purpose : For creating a new stub we are using this component
 

  const {selected_entity_data } = useContext(GlobalContext);

  //Prepare the Svhost mandatory header for all endpoints
  const getModifiedHost = () => {
    let host =  String(props.location.state.team_code)
    host = host +'-' + String(props.location.state.application_code)
    host = host +'-' + String(props.location.state.valueChain_name)
    host = host +'-' + String(props.location.state.program_name).slice(0,3)
    if(process.env.REACT_APP_STAGE !== "production")
    {
      host =  host + "-dev"; 
    }
    host =  host + ".*"; 
    return String(host).toLowerCase();  
    }
  let modifiedHostValue = getModifiedHost();
  const [validOpen, setValidOpen] = useState(false);
  const [validationList, setValidationList] = useState("");

  const userRole = getRole();

  const [application_code, setApplicationCode] = useState(
    props.location.state.application_code
  );

  const [finalTeamName, setFinalTeamName] = useState(
    props.location.state.team_name
  );
  const [folderStructure_id] = useState(
    props.location.state.folderStructure_id
  );
  const { className, ...rest } = props;
 
  const [method, setMethod] = useState({ matcher: "exact", value: "GET" });
  const [path, setPath] = useState({ matcher: "exact", value: "" });
  const [reqbody, setReqBody] = useState({ matcher: "exact", value: "" });
  const [resBody, setResBody] = useState({ matcher: "exact", value: "" });

  const [resStatus, setResStatus] = useState(200);
  const [templated, setTemplated] = useState(false);
  const [delayList, setDelayList] = useState([]);


  const [headerList, setHeaderList] = useState([
    { key: "Svhost", matcher: "glob", value: modifiedHostValue },
  ]);
  const [headerResList, setHeaderResList] = useState([
    { key: "", matcher: "exact", value: "" },
  ]);

  const [queryList, setQueryList] = useState([
    { key: "", matcher: "exact", value: "" },
  ]);
  // Contains all the fiels of form that doesn't have multiple inputs
  const [loading, setLoading] = useState(false);
  // This contains the values of all the APIs
  const [preview, setPreview] = useState("");
  // Used for viewing current API only.
  const [currentPreview, setCurrentPreview] = useState("");

  const [hideRequestForm, setHideRequestForm] = useState(true);
  // sets the name of the button that called the onsubmit function.
  const [buttonName, setbuttonName] = useState("");

  // set FileName for final BitBucket
  const [finalFileName, setFinalFileName] = useState("");

  // used to re-render the page
  const [loadAgain, setLoadAgain] = useState(true);

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

  const getData = () => {
    if (buttonName === "preview") {
      return currentPreview;
    } else {
      return preview;
    }
  };

  const getBitbucketButton = () => {
    return buttonName === "finish"
      ? { visibility: "visible", width: "100vw" }
      : { visibility: "hidden", height: "1vh" };
  };

  const getFinishButton = () => {
    return buttonName === "finish"
      ? { visibility: "hidden", height: "1vh" }
      : { visibility: "visible" };
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
  // set file name for created simulation file.
  const onChangeFileName = (e) => {
    console.log("Filename is ", e.target.value);
    setFinalFileName(e.target.value);
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
    setDelayList([...delayList, { urlPattern: "", delay: 0, httpMethod: "" }]);
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
  const reset = () => {
    document.getElementById("createForm").reset();
    setCurrentPreview("");
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      saveToBitBucket();
    }
  };
  const generatePreview = (buttonName) => {
  //upon save changes we are generating the Json which can be previewed
    setLoading(true);
    if (path.value === "") {
      Swal.fire("Validation Failed", "Please Enter The Path", "warning");
    } else {
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

      // preview contains the data for all APIs
      var jsonpreview = CreateService.generatePreview(
        preview === "" ? preview : JSON.parse(preview),
        formdata
      );

      // allAPI contains all the APIs except the currently entered value in form
      var AllAPI = JSON.stringify(jsonpreview[0], undefined, 4);

      jsonpreview = jsonpreview[1];

      //All API contains all the APIs added till point
      // formatted contains the current api
      let formated = JSON.stringify(jsonpreview, undefined, 4);
      setTimeout(function () {
        if (buttonName === "preview") {
          setCurrentPreview(formated);
        }

        if (buttonName === "finish" || buttonName === "addAPI") {
          if (preview === "") {
            console.log("preview::",formated)
            setPreview(formated);
          } else {
            console.log("AllAPI",AllAPI)
            setPreview(AllAPI);
          }
        }

        // add API would add a blank record and reset the form

        if (buttonName === "addAPI") {
          reset();
          setCurrentPreview("");
          setDelayList(delayList);
          setMethod({ matcher: "exact", value: "GET" });
          setHeaderList([{ key: "Svhost", matcher: "glob", value: modifiedHostValue }]);
          setQueryList([{ key: "", matcher: "exact", value: "" }]);
          setHeaderResList([{ key: "", matcher: "exact", value: "" }]);
          setPath({ matcher: "exact", value: "" });
          setReqBody({ matcher: "exact", value: "" });
          setResBody({ matcher: "exact", value: "" });
          setTemplated(false);
          setResStatus(200);
        }
        setLoading(false);
      }, 30);
    }
  };

  const saveToBitBucket = () => {
    // Saves to S3.
    setLoading(true);
    if (finalFileName !== "" && finalTeamName) {
      let input_value = {
        team: finalTeamName,
        fileName: finalFileName,
        configData: preview,
        folderStructure_id: folderStructure_id,
        s3_path:
        props.location.state.folderStructureS3 +
          "/" +
          finalTeamName.replace(/ /, "_"),
      };

      // call the create service
      SimulationService.createSimulation(input_value)
        .then((response) => {
          setLoading(false);
          if (response.data.code === 200) {
            Swal.fire({
              title: "Congratulations !",
              html:
                "Virtual service has been created. \n Now you can deploy the service from Manage Virtual Services page",
              icon: "success",
              onClose: () => {
                console.log("REMOVE Triggered on close");
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              props.history.push({
                pathname: "managestub",
                state: {
                application_code : props.location.state.application_code, 
                application_id:props.location.state.application_id,
                folderStructureS3: props.location.state.folderStructureS3,
                folderStructure_id: props.location.state.folderStructure_id,
                program_id: props.location.state.program_id,
                program_name: props.location.state.program_name,
                team_code: props.location.state.team_code,
                team_id: props.location.state.team_id,
                team_name: props.location.state.team_name,
                valueChain_id : props.location.state.valueChain_id,
                valueChain_name: props.location.state.valueChain_name

                },
              });
            });
          } else if (response.data.code === 500) {
            Swal.fire("Error !", response.data.message, "error");
          } else {
            Swal.fire("Error", "Error In Creating Service.", "error");
          }
        })
        .catch((error) => {
          //There is some error in create.
          console.log("Errors::", error);
          if (error.type === "validation") {
            Swal.fire({
              title: "Error",
              text: "Failed To Save The Service.",
              icon: "error",
              showCloseButton: true,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Show Details",
            }).then((result) => {
              if (result.value) {
                setValidOpen(true);
                setValidationList(error.errorComp);
              }
            });
          }
        });
    } else {
      setLoading(false);
      Swal.fire(
        "Validation Failed",
        "Please Enter Virtual Service Name",
        "warning"
      );
    }
  };

  return (
    <Container>
      {console.log("Create Props are ",props.location.state)}
      <>
        <ValidationDialog
          validOpen={validOpen}
          setValidOpen={setValidOpen}
          validationList={validationList}
        ></ValidationDialog>
        <div className="white">
          <Form id="createForm">
            <h3>Create Virtual Service</h3>
            <Divider />
            <br></br>
            <Grid container spacing={2}>
              <Grid item md={7} xs={12}>
                <Typography gutterBottom variant="h6">
                  <b>Request Matchers</b>
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
                  <br></br>
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
                                onChange={(e) => handleInputChangeQuery(e, i)}
                              />
                            </Col>
                            <Col xs="2">
                              <Input
                                size="sm"
                                type="select"
                                name="matcher"
                                value={x.matcher}
                                onChange={(e) => handleInputChangeQuery(e, i)}
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
                                onChange={(e) => handleInputChangeQuery(e, i)}
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
<br></br>
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
                                onChange={(e) => handleInputChangeHeader(e, i)}
                              />
                            </Col>
                            <Col xs="2">
                              <Input
                                disabled={i===0}
                                size="sm"
                                type="select"
                                name="matcher"
                                value={x.matcher}
                                onChange={(e) => handleInputChangeHeader(e, i)}
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
                                onChange={(e) => handleInputChangeHeader(e, i)}
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
                  <br></br>
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
                            rows="7"
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
                  <b> Response Matchers</b>
                </Typography>
                <br></br>
                {/* Start of Response Form */}

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
<br></br>
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
                                name="resHeaderKey"
                                placeholder="Key"
                                value={x.resHeaderKey}
                                onChange={(e) =>
                                  handleInputChangeHeaderRes(e, i)
                                }
                              />
                            </Col>
                            <Col xs="3">
                              <Input
                                size="sm"
                                type="select"
                                name="resHeaderMatcher"
                                value={x.resHeaderMatcher}
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
                                name="resHeaderValue"
                                placeholder="Value"
                                value={x.resHeaderValue}
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
                  <br></br>
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
                                onChange={(e) => handleInputChangeDelay(e, i)}
                              />
                            </Col>
                            <Col xs="3">
                              <Input
                                size="sm"
                                type="number"
                                name="delay"
                                placeholder="Delay"
                                value={x.delay}
                                onChange={(e) => handleInputChangeDelay(e, i)}
                              />
                            </Col>
                            <Col>
                              <Input
                                size="sm"
                                type="select"
                                name="httpMethod"
                                placeholder="Method"
                                value={x.httpMethod}
                                onChange={(e) => handleInputChangeDelay(e, i)}
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
              <Col>
                <br></br>



                <Navbar style={getFinishButton()} expand="md">
                  <Nav className="ml-auto" navbar>

                  <NavItem style={{ marginBottom: "1%" }}>
                      <AddToolTip
                        placement="top-start"
                        title={"Navigate back to previous page"}
                      >

                        <Button
                          expand="md"
                          color="danger"
                          onClick={() => {
                            props.history.goBack();
                          }}
                          className={classNames(
                            "btn",
                            "btn-md",
                            "btn-secondary",
                            "ld-ext-right"
                          )}
                        >
                          Cancel
                        </Button>
                      </AddToolTip>
                    </NavItem>

                    
                    <NavItem style={{ marginBottom: "1%" }}>
                      <AddToolTip
                        placement="top-start"
                        title={Verbs.title.btn_Create_AddEndPoints}
                      >

                        <Button
                          style={{ marginLeft: "10px" }}
                          expand="md"
                          name="finish"
                          onClick={() => {
                            if (path.value === "") {
                              Swal.fire(
                                "Validation Failed !",
                                "Please Enter The Path",
                                "warning"
                              );
                            } else {
                            setbuttonName();
                            generatePreview("addAPI");
                            }
                          }}
                          value="previewww"
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

                    {preview !== "" ? (
                      <NavItem style={{ marginBottom: "1%" }}>
                        <AddToolTip
                          placement="top-start"
                          title={Verbs.title.btn_Create_PreviewAll}
                        >
                          <Button
                            style={{ marginLeft: "10px" }}
                            name="finish"
                            value="hello"
                            onClick={() => {
                              setbuttonName("previewAll");
                              setLoadAgain(!loadAgain);
                            }}
                            className={classNames(
                              "btn",
                              "btn-md",
                              "btn-success",
                              "ld-ext-right"
                            )}
                          >
                            View All previous APIs
                          </Button>
                        </AddToolTip>
                      </NavItem>
                    ) : (
                      <></>
                    )}
                    <NavItem style={{ marginBottom: "1%" }}>
                      <Button
                        style={{ marginLeft: "10px" }}
                      
                        name="finish"
                        value="hello"
                        onClick={() => {
                          if (path.value === "") {
                            Swal.fire(
                              "Validation Failed !",
                              "Please Enter The Path",
                              "warning"
                            );
                          } else {
                            setbuttonName("finish");
                            generatePreview("finish");
                          }
                        }}
                        className={classNames(
                          "btn",
                          "btn-md",
                          "btn-success",
                          "ld-ext-right"
                        )}
                      >
                        Next
                      </Button>
                    </NavItem>
                  </Nav>
                </Navbar>
              </Col>
            </Row>
            <Row style={getBitbucketButton()}>
           
              <Col xs={3} style={{marginLeft:"100px"}}>
                <Input
                  type="text"
                  name="fileName"
                  placeholder="Enter Virtual Service Name"
                  onChange={(e) => onChangeFileName(e)}
                  size="md"
                  onKeyDown={(e) => onKeyDown(e)}
                />
              </Col>
              <Col>
                <AddToolTip
                  placement="top-start"
                  title={Verbs.title.btn_Create_SaveStub}
                >
                  <Button
                    name="finish"
                    onClick={saveToBitBucket}
                    value="previewww"
                    className={classNames(
                      "btn",
                      "btn-md",
                      "btn-success",
                      "ld-ext-right"
                    )}
                  >
                    Save Virtual Service
                  </Button>
                </AddToolTip>
              </Col>
            </Row>

            {loading === true ? (
              <Row className="mt-3">
                <Col className="text-center">
                  <Spinner className="p-5" color="primary" />
                </Col>
              </Row>
            ) : (
              ""
            )}

            {(preview !== "" || currentPreview !== "") &&
            buttonName !== "addAPI" ? (
              <Row>
                <Col xs="12">
                  {/* here it will be current or final one  */}
                  <br></br>{" "}
                  <Preview
                    preview={getData()}
                    buttonName={buttonName}
                  ></Preview>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Form>
        </div>
      </>
    </Container>
  );
}
