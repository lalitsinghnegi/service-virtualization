import React, { useEffect, useState } from "react";
import classNames from "classnames";
import MaterialTable from "material-table";
import {
  getRequestList,
  getNewRequestList,
  process,
} from "../../../services/registeration.service";
import Swal from "sweetalert2";
import { Edit, Clear } from "@material-ui/icons";
import {
  Form,
  Row,
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavItem,
} from "reactstrap";
import {
  Divider
} from "@material-ui/core";
const columns = [
  { title: "ID", field: "request_id" },
  { title: "Name", field: "user_name" },
  { title: "Email", field: "email" },
  { title: "Team", field: "team_name" },
  { title: "Program", field: "program_name" },
  { title: "Status", field: "status" },
  {
    title: "Created On",
    field: "created_datetime",
    type: "datetime",
    defaultSort: "desc",
  },
];
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})
export default function Requests(props) {

    
 //Purpose : This component is for listing all request and approve or Reject any request.
 


  const [table, setTable] = useState(false);
  const [actionbutton,setActionbutton]=useState([]);
  const [data, setData] = useState([
    {
      user_name: "",
      updated_datetime: "",
    },
  ]);



  
  const items = [
    {
      icon: "done",
      tooltip: "Approved",
      onClick: (event, rowData) => {

        swalWithBootstrapButtons.fire({
          title: 'Approve ?',
          text: "Are you sure you want to approve the request ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, approve it!',
          cancelButtonText: 'cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            handleSendActivation(rowData,"approved");
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            //do nothing
          }
        })
      },
    },
    {
      icon: () => <Clear />,
      tooltip: "Reject",
      onClick: (event, rowData) => {
        swalWithBootstrapButtons.fire({
          title: 'Reject ?',
          text: "Are you sure you want to reject the request ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, reject it!',
          cancelButtonText: 'cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            handleSendActivation(rowData,"rejected")
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            //do nothing
          }
        })
      },
    },
  ];

  const handleSendActivation = async (rowData,action) => {
    let response = await process({
      request_id: rowData.request_id,
      action: action,
    });
    if (response.code === 200) {
      getNewRequestData();
      setTableData();
      Swal.fire("Congratulation !", "Account has been activated", "success");
    } else {
      Swal.fire("Error", response.message, "error");
    }
  };

  const getNewRequestData = async () => {
    setActionbutton(items);
    let response = await getNewRequestList();
    if (response !== undefined) setData(response.data);

  };

  const getAllRequestData = async () => {
    setActionbutton([]);
    let response = await getRequestList();
    if (response !== undefined) setData(response.data);
  };

  const setTableData = () => {
    setTable(true);
  };

  useEffect(() => {
    getNewRequestData();
    setTableData();
    setActionbutton(items)
  }, []);

  return (
    <Container>
      <div className="white mt-3">
          <h3>Approvals</h3>
          <Divider />
          <br></br>
          <Row>
                <Col>
                    <Nav>
                      <NavItem style={{ marginLeft: "0px" }}>
                        <Button
                        onClick={getNewRequestData}
                          color="success"
                          className={classNames(
                            "btn",
                            "btn-md",
                            "btn-success"
                          )}
                        >
                          New Request{" "}
                        </Button>
                      </NavItem>

                      <NavItem style={{ marginLeft: "5px" }}>
                      <Button
                  onClick={getAllRequestData}
                  className={classNames(
                    "btn",
                    "btn-md",
                    "btn-secondary",
                    "ld-ext-right"
                  )}
                >
                  All Requests
                </Button>
                      </NavItem>
                    </Nav>
                </Col>
              </Row>
         
           <br></br>
            <Form>

              <Row>
                <MaterialTable
                  style={{ boxShadow: "none", width: "100%", display: "block" }}
                  columns={columns}
                  data={data.data}
                  actions={actionbutton}
                  title={""}
                  options={{
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    actionsColumnIndex: -1,
                  }}
                />
              </Row>
            </Form>
         
      </div>
    </Container>
  );
}
