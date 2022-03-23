import React, { useState ,useContext} from "react";
import LinkButton from "../common/custom/LinkButton";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { FormHeader } from "../common/custom/FormHeader";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import {
  signin,
  storeToken,
  getProfileDataFromToken,
} from "../../services/authentication";

import { GlobalContext } from "../../context/GlobalState";
import "../SignIn/Signin.css";
import logger from "../../utilities/logger";
const Sigin = (props) => {
  let history = useHistory();
  const initialUserData = {
    useremail: null,
    password: null,
  };

  let {
    setLoginType,
    setUserRoles,
    setIsAdmin,
    setIsAuthenticated,
    setProfileData
  } = useContext(GlobalContext);

  const [user, setUser] = useState(initialUserData);

  const submit = async (e) => {
    e.preventDefault();

    signin(user).then((response) => {
      logger.info("signin successfully")
      if (response) {
        if (response.success) {

          storeToken(response.token);
          setLoginType("LOCAL");
          setIsAuthenticated(true);

          let user = getProfileDataFromToken(response.token);

          setUserRoles(user.role);
          setProfileData({ user_name: user.user_name, email: user.email });

          if (user.role === "support") {
            setIsAdmin(true);
            history.push("/support/dashboard");
          } else {
            setIsAdmin(false);
            history.push("/dashboard");
          }
        } else {
          logger.error("signin Error",response.message)
          Swal.fire("Error", response.message, "error");
        }
      }
    }).catch(error=>{
      logger.error("signin->",error)
          Swal.fire("Error","No response due to internal error", "error");
    })
    
    ;
  };

  return (
    <div>
      <Form onSubmit={submit} className="form-signin text-center white">
        <FormHeader
          title={`Login`}
          gradient="theme-gradient-primary-secondary"
          icon="telstra"
          size={"sm"}
        />

        <FormGroup>
          <Label for="email">Telstra Email-Id</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Telstra Email-Id"
            onInput={(e) => setUser({ ...user, useremail: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="Password"
            id="Password"
            required
            placeholder="Enter your password"
            onInput={(e) => setUser({ ...user, password: e.target.value })}
          />
        </FormGroup>
        <Button
          className={classNames(
            "btn",
            "btn-lg",
            "btn-success",
            "btn-block",
            "ld-ext-right"
          )}
          type="submit"
        >
          {" "}
          Sign In{" "}
        </Button>

        <LinkButton
          to="/register"
          className="btn btn-secondary btn-block"
          type="button"
          role="button"
        >
          Register an account
        </LinkButton>
        <LinkButton
          to="/forgotpassword"
          className="btn btn-warning btn-block"
          type="button"
          role="button"
        >
          Forgot your password?
        </LinkButton>
      </Form>
    </div>
  );
};

export default Sigin;
