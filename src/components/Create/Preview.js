import React, { useState, useEffect } from "react";
import classNames from "classnames";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Typography,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import { Button, FormGroup, Input, Nav, Navbar, NavItem } from "reactstrap";
import { Container } from "react-bootstrap";
import "./create.css";
export default function Preview(props){

    
 //Purpose : For showing the preview of the generated simulation file
 

  const { className,buttonName,preview, ...rest } = props;

 const  states = {
    rows: props.rows || 50
  }
 
 const download = () => {
   
    const filename = "simulations.json";
    const text = preview;
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(0),
    },
  }));
  const classes = useStyles();

    return (
      <div className={classes.root}>
      <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader subheader="Please verify the Virtual Service in the preview before you save it or else you can  download it from download button." title="Preview" />
            <Divider />

            <CardContent>
          <FormGroup>
            <Navbar expand="md">
              <Nav className="mr-auto" navbar>
             
              </Nav>
              <Nav>
                {(buttonName=="finish")?
                (<NavItem>
                  <Button
                    className="btn btn-secondary"
                    type="button"
                    color="info"
                    onClick={download}
                  >
                    Download
                  </Button>
                </NavItem>):<></>
  }
              </Nav>
            </Navbar>
            <Input style={{fontSize: 13}}
              type="textarea"
              value={preview}
              rows={states.rows}
              width="500"
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </FormGroup>
          </CardContent>
          </Card>
      </div>
    );
}
