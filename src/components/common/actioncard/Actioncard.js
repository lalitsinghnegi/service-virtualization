import React from "react";
import { CardPose } from "../../utils/pose";
import { withRouter } from "react-router";
import { TelstraIcon } from "../icons/GradientIcons";
import { Row, Col } from "reactstrap";

import "./Actioncard.css";

const clickableStyle = {
  cursor: "pointer",
};

export const actioncard = ({
  title,
  subtitle,
  color,
  icon,
  children,
  history,
  to,
  onClick,
  featured,
  iconSize,
}) => {
  const styles = clickableStyle;

  const onCardClick = (event) => {
    console.log("to is", to);
    if (to !== null) {
      history.push(to);
    }
  };

  return (
    <CardPose style={styles} className={`card dashboard`} onClick={onCardClick}>
      <span className={`base-${color}`}>
        <div className="card-top-ribbon featured-gradient"></div>
      </span>
      <Row>
        <Col xs="12">
          <h5 style={{ textAlign: "center" }}>{title}</h5>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
          <div id="content">
            <TelstraIcon
              icon={`td-icon-sm icon-${icon}` + " mainIcon"}
              color={color}
              primary={!featured}
              size={iconSize ? iconSize : "sm"}
            />{" "}
          </div>
        </Col>
        <Col xs="7">
          <p>{subtitle}</p>
        </Col>
      </Row>
    </CardPose>
  );
};

export default withRouter(actioncard);
