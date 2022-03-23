import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Breadcrumb(props) {

  // IMP: Delete this file , we are not using this .
  
  const { program, valueChain, application, handleClick, ...rest } = props;
  return (
    <Breadcrumbs 
    separator={<NavigateNextIcon fontSize="small" />} 
    aria-label="breadcrumb" 
    style={{ padding: "20px" }}>
      <Link color="black">{program.Name}</Link>

      {valueChain.Name ? (
        <Link color="blue" href={"/dashboard"}>
          {valueChain.Name}
        </Link>
      ) : (
        ""
      )}

      {application.Name ? (
        <Typography color="black">{application.Name}</Typography>
      ) : (
        ""
      )}
    </Breadcrumbs>
  );
}
