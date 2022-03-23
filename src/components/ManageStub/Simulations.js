import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";

import MaterialTable from "material-table";
import sim from "../../services/simulation.service";
import ConfirmDialog from "../common/custom/ConfirmDialog";
import FaRepeat from "react-icons/lib/fa/repeat";
import Preview from "../Create/Preview";
import UploadNewStub from "./UploadNewStub";
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

import { Grid, Divider } from "@material-ui/core";
import simulationService from "../../services/simulation.service";
import { Tooltip } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";
const columns = [
  { title: "Name", field: "stub_name" },
  { title: "Status", field: "deployment_status" },
  {
    title: "EndPoints", field: "endPoints_count",
    headerStyle: {
      textAlign: "center",
    },
    render: rowData => <p style={{ width: 100, textAlign: "center" }}>{rowData.endPoints_count}</p>
  },
  { title: "Last Updated On", field: "updated_datetime", type: "datetime" },
  {
    title: "Created On",
    field: "created_datetime",
    type: "datetime",
    defaultSort: "desc",
  },
];

export default function Simulations(props) {

//purpose : Show the list of all simulations

  const { selected_entity_data } = useContext(GlobalContext);
  console.log("create page :: context", selected_entity_data);
  const { className, ...rest } = props;
  const [showDeployButton, setShowDeployButton] = useState(false);
  const [table, setTable] = useState(false);
  // state to display Banner
  const [displayBanner, setDisplayBanner] = useState(0);

  // checks if it is first render
  const [firstRender, setFirstRender] = useState("true");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadNewStubOpen, setUploadNewStubOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [selectedRow, setSelectedRow] = useState(0);
  const [preview, setPreview] = useState("");
  // set value which table to display, dployed or ready_for_deployment
  const [tableToDisplay, setTableToDisplay] = useState("deployed");
  const [data, setData] = useState([
    {
      stub_id: "",
      stub_name: "",
      endPoints_count: "",
      features: "",
      api: "",
      team: "",
      updated_datetime: "",
    },
  ]);
 
  const [team_name, setFinalTeamName] = useState(
    selected_entity_data.team_name ? selected_entity_data.team_name : props.location.state.team_name
  );
  const [folderStructure_id] = useState(
    props.location.state.folderStructure_id
  );

  const [loading, setLoading] = useState(false);

  const onChangeStubsToDisplay = async (e) => {
    setTableToDisplay(e.target.value);
  };

  // prepare the SVhost value here for mandatory header
  const getVSHost = () => {
    let host =  String(props.location.state.team_code)
    host = host +'-' + String(props.location.state.application_code)
    host = host +'-' + String(props.location.state.valueChain_name)
    host = host +'-' + String(props.location.state.program_name).slice(0,3)
    if(process.env.REACT_APP_STAGE !== "production")
    {
      host =  host + "-dev"; 
    }
    host =  host + ".sv.telstra-cave.com"; 
    return String(host).toLowerCase();  
    }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  const onEditClick = async (record) => {
 
    // On Edit we are reading the file data from s3 and then sending the epdata
    // to the Edit Simulation page.


    setLoading(true);
    await sim
      .getFileDataS3({ s3_path: record.s3_path })
      .then((response) => {
        setLoading(false);
        if (response.data.code === 200) {
          let responseData = response.data.data;
          props.history.push({
            pathname: "managestub/editstub",
            state: {
              record: record,
              epdata: responseData.epdata,
              application_code: props.location.state.application_code,
              team_code: props.location.state.team_code,
              program_name: props.location.state.program_name,
              valueChain_name: props.location.state.valueChain_name
            }
          });
        } else {

          Swal.fire("Error!", "Error in processing the file !", "error")
         
        }
      })
      .catch(error => {

        setLoading(false);
        Swal.fire(
          "Error !",
          "Could not fetch data due to internal error.",
          "error"
        );

      })
  };
  const getRefreshedData = async () => {

    // for getting the fresh data always
    await sim.getAll({ folderStructure_id: props.location.state.folderStructure_id })
      .then(response => {
        setLoading(false);
        if (response.data !== undefined) {
          setData(response.data);
        }
      })
    updateBanner()
  }
  const handleDelete = async (rowDataInput) => {
    let response = await sim.deleteOne({ id: rowDataInput.stub_id });
    if (response && response.status === 200) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your Virtual Service has been deleted.',
        'success'
      )
      getData();
      setTableData();
      setPreview("");
    }
  };

  const handleDeploy = async () => {

    // deploy button handler for deploy the selected services

    var isChecked = false;

    data.data.map(dataItem => {
      if (dataItem.checked == "1") {
        isChecked = true
        // listToDisplayInner[dataItem.stub_id] = dataItem.s3_path
      }
    })
    if (isChecked) {
      swalWithBootstrapButtons.fire({
        title: 'Deploy Virtual Services?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Deploy',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      })
        .then(async (result) => {
          if (result.value) {
            var params = {}
            var listToDisplayInner = {}
            params['folderStructure'] = props.location.state.folderStructure_id
            data.data.map(dataItem => {
              if (dataItem.checked == "1") {
                listToDisplayInner[dataItem.stub_id] = dataItem.s3_path
              }
            })
            params['listToDeploy'] = listToDisplayInner
            Swal.fire("Status", "Virtual Services Being Deployed", "OK")
            await simulationService.changeDeployStatuses(params).then(async () =>
              await simulationService.getS3PathsToDeploy({
                "team_id": props.location.state.team_id
              })).then(async (dataS3) => {
                await simulationService.copyTeamFolder({ "teamfiles_s3_path": dataS3.data.data })

              }
              )
              .then(
                simulationService.callLambda(

                  {


                      "team_code": props.location.state.team_code,
                      "team_id": props.location.state.team_id,
                      "application_code": props.location.state.application_code,
                      "application_id": props.location.state.application_id,
                    
                      "value_chain_name": props.location.state.valueChain_name,
                      "value_chain_id": props.location.state.valueChain_id,
                      "program_id": props.location.state.program_id,
                      "program_name": props.location.state.program_name,
                    


                  }
                )
              ).then(
                // change setApplication and checkApplication to valuechain later on
                await simulationService.setApplicationDeploymentStatus({ "application_code": props.location.state.valueChain_id }))

            getRefreshedData()


          }
        })
    }
    else {
      Swal.fire("Please select a Virtual Service to deploy")
    }

  };
  const handleCreate = () => {

    // The create button on top of simulation to navigate to crerate page
    // we are passing all the values needed in props location

    props.history.push({
      pathname: "createstub",
      state: {
        folderStructure_id: props.location.state.folderStructure_id,
        team_name: props.location.state.team_name,
        folderStructureS3: props.location.state.folderStructureS3,
        application_code: props.location.state.application_code,
        team_code: props.location.state.team_code,
        program_name: props.location.state.program_name,
        valueChain_name: props.location.state.valueChain_name,
        program_id: props.location.state.program_id,
        team_id: props.location.state.team_id,
        valueChain_id: props.location.state.valueChain_id,
        application_id: props.location.state.application_id
      },
    });
  };
  const showDeployed = async () => {
    let response;
    response = await sim.getObjectByVersion({ keyValue: selectedRow.s3_path, versionId: selectedRow.deployed_version });
    let responseData = response.data.data;

    if (response.data.code === 200) {
      let formated = JSON.stringify(responseData, undefined, 4);
      setPreview(formated);
    } else {
      setPreview("File not found.");
    }
  }
  const handleRowClick = async (selectedRow) => {
      
    // show preview on click of any row in grid   

    setSelectedRow(selectedRow);
    var response;
    response = await sim.getRawFileData({ s3_path: selectedRow.s3_path });

    let responseData = response.data.data;

    if (response.data.code === 200) {
      let formated = JSON.stringify(responseData, undefined, 4);
      setPreview(formated);
    } else {
      setPreview("File not found.");
    }
  };

  const handleNewStubUpload = (response) => {

    // For uploading the stub from a file

    if (response.data.code === 200) {
      Swal.fire("Success !", response.data.message, "success");
      getData();
      setTableData();
      setUploadNewStubOpen(false);
    } else {
      Swal.fire(
        "Error !",
        "Changes could not be saved due to internal error.",
        "error"
      );
    }
  };

  // all the action on the grid to peform the edit / delete etc 

  const actions = [
    {
      icon: "edit",
      tooltip: "Edit Virtual Service through the web form",
      position: "row",
      onClick: (event, rowData) => {
        onEditClick(rowData);
      },
    },
    {
      icon: "delete",
      tooltip: "Delete Virtual Service",
      position: "row",
      onClick: (event, rowData) => {
        setRowData(rowData);
        swalWithBootstrapButtons.fire({
          title: 'Delete Virtual Service !',
          text: "Are you sure you want to delete the service ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            handleDelete(rowData)

          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            //do nothing
          }
        })
      },
    },
  ];

  const handleSelectChange = async (rows) => {

    var newData = [];
    let show = await simulationService.checkApplicationDeploymentStatus({ "application_code": props.location.state.valueChain_id });
   
    setShowDeployButton(true);
    
    data.data.map((dataItem, index) => {

      if (dataItem.tableData.checked === undefined) {
      } else {
        console.log(dataItem.deployment_status);
        var checkedInt = dataItem.tableData.checked ? 1 : 0;
        if (data.data[index].checked === 1 && checkedInt == "0") {
          Swal.fire("Warning", "This service will not be deployed in next deployment if unselected", "Ok")
        }
        dataItem["checked"] = checkedInt;
      }
      newData.push(dataItem);

    });

    var formattedNewData = { data: newData, success: true };

    setData(formattedNewData);

  };

  const getData = async () => {

    // fetch all the stubs 

    setLoading(true);

    await sim.getAll({ folderStructure_id: props.location.state.folderStructure_id })
      .then(response => {
        setLoading(false);
        if (response.data !== undefined) {
          setData(response.data);
        }
      })
      .catch(error => {
        Swal.fire(
          "Error !",
          "Could not fetch data due to internal error.",
          "error"
        );
      })

  };

  const setTableData = async () => {
    setTable(true);
    if (firstRender == "true") {
      setFirstRender("false");
      let show = await simulationService.checkApplicationDeploymentStatus({ "application_code": props.location.state.valueChain_id });
      setDisplayBanner(show.data.deploymentInProgress)
    }

  };
  const updateBanner = async () => {
    let show = await simulationService.checkApplicationDeploymentStatus({ "application_code": props.location.state.valueChain_id });
    setDisplayBanner(show.data.deploymentInProgress)
  }


  // refresh the table data after some intervel of time
  // and update the banner as well.

  useEffect(() => {
    getData();

    setTableData();

    const interval = setInterval(() => {

      updateBanner()
    }, 20000);
    return () => clearInterval(interval);

  }
    , []);

  return (
    <Container>
      <>
        <div className="white mt-3">
          <UploadNewStub
            open={uploadNewStubOpen}
            setOpen={setUploadNewStubOpen}
            onConfirm={handleNewStubUpload}
            folderStructure_id={props.location.state.folderStructure_id}
            s3_path={props.location.state.folderStructureS3}
            team_name={props.location.state.team_name}
            application_code={props.location.state.application_code}
            team_code={props.location.state.team_code}
            program_name={props.location.state.program_name}
            valueChain_name={props.location.state.valueChain_name}
          ></UploadNewStub>

          <Row>
            <Col>
              <br></br>
              <Navbar expand="md">
                <Nav className="mr-auto" navbar></Nav>
                <Nav>
                  <NavItem>
                    <Button
                      onClick={handleCreate}
                      className={classNames(
                        "btn",
                        "btn-md",
                        "btn-success",
                        "ld-ext-right"
                      )}
                    >
                      Create New Virtual Service
                    </Button>
                  </NavItem>
                </Nav>
                <Nav>
                  <NavItem style={{ marginLeft: "5px" }}>
                    <Button
                      onClick={() => {
                        setUploadNewStubOpen(true);
                      }}
                      className={classNames(
                        "btn",
                        "btn-md",
                        "btn-success",
                        "ld-ext-right"
                      )}
                    >
                      Upload New Virtual Service
                    </Button>
                  </NavItem>
                </Nav>
              </Navbar>
            </Col>
          </Row>

          <h2>Manage Virtual Services</h2>
          <Divider />
          {console.log("Came here as well", displayBanner)}
          {console.log("Simulation props")}
          {/* <Button
                      // style={{ marginTop: "2vh" }}
                      onClick = {()=>getRefreshedData()}
                      className={classNames(
                        "btn",
                        "btn-md",
                        "btn-info",
                        "ld-ext-right"
                      )}
                    >Refresh
                    </Button> */}
          <Row>
            <Col xs="11">
              {(displayBanner == "1") ? (<p style={{ marginLeft: "3vh", marginTop: "2vh", color: "green" }}>Deployment is in progress, please wait for few minutes.</p>) :
                null}
            </Col>
            <Col xs="1">
              <div style={{ "cursor": "pointer", marginTop: "2vh" }} title="Refresh" onClick={() => getRefreshedData()}>
                <FaRepeat />
              </div>
            </Col>

          </Row>


          {loading === true ? (
            <Row className="mt-3">
              <Col className="text-center">
                <Spinner className="p-5" color="primary" />
              </Col>
            </Row>
          ) : (
              <Grid item md={12} xs={12}>
                <MaterialTable
                  style={{ boxShadow: "none", width: "100%", display: "block" }}
                  columns={columns}
                  data={data.data}
                  actions={actions}
                  title={"Virtual Service host : "+
                         getVSHost()}
                  onRowClick={(event, selectedRow) => {
                    handleRowClick(selectedRow);

                  }}
                  onSelectionChange={(selectedRow) =>
                    handleSelectChange(selectedRow)
                  }
                  options={{
                    selection: true,
                    // showSelectAllCheckbox:true,
                    selectionProps: (rowData) => ({
                      checked: rowData.checked,

                      //  color: 'primary'
                    }),

                    rowStyle: (rowData) => ({
                      color:
                        selectedRow &&
                          selectedRow.tableData.id === rowData.tableData.id
                          ? "#FBFEFB"
                          : "#000000",
                      backgroundColor:
                        selectedRow &&
                          selectedRow.tableData.id === rowData.tableData.id
                          ? "#36B732"
                          : "#FFF",
                    }),
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    actionsColumnIndex: -1,
                  }}
                />

                {/* {(tableToDisplay=="ready_for_deployment")?( */}
                <Navbar expand="md">
                  <Nav className="mr-auto" navbar></Nav>
                  <Nav>
                    <NavItem>

                      <Button
                        style={{ marginTop: "2vh" }}
                        onClick={handleDeploy}
                        // display banner 1 means deployment is in progress, 

                        disabled={((displayBanner == "1") ? true : false)

                        }
                        // disabled = {!showDeployButton}
                        className={classNames(
                          "btn",
                          "btn-md",
                          "btn-success",
                          "ld-ext-right"
                        )}
                      >
                        Deploy Selected
                    </Button>
                    </NavItem>
                  </Nav>
                </Navbar>
                {(preview == "") ? null :
                  <Navbar expand="md">
                    <Nav className="mr-auto" navbar></Nav>
                    <Nav>
                      <NavItem>
                        {console.log("Selected row iskahsdkjhasdkjhas ", selectedRow)}
                        {(selectedRow.deployed_version != null && selectedRow.deployment_status != "Deployed") ?
                          (<Button
                            style={{ marginTop: "2vh" }}
                            onClick={showDeployed}
                            className={classNames(
                              "btn",
                              "btn-md",
                              "btn-info",
                              "ld-ext-right"
                            )}
                          >
                            Show Deployed Version
                          </Button>) : null}
                      </NavItem>
                    </Nav>
                  </Navbar>}

              </Grid>
            )}

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
        </div>
      </>
    </Container>
  );
}
