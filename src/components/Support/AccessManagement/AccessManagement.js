import React from "react";
import { Row, Button, Col, Container, Nav, NavItem } from "reactstrap";
import { Divider } from "@material-ui/core";
import classNames from "classnames";
export const AccessManagement = (props) => {
  const handleCreateUser = () => {

    props.history.push({
      pathname: "createuser"
    });
  };

  const handleUserList = () => {
    props.history.push({
      pathname: "users"
    });
  };
  return (
    <>
      <Container>
        <div className="white mt-3">
          <h3>Access Management</h3>
          <Divider />
          <br></br>
        </div>
      </Container>

      <Container>
        <div className="white mt-3">
          <h3>User Management</h3>
          <Divider />
          <br></br>
          <Row>
            <Col>
              <Nav>
                <NavItem style={{ marginLeft: "0px" }}>
                  <Button
                    onClick={handleCreateUser}
                    color="success"
                    className={classNames("btn", "btn-md", "btn-success")}
                  >
                    Create User{" "}
                  </Button>
                </NavItem>

                <NavItem style={{ marginLeft: "5px" }}>
                  <Button
                    onClick={handleUserList}
                    className={classNames(
                      "btn",
                      "btn-md",
                      "btn-secondary",
                      "ld-ext-right"
                    )}
                  >
                    Users List
                  </Button>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default AccessManagement;
