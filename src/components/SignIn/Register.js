import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { FormHeader } from "../common/custom/FormHeader";
import LinkButton from "../common/custom/LinkButton";
import Select from "react-select";
import {
  register,
  getProgramList,
  getTeamList,
} from "../../services/user.service";
import Swal from "sweetalert2";
import "../SignIn/Signin.css";
import { Button, Form, Input, Row, Col } from "reactstrap";
const Register = (props) => {
  let history = useHistory();
  const [teamList, setTeamList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [team_id, setTeam] = useState("");
  const [program_id, setProgram] = useState("");
  const [team_name, setTeamName] = useState([]);
  const [program_name, setProgramName] = useState([]);
  const initialUserData = {
    username: null,
    useremail: null,
    password: null,
    confirmpassword: null,
    team_id: null,
    team_name: null,
    program_id: null,
    program_name: null,
  };

  const [user, setUser] = useState(initialUserData);

  const getTeam = (program_id) => {
    getTeamList(program_id).then((response) => {
      if (response) {
        let allTeams = response.data.data;
        let selectOptions = [];
        for (let i = 0; i < allTeams.length; i++) {
          let team = allTeams[i];
          selectOptions.push({ value: team.value, label: team.display });
        }
        setTeamList(selectOptions);
      }
    });
  };

  const getPrograms = () => {
    getProgramList().then((response) => {
      if (response) {
        let allPrograms = response.data.data;
        let selectOptions = [];

        for (let i = 0; i < allPrograms.length; i++) {
          let program = allPrograms[i];
          selectOptions.push({ value: program.value, label: program.display });
        }
        setProgramList(selectOptions);
      }
    });
  };

  const changeProgram = (e) => {
    console.log(e);
    setProgram(e.value);
    setProgramName(e.label);
    getTeam(e.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    user.program_id = program_id;
    user.program_name = program_name;
    user.team_id = team_id;
    user.team_name = team_name;
    if (user.program_id === "") {
      Swal.fire("Error", "Please select a program.", "error");
    } else if (user.team_id === "") {
      Swal.fire("Error", "Please select a team.", "error");
    } else if (user.password !== user.confirmpassword) {
      Swal.fire("Error", "Confirm password is not same as password.", "error");
    } else {
      console.log(user);
      let response = await register(user);
      if (response.success) {
        Swal.fire("Congratulation !", response.message, "success");
        history.push("/signin");
      } else {
        Swal.fire("Error", response.message, "error");
      }
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div>
      <Form onSubmit={submit} className="form-register text-center white">
        <FormHeader
          title={`Registration`}
          gradient="theme-gradient-primary-secondary"
          icon="telstra"
          size={"sm"}
        />
        <Row className="text-left">
          <Col xs="6">
            <label class="asterisk">Name</label>
            <Input
              type="text"
              name="Name"
              required
              onInput={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Col>
          <Col xs="6">
            <label class="asterisk"> Email ID </label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              onInput={(e) => setUser({ ...user, useremail: e.target.value })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "3%" }} className="text-left">
          <Col xs="6">
            <label class="asterisk">Password</label>
            <Input
              width="100%"
              type="password"
              name="Password"
              required
              onInput={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Col>
          <Col xs="6" className="label">
            <label class="asterisk">Confirm Password</label>
            <Input
              type="password"
              name="ConfirmPassword"
              required
              onInput={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "3%" }} className="text-left">
          <Col xs="6">
            <label class="asterisk">Program Name</label>
            <Select
              required
              id="programName"
              name="programName"
              onChange={(e) => changeProgram(e)}
              options={programList}
            />
          </Col>

          <Col xs="6">
            <label class="asterisk">Team Name</label>
            <Select
              required
              options={teamList}
              onChange={(e) => {
                setTeam(e.value);
                setTeamName(e.label);
              }}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "4%" }}>
          <Col xs="12">
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
              Register
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Col xs="12">
            <LinkButton
              to="/signin"
              className="btn btn-lg btn-secondary btn-block"
              type="button"
              role="button"
            >
              Sign In
            </LinkButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
