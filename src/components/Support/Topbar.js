import React, { useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import config from "../../config";
import logo from "../../assets/images/coelogo.png";
import HeaderNavUser from "../common/Header/HeaderNavUser";
import { NavbarToggler } from "reactstrap";
import { flexStyles, flexStylesNoWidth } from "../../components/utils/ui";
import { TelstraIcon } from "../common/icons/GradientIcons";
import BackButton from "../../components/common/Header/BackButton";
import FrontButton from "../../components/common/Header/FrontButton";
import HeaderNavIcon from "../../components/common/Header/HeaderNavIcon";

export const Topbar = (props) => {
  const { className, onSidebarOpen, signout, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const renderNavIcon = (to, icon, color, text, tooltip, primary) => {
    return (
      <HeaderNavIcon
        key={to}
        to={to}
        className={`base-${color}`}
        linkFlex={true}
        tooltip={tooltip}
      >
        <TelstraIcon color={color} icon={icon} />
        {text && <p className="text-white mt-0 pl-1 pr-1">{text}</p>}
      </HeaderNavIcon>
    );
  };

  const renderNavItems = () => {
    return renderNavIcon(
      "/support/dashboard",
      "icon-recharge",
      "turquoise",
      "",
      "Dashboard"
    );
  };
  return (
    <AppBar>
      <Toolbar
        className="App-header nav-glass pt-0 pb-0"
        expand="md"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          <div
            className="nav-actions left"
            style={{ ...flexStyles, width: "unset" }}
          >
            <div style={{ marginRight: "8px" }}>
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
        </div>
        <NavbarToggler onClick={toggle} />
        <div className="nav-actions right" style={flexStylesNoWidth}>
          <div className="nav-action-item" style={flexStylesNoWidth}>
            <BackButton></BackButton>
            <FrontButton></FrontButton>
            <HeaderNavUser />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
