import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from '../../../context/GlobalState';
import { Container ,TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import {
  faStream,
  faUser,
  faUsers,
  faHeartbeat
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GeneralUserMetrics from "./GeneralUserMetrics";
import StubMetrics from "./StubMetrics";
import classnames from "classnames";

import PortalHealthMetrics from "./PortalHealthMetrics";

const PortalInsights = () => {
  
 //Purpose : This component display the portal insight
 // this is the container for other pods like general user meterics , stub meterics, healt etc
 
  const [activeTab, setActiveTab] = useState("1");
  const { isAdmin, setPortalInsightsData } = useContext(GlobalContext);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const determineInsightsView = (isAdmin) => {

      return (
        <>
    
          <Nav tabs className="mt-3">
            <NavItem hidden={false}>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
               <h5> General User Metrics <FontAwesomeIcon className="ml-2" icon={faUsers} size="1x" /></h5>
             
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
               <h5>Virtual Service Metrics
              <FontAwesomeIcon className="ml-2" icon={faStream} size="1x" />
              </h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggle("3");
                }}
              >
                Portal Health Metrics
              <FontAwesomeIcon className="ml-2" icon={faHeartbeat} size="1x" />
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
        
          <TabPane tabId="1">
             <GeneralUserMetrics />
            </TabPane> 
            <TabPane tabId="2">
              <StubMetrics />
            </TabPane> 
            <TabPane tabId="3">
              <PortalHealthMetrics />
            </TabPane>
          </TabContent>
         
        </>
      )
  }
  return (
    <Container>
      <div className="white mt-3">
        <h1>Portal Insights</h1>
        {isAdmin !== undefined && determineInsightsView(isAdmin)}
      </div>
      </Container>
  );
};

export default PortalInsights;

