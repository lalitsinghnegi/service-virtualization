import React from "react";
import { flexStylesCenter } from  "../../utils/ui";
import { TelstraIcon } from "../icons/GradientIcons";

import config from "../../../config";

export const FormHeader = props => {
  const {
    title,
    subtitle,
    iconColor = config.color,
    icon = "telstra",
    gradient
  } = props;
  return (
    <div style={flexStylesCenter} className="mb-4">
      <TelstraIcon
        color={iconColor}
        icon={icon}
        size={"md"}
        gradient={gradient}
      />
      <div className="ml-2 text-left">
        {title && <h1 className="h3 font-weight-normal">{title}</h1>}
        {subtitle && <p className="text-muted mb-3 mt-0">{subtitle}</p>}
      </div>
    </div>
  );
};
