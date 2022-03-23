import React, { useEffect, useState } from "react";
import classNames from "classnames";
import MaterialTable from "material-table";
import {
  getAll,
  deleteOne,
  sendActivation,
} from "../../../services/support.service";
import ConfirmDialog from "../../common/custom/ConfirmDialog";
import Swal from "sweetalert2";
import { Container, Button, Row, Col, Nav, Navbar, NavItem } from "reactstrap";
import { Grid, Divider } from "@material-ui/core";
const columns = [
  { title: "ID", field: "id" },
  { title: "Name", field: "user_name" },
  { title: "Email", field: "email" },
  { title: "Active", field: "active" },
  { title: "Role", field: "role" },
  { title: "Last Updated On", field: "updated_datetime", type: "datetime" },
  {
    title: "Created On",
    field: "created_datetime",
    type: "datetime",
    defaultSort: "desc",
  },
];

export default function Users(props) {

    
 //Purpose : Show the List of all Users
 

  const [table, setTable] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [data, setData] = useState([
    {
      user_name: "",
      updated_datetime: "",
    },
  ]);

  const actions = [
    {
      icon: "edit",
      tooltip: "Activate",
      onClick: (event, rowData) => {
        handleSendActivation(rowData);
      },
    },
    {
      icon: "delete",
      tooltip: "Delete",
      onClick: (event, rowData) => {
        setRowData(rowData);
        setConfirmOpen(true);
      },
    },
  ];

  const handleDelete = async () => {
    let response = await deleteOne({ id: rowData.id, email: rowData.email });
    if (response.status == 200) {
      getData();
      setTableData();
    }
  };

  const getData = async () => {
    let response = await getAll();
    if (response !== undefined) setData(response.data);
  };

  const setTableData = () => {
    setTable(true);
  };

  const handleSendActivation = async (rowData) => {
    let response = await sendActivation({
      id: rowData.id,
      user_name: rowData.user_name,
      email: rowData.email,
    });
    if (response.code === 200) {
      Swal.fire("Congratulation !", response.message, "success");
    } else {
      Swal.fire("Error", response.message, "error");
    }
  };

  const handleCreate = () => {
    props.history.push({
      pathname: "createuser",
    });
  };

  useEffect(() => {
    getData();
    setTableData();
  }, []);

  return (
    <Container>
      <>
        <div className="white mt-3">
          <ConfirmDialog
            title="Delete user ?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={handleDelete}
          >
            Are you sure you want to delete this record ?
          </ConfirmDialog>

          <h3>Manage Users</h3>

          <Divider />
          <br></br>
          <Grid item md={12} xs={12}>
            <MaterialTable
              style={{ boxShadow: "none", width: "100%", display: "block" }}
              columns={columns}
              data={data.data}
              actions={actions}
              title={""}
              options={{
                headerStyle: {
                  fontWeight: "bold",
                },
                actionsColumnIndex: -1,
              }}
            />
          </Grid>
        </div>
      </>
    </Container>
  );
}
