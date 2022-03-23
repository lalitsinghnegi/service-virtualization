import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Row, Form, Col, Card, Button } from "reactstrap";
import Swal from "sweetalert2";

const columns = [
  { title: "Method", field: "method" , width:"10%"},
  { title: "URL", field: "ep" ,width:"80%"},
];
export default function EndpointsList(props) {
  
  // Purpose : To show the list of all end point in Edit-mode

  const [epdata, setEpData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);

  const handleDelete = (rowData) => {
    props.handleRowDelete(rowData);
  };
  const handleRowClick = (selectedRow) => {
    setSelectedRow(selectedRow);
    props.handleRowClick(selectedRow);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  const actions = [
    {
      icon: "delete",
      tooltip: "Delete EndPoint",
      onClick: (event, rowData) => {
       
        // please confirm before deletion
      
        swalWithBootstrapButtons.fire({
          title: 'Delete EndPoint ?',
          text: "Are you sure you want to delete the endpoint ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            handleDelete(rowData)
           
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            //do nothing
          }
        })
      },
    },
  ];

  //call only once
  useEffect(() => {
    setEpData(props.epdata)
    if (props.selectedRowData.hasOwnProperty("uniqueId")) {
      setSelectedRow(props.selectedRowData);
    }else{
      setSelectedRow(0);
    }
  }, [props.revision]);

  return (
    <div>
      <Form>
        <Row>
          {props.epdata ? (
            <MaterialTable
              style={{ boxShadow: "none", width: "100%", display: "block" }}
              onRowClick={(evt, selectedRow) => {
                handleRowClick(selectedRow);
              }}
              columns={columns}
              data={epdata}
              actions={actions}
              title="EndPoints"
              options={{
                rowStyle: (rowData) => ({
                  color:
                    selectedRow &&
                    selectedRow.tableData.id === rowData.tableData.id
                      ? "#000000"
                      : "#000000",
                  backgroundColor:
                    selectedRow &&
                    selectedRow.tableData.id === rowData.tableData.id
                      ? "#f0f3f7"
                      : "#FFF",
                }),
                headerStyle: {
                  fontWeight: "bold",
                },
                actionsColumnIndex: -1,
              }}
            />
          ) : (
            ""
          )}
        </Row>
      </Form>
    </div>
  );
}
