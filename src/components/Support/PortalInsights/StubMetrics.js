import MaterialTable from "material-table";
import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Spinner,
  Card,
  CardTitle,
  CardText,
  Container,
  Table,
} from "reactstrap";
import Axios from "axios";
import { GET_STUB_METRICS_APP } from "../../../services/endpoints";
import { getToken } from "../../../services/authentication";
import moment from "moment";
import { GlobalContext } from "../../../context/GlobalState";
import Select from "react-select";
import { getProgramList } from "../../../services/user.service";
import StubMetricsDetails from "./StubMetricsDetails";
const StubMetrics = () => {

    
 //Purpose : This component is for showing stub meterics inside portal insight component
 

  const [stubMetrics, setStubMetrics] = useState();
  const [programList, setProgramList] = useState([]);
  const [program, setProgram] = useState("");
  const { portal_insights_data } = useContext(GlobalContext);

  const fetchStubMetrics = async (program_id) => {
    Axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };
    let response;
    let filters = { program_id: program_id };
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
        program_id: program_id,
      };
    }

    try {
      response = await Axios.post(GET_STUB_METRICS_APP, filters);
    } catch (error) {
      response = error.response;
    }
    setStubMetrics(response.data);
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
        setProgram({ value: selectOptions[0].value, label: selectOptions[0].label })
        fetchStubMetrics(selectOptions[0].value);
      }
    });
  };

  // fetch user metrics hook
  useEffect(() => {
    getPrograms();
     // eslint-disable-next-line
  }, [
    portal_insights_data.start_date_filter,
    portal_insights_data.end_date_filter,
  ]);

  return (
    <>
      <Row className="mt-4">
        <Col>
          <Card body>
            <CardText tag="div">
            <Row>
                <Col>
                <h5>Virtual Service Metrics For Applications</h5></Col>
              </Row>
              <Row>
              <Col xs="8" style={{paddingTop:"10px",paddingRight:"0px"}}>
               <div className={"float-right"}> <h6>Select Program</h6></div>
                </Col>
               
               
                <Col xs="4">
               
               
                <div >
                    <Select
                    value={program}
                    name="programName"
                  
                    onChange={(selected) => {
                      setProgram(selected)
                      fetchStubMetrics(selected.value);
                    }}
                    options={programList}
                  />
                </div>
                </Col>
              </Row>
            </CardText>
          </Card>
        </Col>
      </Row>
      {program !== "" && stubMetrics === undefined && (
        <>
          <Row className="mt-3">
            <Col className="text-center">
              <Spinner className="p-5" color="primary" />
            </Col>
          </Row>
        </>
      )}
      {stubMetrics !== undefined && program !== "" && (
        <>
          <Row style={{ marginTop: "10px" }} className="mt-2">
            <Col sm="12">
              <Card>
                <MaterialTable
                  style={{ boxShadow: "none" }}
                  columns={[
                    { title: "Application Name", field: "application_name" },
                    { title: "Total Virtual Services", field: "stub_count" },
                    { title: "Stream Name", field: "valueChain_name"},
                    { title: "Program", field: "program_name"},
                  ]}
                  data={stubMetrics.applications}
                  onRowClick={(event, selectedRow, togglePanel) => {
                    togglePanel();
                  }}
                  detailPanel={(selectedRow) => {
                    return (
                      <StubMetricsDetails
                        selectedRow={selectedRow}
                      ></StubMetricsDetails>
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
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default StubMetrics;
