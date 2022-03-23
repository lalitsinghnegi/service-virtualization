import React, { useState } from "react";
import classNames from "classnames";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";
import { FormHeader } from "../common/custom/FormHeader";

import { changepass } from "../../services/user.service";
import { isLoggedIn, getUserDetails } from "../../services/authentication";
import Swal from "sweetalert2";
import "../SignIn/Signin.css";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Divider,
  TextField,
} from "@material-ui/core";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardTitle,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";

const ChangePassword = (props) => {
  const { className, ...rest } = props;

  let storeduser = getUserDetails();
  const initialUserData = {
    id: storeduser.id,
    useremail: storeduser.email,
    password: null,
  };

  const [user, setUser] = useState(initialUserData);
  const isAuthenticated = isLoggedIn();

  const submit = async (e) => {
    e.preventDefault();
    let response = await changepass(user);
    if (response.success) {
      Swal.fire("Congratulation !", response.message, "success");
    } else {
      Swal.fire("Error", response.message, "error");
    }
  };


  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  return (
    <Container>
  
    <>
    <div className="white mt-3">
    

        <h3>Change Password</h3> 
        <Divider />
        <br></br>
        <Card>
                <CardContent>
         


        <Form onSubmit={submit} className="form-signin text-center white">
         
        <Grid item md={12} xs={12}>
            <Label for="Password">New Password</Label>
            <TextField
                      fullWidth
                      type="password"
                      helperText="Enter new password"
                      label="Password"
                      margin="dense"
                      name="Password"
                      onInput={(e) => setUser({ ...user, password: e.target.value })}
                      required
                      value={user.password}
                      variant="outlined"
            />
         </Grid>
      
          <Divider />
                <CardActions>
                  <Button 
                   className={classNames(
                    'btn',
                    'btn-sm',
                    'btn-success',
                    'btn-block',
                    'ld-ext-right'
                  )}
                  type="submit">
                    Submit
                  </Button>
                </CardActions>
              </Form>
           
          </CardContent>
       
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      </Card>
     
      </div>

</>

</Container>
  );
};

export default ChangePassword;
