import './SolidIcon.css';

import React from 'react';

export const SolidIcon = (props) => {
    const { baseClass, themeClass, iconClass, clip = true } = props;
    return (
        <span className={`solid-icon ${baseClass}`}>
            <div className={`${themeClass} ${clip && 'clip'}`}><i className={`${iconClass} position-static`}></i></div>
        </span>)
}

export const TelstraSolidIcon = ({ color, themeNum = 0, iconClass, clip }) => {
    const finalBaseClass = color ? `base-${color.replace("base-", "")}` : undefined; // handle colors with telstra base- prefix
    const themeClass = `tcom-theme-bg-${themeNum}`;
    return <SolidIcon baseClass={finalBaseClass} themeClass={themeClass} iconClass={iconClass} clip={clip} />
}

// export const FaIcon = (props) => {
//     const { icon, size, color } = props;
//     const finalIcon = icon.replace("fa-", ""); // handle icons with fontawesome fa- prefix
//     const finalIconClass = `fa fa-${finalIcon} ${size && `fa-${size}`}`;

//     // wrap font awesome icon with telstra gradient
//     return <TelstraSolidIcon {...props} iconClass={finalIconClass} clip={color} />
// }

export const TelstraIcon = (props) => {
    const { icon, size = "sm" } = props;
    const finalIcon = icon.replace("icon-", ""); // handle icons with telstra icon- prefix
    const finalIconClass = `td-icon-${size} icon-${finalIcon}`;
    return <TelstraSolidIcon {...props} iconClass={finalIconClass} />
}