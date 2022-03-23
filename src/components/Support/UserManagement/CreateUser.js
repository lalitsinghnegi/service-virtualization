import React, { useEffect, useState } from "react";
import Select from "react-select";
import classNames from "classnames";
import {
  CardContent,
  Divider
} from "@material-ui/core";
import "./CreateUser.css";
import { createUser } from "../../../services/support.service";
import { getProgramList, getTeamList } from "../../../services/user.service";
import Swal from "sweetalert2";
import {
  Container,
  Button,
  Form,
  Input,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";

export default function CreateUsers(props) {

    
 //Purpose : This component is for creating a user from support user.

  const { className, ...rest } = props;

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
      let response = await createUser(user);
      if (response.status === 200) {
        Swal.fire("Congratulation !", response.message, "success");
    
      } else {
        Swal.fire("Error", response.message, "error");
      }
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <Container>
  
    <>
    <div className="white mt-3">
<h3>Create Users</h3> 
       
       <Divider />
      
        <CardContent>
          <Form
            className=" white"
            style={{ width: "100%" }}
            onSubmit={submit}
            id="regform"
          >

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
       <br></br>
            <Divider />


      <Row>
          <Col>
            <br></br>
            <Navbar expand="md">
             <Nav className="mr-auto" navbar></Nav>
              <Nav>
                <NavItem>
                <Button
              className={classNames(
                "btn",
                "btn-sm",
                "btn-success",
                "ld-ext-right"
              )}
              type="submit"
            >
              Submit
            </Button>
                </NavItem>
                </Nav>
               
            </Navbar>
          </Col>
        </Row>
          </Form>
        </CardContent>
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
    
      </div>

</>

</Container>
  );
}
