import React from "react";
//import { UncontrolledTooltip } from "reactstrap";
import { TelstraIcon } from "../icons/GradientIcons";
import { flexStylesNoWidth } from "../../utils/ui";
import { withRouter } from "react-router-dom";

export default withRouter(props => {
  return (
    <div
      id="BackToolTip"
      onClick={() => props.history.goBack()}
      className={`base-nav-actions hoverMe`}
      style={{...flexStylesNoWidth}}
    >
      <span>
        <TelstraIcon
          color="magenta"
          gradient="theme-gradient-primary-secondary"
          icon="icon-ui-left-arrow-thick"
        />
      </span>
    </div>
  );
});