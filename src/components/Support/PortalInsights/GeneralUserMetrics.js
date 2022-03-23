import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
  Card,
  CardTitle,
  CardText,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import { API_GET_METRICS } from "../../../services/endpoints";
import { getToken } from "../../../services/authentication";
import { getProgramList } from "../../../services/user.service";
import moment from "moment";
import Select from "react-select";
import { GlobalContext } from "../../../context/GlobalState";
import MaterialTable from "material-table";
import StreamMetricsDetails from "./StreamMetricsDetails";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Plot = createPlotlyComponent(Plotly);

const GeneralUserMetrics = (props) => {
  const [userMetrics, setUserMetrics] = useState();
  const [streamMetrics, setStreamMetrics] = useState();
  //const [appMetrics, setAppMetrics] = useState();
  const [programList, setProgramList] = useState([]);
  const [streamProgram, setStreamProgram] = useState({});
  const [appProgram, setAppProgram] = useState({});
  const { portal_insights_data } = useContext(GlobalContext);
  const { isAdmin, setPortalInsightsData } = useContext(GlobalContext);
  const getAdminMetrics = async () => {
    Axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
    let response;
    let filters = {};
    if (
      portal_insights_data.start_date_filter !== undefined &&
      portal_insights_data.end_date_filter !== undefined
    ) {
      filters = {
        startDateFilter: moment(portal_insights_data.start_date_filter).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        endDateFilter: moment(portal_insights_data.end_date_filter).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
      };
    }

    try {
      response = await Axios.post(API_GET_METRICS, filters);
      setUserMetrics(response.data);
    } catch (error) {
      response = error.response;
    }
  };

  const fetchStreamAppMetrics = async (program_id, type) => {
    Axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
    let response;
    let filters = {
      program_id: program_id,
      type: type,
    };

    try {
      response = await Axios.post(API_GET_METRICS, filters);
      if (type === "streamWise") setStreamMetrics(response.data);
    } catch (error) {
      response = error.response;
    }
  };

  const getPrograms = () => {
    getProgramList().then((response) => {
      if (response) {
        let allPrograms = response.data.data;
        let selectOptions = [];

        for (let i = 0; i < allPrograms.length; i++) {
          let program = allPrograms[i];
          selectOptions.push({ value: program.value, label: program.display });
        }
        setProgramList(selectOptions);
        // setStreamProgram({ value: selectOptions[0].value, label: selectOptions[0].label })
        //fetchStreamAppMetrics(selectOptions[0].value, "streamWise");
      }
    });
  };

  // fetch user metrics hook
  useEffect(() => {
    getAdminMetrics();
    getPrograms();
    // eslint-disable-next-line
  }, [
    portal_insights_data.start_date_filter,
    portal_insights_data.end_date_filter,
  ]);

  const returnUsersRegisteredCount = () => {
    let values = [];

    userMetrics.userCountsByRegisteredDates.forEach((countObject) => {
      values.push(countObject.num_users_registered);
    });

    return values;
  };

  const returnUserRegisteredDates = () => {
    let labels = [];

    userMetrics.userCountsByRegisteredDates.forEach((countObject) => {
      labels.push(countObject.registration_date);
    });

    return labels;
  };

  const returnActiveAndNonActiveUsers = () => {
    let values = [];

    values.push(userMetrics.countOfActiveSessionUsers);
    values.push(
      userMetrics.countOfAllUsers - userMetrics.countOfActiveSessionUsers
    );

    return values;
  };

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const [selectedDropdownItem, setSelectedDropdownItem] = useState("All Time");

  const setTimeRange = () => {
    setPortalInsightsData({
      start_date_filter: selectedStartDate,
      end_date_filter: selectedEndDate,
    });
    if (snackBarOpen === false) {
      openSnackBar();
    }
  };

  // Handle the drop down item the user selected.
  const handleDropdownItemClick = (selected) => {
    let tempDate = new Date();
    let startDateFilter;
    let endDateFilter;

    let caseMatched = true;
    let notCustom = true;
    switch (selected) {
      case "All Time":
        setSelectedDropdownItem("All Time");
        startDateFilter = undefined;
        endDateFilter = undefined;
        break;

      case "Last Week":
        setSelectedDropdownItem("Last Week");
        startDateFilter = new Date(tempDate.setDate(tempDate.getDate() - 7));
        endDateFilter = new Date(tempDate.setDate(tempDate.getDate() + 7)); // prevents edge case scenarios (passing into the next day from 23:59)
        break;

      case "Last Month":
        setSelectedDropdownItem("Last Month");
        startDateFilter = tempDate.setMonth(tempDate.getMonth() - 1);
        endDateFilter = tempDate.setMonth(tempDate.getMonth() + 1);
        break;

      case "Custom Time Range":
        setSelectedDropdownItem("Custom Time Range");
        notCustom = false;
        break;
      default:
        caseMatched = false;
    }

    // Only if a drop down selection is made do we apply the time filter by setting it into global state:
    if (caseMatched) {
      setPortalInsightsData({
        start_date_filter: startDateFilter,
        end_date_filter: endDateFilter,
      });
      if (notCustom === true) {
        if (snackBarOpen === false) {
          openSnackBar();
        }
      }
    }
  };

  // We want to override the style for the date picker so that it is smaller.
  const customTheme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        input: {
          padding: "9.25px 12px",
          width: "100px",
        },
      },
    },
  });

  // Time filter JSX to be displayed at the top of Portal Insights
  const timeFilterJSX = (
    <Row>
      <Col xs="2"></Col>
      <Col xs="10">
        {selectedDropdownItem === "Custom Time Range" && (
          <div className="float-right ml-2">
            <ThemeProvider theme={customTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Start Date"
                  format="dd/MM/yyyy"
                  value={selectedStartDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => handleStartDate(date)}
                  disableFuture={true}
                  maxDate={selectedEndDate}
                  id="customDateFilterStart"
                />

                <KeyboardDatePicker
                  className="ml-2"
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="End Date"
                  format="dd/MM/yyyy"
                  value={selectedEndDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => handleEndDate(date)}
                  disableFuture={true}
                  minDate={selectedStartDate}
                  id="customDateFilterEnd"
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            <Button
              className="ml-2"
              disabled={selectedStartDate > selectedEndDate}
              onClick={setTimeRange}
            >
              Apply
            </Button>
          </div>
        )}

        <div className="float-right">
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
            <DropdownToggle caret>{selectedDropdownItem}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Filter By Time Range</DropdownItem>
              <DropdownItem onClick={() => handleDropdownItemClick("All Time")}>
                All Time
              </DropdownItem>
              <DropdownItem
                onClick={() => handleDropdownItemClick("Last Week")}
              >
                Last Week
              </DropdownItem>
              <DropdownItem
                onClick={() => handleDropdownItemClick("Last Month")}
              >
                Last Month
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => handleDropdownItemClick("Custom Time Range")}
              >
                Custom Time Range
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );

  const handleStartDate = (startDate) => {
    setSelectedStartDate(startDate);
  };

  const handleEndDate = (endDate) => {
    setSelectedEndDate(endDate);
  };

  // snackbar code
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  // when time filter applied
  const openSnackBar = () => {
    setSnackBarOpen(true);
  };

  // when snackbar click away
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  // The time range text to display when the time filter is applied.
  const displayTimeRangeFilteredText = (includeLineBreak) => {
    let displayText = "";

    if (includeLineBreak) {
      displayText = displayText + "<br>";
    }

    if (
      portal_insights_data.start_date_filter !== undefined &&
      portal_insights_data.end_date_filter !== undefined
    ) {
      displayText =
        displayText +
        `(${moment(portal_insights_data.start_date_filter).format(
          "DD-MM-YYYY HH:mm"
        )}) to (${moment(portal_insights_data.end_date_filter).format(
          "DD-MM-YYYY HH:mm"
        )})`;
    }
    return displayText;
  };

  useEffect(() => {
    setPortalInsightsData({
      start_date_filter: undefined,
      end_date_filter: undefined,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {userMetrics === undefined && (
        <>
          <Row className="mt-3">
            <Col className="text-center">
              <Spinner className="p-5" color="primary" />
            </Col>
          </Row>
        </>
      )}
      {userMetrics !== undefined && (
        <>
          <Row className="mt-2">
            <Col sm="4">
              <Card body>
                <CardTitle style={{ height: "30px" }}>
                  <h6><b>Number Of Registered Users</b></h6>
                </CardTitle>
                <CardText tag="div" style={{ height: "95px" }}>
               <div className={"circle"}>
                 {userMetrics.numberOfRegisteredUsers}</div>
                </CardText>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
                <CardTitle tag="div"  style={{ height: "30px" }}>
                  <h6><b>Number Of Active Sessions</b></h6>
                </CardTitle>
                <CardText  className="text-center" tag="div" style={{ height: "95px" }}>
                 <div className={"circle"}>
                 {userMetrics.numberOfActiveSessions}</div>
                </CardText>
              </Card>
            </Col>
            <Col sm="4">
              <Card body>
              <CardTitle>
                <h6><b>{"% Of Active & Inactive Users"}</b></h6>
                </CardTitle>
                <CardText
                  className="text-center"
                  tag="div"
                  style={{ height: "97px" }}
                >
                  <Plot
                    style={{ width: "100%", height: "100px" }}
                    useResizeHandler
                    data={[
                      {
                        values: returnActiveAndNonActiveUsers(),
                        labels: ["Active", "Inactive"],
                        type: "pie",
                        hole: 0,
                      },
                    ]}
                    layout={{
                      autosize: true,
                      margin: {
                        l: 50,
                        r: 10,
                        t: 10,
                        b: 5,
                      }
                    }
                  }
                    config={{ displaylogo: false, displayModeBar: false }}
                  />
                </CardText>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm="12">
              <Card body>
                <CardTitle>
                <h6><b>{"Number Of Users by Registration Date"}</b><br></br><br></br>
                          {displayTimeRangeFilteredText(false, true)}
                          {timeFilterJSX}
                          </h6>
                </CardTitle>
                <CardText className="text-center" tag="div">
              
                  <Plot
                    style={{ width: "100%", height: "240px" }}
                    useResizeHandler
                    data={[
                      {
                        y: returnUsersRegisteredCount(),
                        x: returnUserRegisteredDates(),
                      },
                    ]}
                    layout={{
                      autosize: true,
                      margin: {
                        l: 50,
                        r: 10,
                        t: 10,
                        b: 30,
                      },
                      title: {
                        font: {
                          size: 15,
                        },
                        text:""
                         // "Number of Users by Registration Date" +
                         // displayTimeRangeFilteredText(true, true),
                      },
                      yaxis: {
                        dtick: 1,
                        rangemode: "tozero",
                      },
                    }}
                    config={{ displaylogo: false, displayModeBar: false }}
                  />
                </CardText>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Row className="mt-2">
        <Col xs="12">
          <Card body>
            <CardText tag="div">
              <Row>
                <Col>
                  <h6><b>Program Statistics - User Metrics</b></h6>
                </Col>
              </Row>
              <Row>
                <Col xs="8" style={{ paddingTop: "10px", paddingRight: "0px" }}>
                  <div className={"float-right"}>
                    {" "}
                    <h6>Select Program</h6>
                  </div>
                </Col>

                <Col xs="4">
                  <Select
                    name="programName"
                    placeholder="Select..."
                    onChange={(selected) => {
                      console.log(selected);
                      setStreamProgram(selected);
                      fetchStreamAppMetrics(selected.value, "streamWise");
                    }}
                    options={programList}
                  />
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs="12">
                  {streamMetrics !== undefined && (
                    <MaterialTable
                      style={{ boxShadow: "none" }}
                      columns={[
                        { title: "Stream", field: "valueChain_name" },
                        { title: "Users", field: "count" },
                        { title: "Program", field: "program_name" },
                      ]}
                      data={streamMetrics.streams}
                      onRowClick={(event, selectedRow, togglePanel) => {
                        togglePanel();
                      }}
                      detailPanel={(selectedRow) => {
                        return (
                          <StreamMetricsDetails
                            selectedRow={selectedRow}
                          ></StreamMetricsDetails>
                        );
                      }}
                      title=""
                      options={{
                        search: false,
                        headerStyle: {
                          fontWeight: "bold",
                        },
                        actionsColumnIndex: -1,
                      }}
                    />
                  )}
                </Col>
              </Row>
            </CardText>
          </Card>
        </Col>
      </Row>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          Time filter has been applied successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default GeneralUserMetrics;
