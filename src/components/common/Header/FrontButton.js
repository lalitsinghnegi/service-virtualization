import React from "react";
import { TelstraIcon } from "../icons/GradientIcons";
import { flexStylesNoWidth } from "../../utils/ui";
import { withRouter } from "react-router-dom";

export default withRouter(props => {
  return (
    <div
      id="FrontToolTip"
      onClick={() => props.history.goForward()}
      className={`base-nav-actions hoverMe`}
      style={{ ...flexStylesNoWidth }}
    >
      <span>
        <TelstraIcon
          color="green"
          gradient="theme-gradient-primary-secondary"
          icon="icon-ui-right-arrow-thick"
        />
      </span>
    </div>
  );
});