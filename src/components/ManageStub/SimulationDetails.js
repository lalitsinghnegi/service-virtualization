import React, { useEffect, useState } from "react";
import sim from "../../services/simulation.service";
import classNames from "classnames";
import {
  Container,
  Button,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
  Input,
} from "reactstrap";
export default function SimulationDetails(props) {

  // IMP : please delete this component we are not using this 

  const { selectedRow, ...rest } = props;
  const [preview, setPreview] = useState("");
  const [masterPreview, setMasterPreview] = useState("");
  const [message,SetMessage] = useState("");

  const handleGetData = async () => {
    return new Promise(async (resolve, reject) => {
      sim
        .getRawFileData({ s3_path: selectedRow.s3_path })
        .then((response) => {
          if (response.data.code === 200) {
            let responseData = response.data.data;
            let formated = JSON.stringify(responseData, undefined, 4);
            return resolve(formated);
          }
        })
        .catch((error) => {
          return reject("file not found");
        });
    });
  };

  const handleGetMasterData = async () => {
    //Change the implementation to fetch the master data
    console.log("selectedRow::", selectedRow);
    return new Promise(async (resolve, reject) => {
      sim
        .getRawFileData({ s3_path: selectedRow.s3_path })
        .then((response) => {
          if (response.data.code === 200) {
            let responseData = response.data.data;
            let formated = JSON.stringify(responseData, undefined, 4);
            return resolve(formated);
          }
        })
        .catch((error) => {
          return reject("file not found");
        });
    });
  };

  const handleRevertChanges = () => {
    //Please implement
  };

  const handleMergeChanges = () => {
    //please implement
  };

  const handleMergeDeployChanges = () => {
    //please implement
  };
  useEffect(() => {
    //populate current record preview
    handleGetData().then((formated) => {
      setPreview(formated);
    });
  }, [preview]);

  useEffect(() => {
    //populate master preview
    handleGetMasterData().then((formated) => {
      setMasterPreview(formated);
    });
  }, [masterPreview]);

  return (
   
      <div className="lightgreen">
        <Row>
          <Col xs="6">
            <b> Master</b>
          </Col>
          <Col xs="6">
            <b>{selectedRow.s3_path}</b>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Input
              style={{ fontSize: 13 }}
              type="textarea"
              value={masterPreview}
              rows={10}
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </Col>
          <Col xs="6">
            <Input
              style={{ fontSize: 13 }}
              type="textarea"
              value={preview}
              rows={10}
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col xs="12">
            <Navbar expand="md">
              <Nav className="mr-auto" navbar>

                <p style={{color:"red"}}>  {message} </p>
              </Nav>
              <Nav>
                <NavItem style={{ marginLeft: "10px" }}>
                  <Button
                    className={classNames(
                      "btn",
                      "btn-sm",
                      "btn-success",
                      "ld-ext-right"
                    )}
                    onClick={handleRevertChanges}
                  >
                    Revert Changes
                  </Button>
                </NavItem>
               
                <NavItem style={{ marginLeft: "10px" }}>
                  <Button
                    className={classNames(
                      "btn",
                      "btn-sm",
                      "btn-success",
                      "ld-ext-right"
                    )}
                    onClick={handleMergeDeployChanges}
                  >
                    Merge & Deploy
                  </Button>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </div>
  
  );
}
