import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const LinkTile = props => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    feedbackModal,
    alertModal,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <div
      data-role="tile"
      {...rest} // `children` is just another prop!
      onClick={event => {
        onClick && onClick(event);
        if (alertModal) {
          return alertModal(event);
        }
        history.push(to);
      }}
    />
  );
};

LinkTile.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default withRouter(LinkTile);
