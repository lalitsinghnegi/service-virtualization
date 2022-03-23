//import { CSVLink } from "react-csv/lib";
import React from "react";
import { Spinner } from "reactstrap";
import { TelstraIcon } from "../icons/GradientIcons";
//import AbortButton from "../custom/AbortButton";

//commenting as may be unused
// const renderIcon = (iconColor, iconClass) => {
//     return (
//         <span className={`base-${iconColor}`}>
//             <i className={iconClass + " theme-text-primary mainIcon"} aria-hidden="true"></i>
//         </span>
//     )
// }

const spinnerColor = color => {
  switch (color) {
    case "blue":
      return "primary";
    case "orange":
      return "danger";
    default:
      return "secondary";
  }
};

export const SubHeader = ({
  text,
  h1,
  subComponent,
  iconClass,
  iconSize,
  featured,
  data,
  iconColor,
  filename,
  small,
  iconLeft,
  loading,
  loadingText,
  inProgress,
  abortBuildID
}) => (
  <span className="dataview-header">
    <span>
      <span>
        <div>
          {h1 ? (
            <h1>{text}</h1>
          ) : (
            <p
              className={`sub-${
                small ? "header" : "leader"
              } font-weight-light mb-0`}
            >
              {text}
            </p>
          )}

          {loading && <p className="lead">{loadingText}</p>}
          {subComponent}
        </div>
      </span>
      {(data || iconLeft) && (
        <TelstraIcon icon={iconClass + " mainIcon"} color={iconColor} primary />
      )}
    </span>
    {/* {inProgress === true && abortBuildID !== null && (
      <span style={{ position: "absolute", right: 0 }}>
        <AbortButton buildID={abortBuildID} />
      </span>
    )} */}
    <span>
      {!data &&
        !iconLeft &&
        (loading ? (
          <Spinner
            style={{ margin: "0.75rem", width: "3.5rem", height: "3.5rem" }}
            color={spinnerColor(iconColor)}
          />
        ) : (
          <TelstraIcon
            icon={iconClass + " mainIcon"}
            color={iconColor}
            primary={!featured}
            size={iconSize ? iconSize : "md"}
          />
        ))}
      {data && (
        <React.Fragment>
          <span className="base-purple">
            <a
              href={`data: text/json;charset=utf-8, ${encodeURIComponent(
                JSON.stringify(data)
              )}`}
              download={`${filename}.json`}
            >
              <i
                className={"fa fa-file-code-o fa-2x theme-text-primary"}
                aria-hidden="true"
              ></i>
            </a>
          </span>
          <span className="base-green">
         {/*   <CSVLink
              data={data}
              filename={filename ? `${filename}.csv` : "tdm-data.csv"}
              style={{
                textDecoration: "none!important"
              }}
            >
              <i
                className={"fa fa-file-excel-o fa-2x theme-text-primary"}
                aria-hidden="true"
              ></i>
            </CSVLink> */}
          </span>
        </React.Fragment>
      )}
    </span>
  </span>
);
