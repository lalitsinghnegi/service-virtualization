import React from "react";
//import { Link } from "react-router-dom";
import { Link,Route, Redirect } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { flexStylesNoWidth } from "../../utils/ui";
import { withRouter } from "react-router-dom";
export const HeaderNavIcon = props => {
  const { children, to, className, linkFlex, tooltip, history } = props;
 
  console.log("redirect to - ",to)
  return (
    <div
      href={to}
      className={`navbaricon ${className}`}
      style={{ ...flexStylesNoWidth }}
      data-tip={tooltip}
      data-for={tooltip}
      data-tip-disable={false}
    >
      {to ? (
        <Link to={to} style={linkFlex ? flexStylesNoWidth : {}}>
          {children}
        </Link>
      
      ) : (
        children
      )}
      <ReactTooltip
        type="dark"
        effect="solid"
        place="bottom"
        id={tooltip}
        delayShow={500}
      />
    </div>
  );
};

export default HeaderNavIcon;