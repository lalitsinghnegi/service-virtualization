import './GradientIcon.css';

import React from 'react';

export const GradientIcon = (props) => {
    const { baseClass, childClass, iconClass, clip = true, fontSize } = props;
    return (
        <span className={`gradient-icon ${baseClass}`}>
            <div className={`${childClass} ${clip && 'clip'}`}>
                <i style={{ fontSize }} className={`${iconClass} position-static`} />
            </div>
        </span>)
}

export const TelstraGradientIcon = ({ color, gradient = "featured-gradient", iconClass, primary, clip, fontSize }) => {
    const finalBaseClass = color ? `base-${color.replace("base-", "")}` : undefined; // handle colors with telstra base- prefix
    const finalGradient = primary ? "theme-gradient-primary-secondary" : gradient;
    return <GradientIcon baseClass={finalBaseClass} childClass={finalGradient} iconClass={iconClass} clip={clip} fontSize={fontSize} />
}

export const FaIcon = (props) => {
    const { icon, size, color } = props;
    const finalIcon = icon.replace("fa-", ""); // handle icons with fontawesome fa- prefix
    const finalIconClass = `fa fa-${finalIcon} ${size && `fa-${size}`}`;

    // wrap font awesome icon with telstra gradient
    return <TelstraGradientIcon {...props} iconClass={finalIconClass} clip={color} />
}

export const TelstraIcon = (props) => {
    let { icon, size = "sm", fontSize = undefined } = props;

    if (size === "tile") { // Custom tile size that has the props of sm but smaller font
        size = "sm"
        fontSize = "3rem"
    }

    const finalIcon = icon.replace("icon-", ""); // handle icons with telstra icon- prefix
    const finalIconClass = `td-icon-${size} icon-${finalIcon}`;
    return <TelstraGradientIcon {...props} fontSize={fontSize} iconClass={finalIconClass} />
}

