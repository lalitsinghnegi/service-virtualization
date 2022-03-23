import React from 'react';
import {Button} from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import classNames from "classnames";
import "../../Create/create.css";
const InfoDialog = ({ title, children, open, setOpen}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          className={classNames(
            "btn",
            "btn-md",
            "btn-success",
            "ld-ext-right"
          )}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default InfoDialog;