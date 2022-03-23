import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./HeaderNav.css";
import { flexStyles, flexStylesNoWidth } from "../../utils/ui.js";
import  HeaderNavIcon  from "./HeaderNavIcon";
import { TelstraIcon } from "../icons/GradientIcons";
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";

import logo from "../../../assets/images/coelogo.png";
import config from "../../../config";
const HeaderNav = (props) => {
 
  return (
    <div>
      <Navbar
        color=""
        className="nav-glass pt-0 pb-0"
        dark
        expand="md"
        style={{ justifyContent: "space-between" }}
      >
  
          <div
            className="nav-actions left"
            style={{ ...flexStyles, width: "unset" }}
          >
          <div style={{marginRight:"8px"}}>
            <img
              src={logo}
              width="40"
              height="40"
              className=" align-top"
              alt="COE Logo"
            />
              </div>
             <TelstraIcon
              color="magenta"
              gradient="theme-gradient-primary-secondary"
              icon="telstra"
            />
            {config && (
              <p
                className="text-white mt-3 pl-1 pr-1"
                style={{ fontSize: "1.2rem" }}
              >
                {config.title}
              </p>
            )}
               </div>
      </Navbar>
    </div>
  );
};

export default withRouter(HeaderNav);
