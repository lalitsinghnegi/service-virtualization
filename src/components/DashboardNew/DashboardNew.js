import "./DashboardNew.css";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import RequestAccessCard from "./Cards/RequestAccessCard";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderStructure from "../FolderStructure/FolderStructure";
import {getToken,getUserRolesFromToken,getProfileDataFromToken} from '../../services/authentication';

export const DashboardNew = (props) => {
    
 //Purpose : This is the dashboad of normal user from here user can see all valuechains
 

  let token = getToken();
  getUserRolesFromToken(token);
  getProfileDataFromToken(token);

  return (
    <Container>
      <>
        <div className="white mt-3">
          <FolderStructure></FolderStructure>
        </div>
{/* 
        <div className="white mt-3">
          <h3>
            SV Utilities
            <FontAwesomeIcon className="ml-2" icon={faTools} size="1x" />
          </h3>
          <hr />
         <Row>
            <Col xs={3}>
              <RequestAccessCard />
            </Col>
          </Row>
        
        </div>
         */}
      </>
    </Container>
  );
};

export default DashboardNew;
