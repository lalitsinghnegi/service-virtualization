import React from 'react';
import { Container } from "reactstrap";
import MaterialTable from "material-table";

export default function AllUsers() {
    const columns = [
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Team", field: "team" },
        { title: "Date Created", field: "date_created" },
        { title: "Role", field: "role"} ,
        { title: "Actions", field: "actions"} ,
      ]

    const data = [
        { "name":"Gagan", "email":"gagan.chohan@team.telstra.com", "team":"team Speed", 
          "date_created":"date","role":"General User"},
        
        { "name":"David", "email":"david@team.telstra.com", "team":"team Speed", 
          "date_created":"12/5/2020","role":"General User"},
        
    ]
    return (
        <Container>
            <div className="white mt-3">
               <h4>All Users</h4>
               <MaterialTable
                    style={{ boxShadow: "none", width: "100%", display: "block" }}
                    columns = {columns}
                    data={data}

               />
            </div>
        </Container>
    )
}
