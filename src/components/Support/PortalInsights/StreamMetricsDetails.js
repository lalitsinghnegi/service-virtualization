import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getToken } from "../../../services/authentication";
import { Row, Col, Container, Table } from "reactstrap";
import { API_GET_METRICS } from "../../../services/endpoints";
export default function StreamMetricsDetails(props) {

    
 //Purpose : This is the child of stream mererics , drill down details per stream/ users count
 

  const { selectedRow, ...rest } = props;

  const [detailsData, setDetailsData] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      console.log("selectedRow::", selectedRow);
      Axios.defaults.headers.common = { Authorization: `Bearer ${getToken()}` };

      let filters = {
        type: "appWise",
        program_id: selectedRow.program_id,
        valueChain_id: selectedRow.valueChain_id
      };

      Axios.post(API_GET_METRICS, filters).then((response) => {
        setDetailsData(response.data.applications);
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
                                    <th>Application</th>
                                    <th>Users</th>
                                  </tr>
                                </thead>
                                <tbody>
          {detailsData.map((item) => {
            return (
              <tr key={item.application_name}>
                <td>{item.application_name}</td>
                <td>{item.count}</td>
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
