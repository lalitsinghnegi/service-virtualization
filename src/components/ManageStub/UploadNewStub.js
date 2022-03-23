import React, { useState, useEffect, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoDialog from "../common/custom/InfoDialog";
import classNames from "classnames";
import SimulationService from "../../services/simulation.service";
import ValidationDialog from "./ValidationDialog";
import Swal from "sweetalert2";
import { Button, Label, Input, Row, Col } from "reactstrap";

const UploadNewStub = ({
  open,
  setOpen,
  onConfirm,
  folderStructure_id,
  s3_path,
  team_name,
  application_code,
  team_code,
  program_name,
  valueChain_name,
}) => {

//Purpose : For uploading/ creating a stub from a file upload

  let fileReader;

  const [content, setContent] = useState("");

  const [finalFileName, setFinalFileName] = useState("");

  const [infoOpen, setInfoOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [validOpen, setValidOpen] = useState(false);
  const [validationList, setValidationList] = useState("");

  const handleFileRead = () => {
    setContent(fileReader.result);
  };

  const handleChange = (e) => {
    let file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const onChangeFileName = (e) => {
    setFinalFileName(e.target.value);
  };

  const handleSave = (e) => {
    let host = String(team_code);
    host = host + "-" + String(application_code);
    host = host + "-" + String(valueChain_name);
    host = host + "-" + String(program_name).slice(0,3)
    if (process.env.REACT_APP_STAGE !== "production") {
      host = host + "-dev";
    }
    host =  host + ".*"; 

    host = String(host).toLowerCase();

    let modifiedhost = {};
    modifiedhost.Svhost = [{ value: host, matcher: "glob" }];

    if (finalFileName !== "" && content !== "") {
      if (
        /^[\],:{}\s]*$/.test(
          content
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
      
        let input_value = {
          team: team_name,
          fileName: finalFileName,
          configData: content,
          folderStructure_id: folderStructure_id,
          s3_path: s3_path + "/" + team_name.replace(/ /, "_"),
          application_code: application_code,
          modifiedHost: modifiedhost,
        };
       
        SimulationService.createSimulation(input_value)
          .then((response) => {
            onConfirm(response);
          })
          .catch((error) => {
            //the json is not ok
           
            if (error.type === "validation") {
              Swal.fire({
                title: "Validations Failed !",
                text: "Failed to save the Virtual Service.",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Show Details",
              }).then((result) => {
                if (result.value) {
                  setValidOpen(true);
                  setValidationList(error.errorComp);
                }
              });
            }
          });
      } else {
        //the json is not ok
        Swal.fire({
          title: "Validations Failed !",
          text:
            "The file does not contain a valid JSON data, Please select a valid file.",
          icon: "warning",
          showCloseButton: true,
        });
      }
    }
  };
  return (
    <Fragment>
      <ValidationDialog
        validOpen={validOpen}
        setValidOpen={setValidOpen}
        validationList={validationList}
      ></ValidationDialog>
      <InfoDialog title="Information" open={infoOpen} setOpen={setInfoOpen}>
        {message}
      </InfoDialog>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">
          Upload New Virtual Service
        </DialogTitle>
        <DialogContent>
          <Row style={{ marginTop: "3%" }}>
            <Col xs="4">
              <Label>
                <b>Virtual Service</b>
              </Label>
            </Col>
            <Col xs="8">
              <Input
                size="sm"
                type="file"
                name="fileuploadstub"
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "5%" }}>
            <Col xs="4">
              <Label>
                <b>Name</b>
              </Label>
            </Col>
            <Col>
              <Input
                type="text"
                name="fileName"
                onChange={(e) => onChangeFileName(e)}
                size="sm"
                width="500px"
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            name="finish"
            onClick={handleSave}
            value="previewww"
            className={classNames(
              "btn",
              "btn-md",
              "btn-success",
              "ld-ext-right"
            )}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default UploadNewStub;
