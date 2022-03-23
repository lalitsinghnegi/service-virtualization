import React, {useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "reactstrap";
import "../../DashboardNew/DashboardNew.css";
import ApprovalCard from "../Request/ApprovalCard";
import PortalInsightsCard from "../PortalInsights/PortalInsightsCard";
import {getDashboardMetrics} from "../../../services/support.service";
import Swal from 'sweetalert2';
import DashboardStatCard from './Cards/DashboardStatCard';
import { faUsers, faTools} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FolderStructure from "../../FolderStructure/FolderStructure";

export const SupportDashboard = props => {
  
 //Purpose : This component display the latest activity on the dashboard of the support user
 // this is the container for other pods like utility and stats tiles
 
  const [portalAuthenticating, setPortalAuthenticating] = useState(false);
  const [dashboardMetrics, setDashboardMetrics] = useState(undefined);
  
  

  const getMetrics = async () => {
    let response = await getDashboardMetrics()
    if (response.data !== undefined) {
      console.log(response.data.data)
      setDashboardMetrics(response.data.data);
    }
  };

  useEffect(() => {
    if (portalAuthenticating) {
      Swal.fire({
        text: 'Authenticating user. Please wait...',
        showConfirmButton: false,
      })
    } else {
      Swal.close();
      getMetrics();
    }
  }, [portalAuthenticating])

 
  const generateGradient = (index) => {
    return index === 0 || index === 3 ? 'custom-gradient-2' : 'custom-gradient-3'
  }

  const renderDashboardStatCards = () => {
    let metricKeys = Object.keys(dashboardMetrics);

    return metricKeys.map((metric, index) => {
      return (
        <Col xs={3} key={index}>
          <DashboardStatCard gradient={generateGradient(index)} metrics={dashboardMetrics[metric]} />
        </Col>
      )
    })
  }

  return (
    <Container>
  
        <>
          <div className="white mt-3">
            <h3>
           Latest Activity <FontAwesomeIcon className="ml-2" icon={faUsers} size="1x" />
            </h3>
            <hr />
            <Row>
              {dashboardMetrics !== undefined && renderDashboardStatCards()}
              {dashboardMetrics === undefined &&
                <Col className="text-center"><Spinner className="p-5" color="primary" /></Col>
              }
            </Row>
          </div>

          <div className="white mt-3">
            <FolderStructure></FolderStructure>
          </div>

          <div className="white mt-3">
            <h3>
            SV Utilities<FontAwesomeIcon className="ml-2" icon={faTools} size="1x" />
            </h3>
            <hr />
            <Row>
            <Col xs={3}>
                <ApprovalCard />
              </Col>
              <Col xs={3}>
                <PortalInsightsCard />
              </Col>
              <Col xs={3}>
              
              </Col>
            </Row>
          </div>
        </>
    
    </Container>
  );
}

export default SupportDashboard;
