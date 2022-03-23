import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import classNames from "classnames";
import {
  Button,
  Row,
  Col
} from "reactstrap";
export default function  ValidationDialog({ title, validationList, validOpen, setValidOpen, ...rest }){
  // This is to display the validation error on upload a file
 return(<Dialog
      maxWidth={"800px"}
      open={validOpen}
      onClose={() => setValidOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog"></DialogTitle>
      <DialogContent>

      <div>
          {validationList}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
        width="200px"
         className={classNames(
          "btn",
          "btn-md",
          "btn-success",
          "ld-ext-right"
        )}
          variant="contained"
          onClick={() =>{
            setValidOpen(false);
          }}
          color="secondary"
        >
          Close
        </Button>
      
      </DialogActions>
    </Dialog>)
  
         }

