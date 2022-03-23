import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import {
  Button,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import { RadioGroup ,FormControlLabel,Radio} from "@material-ui/core";
const UploadDialog = ({ title, children, open, setOpen, onConfirm }) => {

  // IMP: please delete this , we are not using this functionality( to append the existing stub from a json)

  let fileReader;
  let content = "";
  const [option, setOption] = useState('append');
  const handleFileRead = () => {
    content = fileReader.result;
  };
  const handleChange = (e) => {
    let file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">Upload Virtual Service</DialogTitle>
      <DialogContent>
        <Row style={{ marginTop: "3%" }}>
          <Col> <Label>
              <b>Virtual Service</b>
            </Label> </Col>
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
        <Col> <Label>
              <b>Options</b>
            </Label></Col>
          <Col xs="8">
            <RadioGroup
              aria-label="option"
              name="option"
              value={option}
              onChange={(e) => {
                setOption(e.target.value);
              }}
            >
              <FormControlLabel
                value="append"
                control={<Radio />}
                label="Append to existing Virtual Service"
              />
               <FormControlLabel
                value="replace"
                control={<Radio />}
                label="Replace existing Virtual Service"
              />
            </RadioGroup>
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
          onClick={() => {
            if(content !== ""){
            setOpen(false);
            onConfirm(content, option);
            }
          }}
          className={classNames("btn", "btn-md", "btn-success", "ld-ext-right")}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UploadDialog;
