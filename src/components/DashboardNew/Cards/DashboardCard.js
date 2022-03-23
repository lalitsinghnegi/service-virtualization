import React from "react";
import { SubHeader } from "../../common/custom/SubHeader";
import { CardPose } from "../../utils/pose";
import { withRouter } from "react-router";
import "./DashboardCard.css";

const clickableStyle = {
  cursor: "pointer"
};

const disabledStyle = {
  backgroundColor: "#8b9199",
  color: "#3e444f"
};

export const DashboardCard = ({
  title,
  subtitle,
  color,
  icon,
  children,
  history,
  to,
  onClick
}) => {
  const isClickable = to || onClick;
  const styles = isClickable ? clickableStyle : disabledStyle;

  const onCardClick = event => {
    console.log("to is", to);
    if (to !== null) {
      history.push(to);
    }
    if(onClick){
      onClick()
    }
  };

  if (to === null) {
    return (
      <div style={styles} className={`card dashboard`}>
        <span className={`base-${color}`}>
          <div className="card-top-ribbon featured-gradient"></div>
        </span>
        <div id="content">
          <SubHeader
            text={title}
            subComponent={<p className="small">{subtitle}</p>}
            iconClass={`td-icon-md icon-${icon}`}
            iconColor={color}
          ></SubHeader>
          {children}
        </div>
      </div>
    );
  }

  return (
    <CardPose style={styles} className={`card dashboard`} onClick={onCardClick}>
      <span className={`base-${color}`}>
        <div className="card-top-ribbon featured-gradient"></div>
      </span>
      <div id="content">
        <SubHeader
          text={title}
          subComponent={<p className="small">{subtitle}</p>}
          iconClass={`td-icon-md icon-${icon}`}
          iconColor={color}
        ></SubHeader>
        {children}
      </div>
    </CardPose>
  );
};

export default withRouter(DashboardCard);
