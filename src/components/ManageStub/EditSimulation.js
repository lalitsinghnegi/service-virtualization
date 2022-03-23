import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
import Snapshot from "./Snapshot";
import EditableForm from "./EditableForm";
import EndpointsList from "./EndpointsList";
import Preview from "../Create/Preview";

import SimulationService from "../../services/simulation.service";
import { AddToolTip } from "../../components/common/custom/AddToolTip";
import { Verbs } from "../../services/verbiage";
import ValidationDialog from "../ManageStub/ValidationDialog";
import { Divider } from "@material-ui/core";
import logger from "../../utilities/logger";
import {
  Container,
  Button,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import "../Create/create.css";

export default function EditSimulation(props) {
  const { className, ...rest } = props;
  const getModifiedHost = () => {
    // prepare the Svhost to add a mandatory header
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
  const [preview, setPreview] = useState("");
  const [epDataChanged, setEpiDataChanged] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [epdata, setEPData] = useState(props.location.state.epdata);
  const [revision, setRevision] = useState(0);
  // has data of different Versions of an object
  const [s3VersionDetails, setS3VersionDetails] = useState({
    result: [
      {
        LastModified: "",
        VersionId: "",
        IsLatest: true,
        Key: "",
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [application_code, setApplicationCode] = useState(
    props.location.state.application_code
  );

  const [validOpen, setValidOpen] = useState(false);
  const [validationList, setValidationList] = useState("");

  const handleRowClick = (rowData) => {
    // upon row selection
    setSelectedRowData(rowData);
  };
  const handleRowDelete = (rowData) => {
    //upon row deletion
    let tempEpdata = epdata;
    let arr = tempEpdata.filter(function (item, index, arr) {
      return item.uniqueId !== rowData.uniqueId;
    });

    setEPData(arr);
    setSelectedRowData({ epjson: {} });
    setRevision(Math.random());
  };
  const onChangeS3Version = async (e) => {
    //upon selectiing the version 
    setLoading(true);
    // If it contains latest in the value, remove it
    var value = e.target.value.replace(/\(latest\)/g, "");
    var selectedObjectData =
      s3VersionDetails.result[s3VersionDetails.result[0].length - value];

    await SimulationService.getFileDataS3({
      s3_path: selectedObjectData.Key,
      versionId: selectedObjectData.VersionId,
    })
      .then((response) => {
        setLoading(false);
        
        if (response.data && response.data.data && response.data.data.epdata) {
          setEPData(response.data.data.epdata);
          setEpiDataChanged(true);
          setSelectedRowData({});
          setRevision(Math.random());
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleSaveChanges = (formdata) => {
    //upon saving the local changes
    let tempEpdata = epdata;

    let new_epjson = SimulationService.generateEpjson(formdata);
    tempEpdata.forEach((element) => {
      if (element.uniqueId === selectedRowData.uniqueId) {
        element.ep = new_epjson.request.path[0].value;
        element.method = new_epjson.request.method[0].value;
        element.epjson = new_epjson;
      }
      element.epjson.delays = new_epjson.delays;
    });

    setEPData(tempEpdata);
    setRevision(Math.random());
  };
  const handleAddEndPoint = () => {
    //upon addding the a new point, add a blank record with default data
    let tempEpdata = epdata;
    let element = {};
    element.ep =
      "Please enter path for the new endpoint below and Save Changes";

    let delays = "";

    if (
      tempEpdata.length > 0 &&
      typeof tempEpdata[0].epjson !== undefined &&
      typeof tempEpdata[0].epjson.delays !== undefined &&
      tempEpdata[0].epjson.delays.length > 0
    ) {
      delays = tempEpdata[0].epjson.delays;
    }

    // this is the default data in new record
    element.epjson = {
      request: {
        method: [{ matcher: "exact", value: "GET" }],
        path: [{ matcher: "exact", value: "" }],
        headers: {
          "Svhost": [
            {
            matcher: "glob",
            value: modifiedHostValue 
          }
          ]
        },
        query: {
          "": [
            {
              matcher: "exact",
              value: "",
            },
          ],
        },
      },
      response: {
        status: 200,
        templated: false,
        headers: { "": [""] },
      },
      delays: delays,
    };
    element.method = "GET";
    element.uniqueId = Math.random();

    element.tableData = { id: tempEpdata.length + 1 };
    tempEpdata.push(element);

    setEPData(tempEpdata);
    setSelectedRowData(element);
    setRevision(Math.random());
  };

  const handlePreviewFinal = () => {
    // preview contains the data for all APIs
    var jsonpreview = SimulationService.generatePreview(epdata);
    let formated = JSON.stringify(jsonpreview, undefined, 4);
    setPreview(formated);
  };
  const handleFinish = async () => {
    // preview contains the data for all APIs
    var jsonpreview = SimulationService.generatePreview(epdata);
    let formated = JSON.stringify(jsonpreview, undefined, 4);

    
    let updatedRec = props.location.state.record;
    updatedRec.endPoints_count = epdata.length;
    SimulationService.saveSimulation({
      record: updatedRec,
      updatedData: jsonpreview,
    }).then(async(response) => {
      if (response.data.code === 200) {
     
        setPreview(formated);
        //  On editing in edit screen change the status from deployed to Deployed (modified)
        let simResponse =await SimulationService.changeDeploymentStatus({stub_id:props.location.state.record.stub_id})
        // var simResponse = true
        logger.info("SimulationService.changeDeploymentStatus->", simResponse)
        if (simResponse === undefined)
          {
            Swal.fire("Success !", "Something went wrong", "Error");
            props.history.goBack();
          } else {
            Swal.fire(
              "Success !",
              "Changes were successfully saved",
              "success"
            );
            props.history.goBack();
          }
        } else {
          Swal.fire(
            "Error !",
            "Changes could not be saved due to internal error.",
            "error"
          );
        }
      })
      .catch((error) => {
        //the json is not ok
        logger.info("Errors::", error);
        if (error.type === "validation") {
          Swal.fire({
            title: 'Error',
            text: "Failed to save the Virtual Service.",
            icon: 'error',
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Show Details'
          }).then((result) => {
            if (result.value) {
           setValidOpen(true)
           setValidationList(error.errorComp)
            }
          })
        }
      });
  };

  const getData = async () => {
    setLoading(true);
        await SimulationService.getS3ObjectVerions({
          prefix: props.location.state.record.s3_path
        })
        .then(response =>{
          setLoading(false);
          if(response.data !== undefined)
          setS3VersionDetails(response.data);
        })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <>
        <ValidationDialog
          validOpen={validOpen}
          setValidOpen={setValidOpen}
          validationList={validationList}
        ></ValidationDialog>
        <div className="white mt-3">
          <h3>Edit Virtual Service</h3>
          <Divider />
          <Row style={{ marginTop: "2vh",marginLeft:"2vh" }}>
            <Col xs="1.5">
              {" "}
              <Label>Select Version</Label>
            </Col>
            <Col xs="3">
              <Input
                type="select"
                name="s3VersionOptions"
                size="sm"
                onChange={(e) => onChangeS3Version(e)}
              >
                {s3VersionDetails.result.map((dataItem, index) => {
                  return <option key={index}>{dataItem.version}</option>;
                })}
              </Input>
            </Col>
          </Row>
          {loading === true ? (
            <Row className="mt-3">
              <Col className="text-center">
                <Spinner className="p-5" color="primary" />
              </Col>
            </Row>
          ) : (
            <>
              <Row style={{ marginTop: "2vh" }}>
                <Col xs="6">
                  <EndpointsList
                    epdata={epdata}
                    handleRowClick={handleRowClick}
                    handleRowDelete={handleRowDelete}
                    selectedRowData={selectedRowData}
                    revision={revision}
                  ></EndpointsList>
                </Col>
                <Col xs="6">
                  {console.log("SELECTION bias here is ", selectedRowData)}
                  <Snapshot
                   revision={revision}
                   selectedRowData={selectedRowData}
                  ></Snapshot>
                </Col>
              </Row>
                <Row>
                  <Col xs="12">
                    <br></br>
                    <EditableForm
                      uniqueId={selectedRowData.uniqueId}
                      data={selectedRowData.epjson}
                      saveChanges={handleSaveChanges}
                      previewFinal={handlePreviewFinal}
                      finish={handleFinish}
                      application_code={application_code}
                      handleAddEndPoint ={handleAddEndPoint}
                    ></EditableForm>
                  </Col>
                </Row>
            

              {preview !== "" ? (
                <Row>
                  <Col xs="12">
                    {/* here it will be current or final one  */}
                    <br></br>{" "}
                    <Preview
                      preview={preview}
                      buttonName={"finish"}
                      rows={25}
                    ></Preview>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </>
    </Container>
  );
}
