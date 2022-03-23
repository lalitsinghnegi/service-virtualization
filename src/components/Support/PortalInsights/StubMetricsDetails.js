import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getToken } from "../../../services/authentication";
import { Row, Col, Container, Table } from "reactstrap";
import { GET_STUB_DTL_METRICS } from "../../../services/endpoints";
export default function StubMetricsDetails(props) {

    
 //Purpose : This is the child of Stub meterics and show the drill down details of stub stats
 

  const { selectedRow, ...rest } = props;

  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      console.log("selectedRow::", selectedRow);
      Axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

      let filters = {
        program_id: selectedRow.program_id,
        valueChain_id: selectedRow.valueChain_id,
        application_id: selectedRow.application_id,
      };

      Axios.post(GET_STUB_DTL_METRICS, filters).then((response) => {
        setDetailsData(response.data.counts);
      });
    };
    handleGetData();
  }, [selectedRow]);

  return (
    <Container >
                        <Row className="mt-3 mb-3 mr-3 ml-3">
                          <Col xs="12">
                              <Table bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>Team</th>
                                    <th>Deployed</th>
                                    <th>Deployed(Modified)</th>
                                    <th>Ready to deploy</th>
                                    <th>Failed</th>
                                  </tr>
                                </thead>
                                <tbody>
          {detailsData.map((item) => {
            return (
              <tr key={item.team_name}>
                <td>{item.team_name}</td>
                <td>{item.deployed}</td>
                <td>{item.deployedModified}</td>
                <td>{item.readyForDeployment}</td>
                <td>{item.failed}</td>
              </tr>
            );
          })}
          </tbody>
          </Table>
      </Col>
    </Row>
  </Container>
  );
}
