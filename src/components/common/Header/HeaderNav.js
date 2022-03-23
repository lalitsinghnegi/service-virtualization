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
import HeaderNavUser from "./HeaderNavUser";
import { isLoggedIn,logout } from "../../../services/authentication";
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";

import logo from "../../../assets/images/coelogo.png";
import config from "../../../config";
import BackButton from "./BackButton";
import FrontButton from "./FrontButton";
const HeaderNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const isAuthenticated = isLoggedIn();
  const signout = ()=>{
    logout()
  }
  const renderNavIcon = (to, icon, color, text, tooltip, primary) => {
    return (
        <HeaderNavIcon key={to} to={to} className={`base-${color}`} linkFlex={true} tooltip={tooltip}>
            <TelstraIcon color={color} icon={icon} />
            
            {text && <p className="text-white mt-0 pl-1 pr-1">{text}</p>}
        </HeaderNavIcon>
    )
}

const renderNavItems = () => {
    return renderNavIcon('/dashboard', 'icon-recharge', 'turquoise', '', 'Dashboard');
}
  return (
    <div>
      <Navbar
        color=""
        className="nav-glass pt-0 pb-0"
        dark
        expand="md"
        style={{ justifyContent: "space-between" }}
      >
   {isAuthenticated ? (
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
    {renderNavItems()}
     
            
               </div>
      
      ) : (
        " "
      )}
      <NavbarToggler onClick={toggle}/>
        <div className="nav-actions right" style={flexStylesNoWidth}>
          {isAuthenticated ? (
            <div className="nav-action-item" style={flexStylesNoWidth}>
              <BackButton></BackButton>
                        <FrontButton></FrontButton>
              <HeaderNavUser signout={signout} />
            </div>
          ):""}
        </div>
      </Navbar>
    </div>
  );
};

export default withRouter(HeaderNav);
