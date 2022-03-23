import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import CommonService from "../../services/common.service";
import MaterialTable from 'material-table';
import { Row, Form, Col, Card, Button } from 'reactstrap';
import HealthHistory from '../Health/HealthHistory';

// IMP : delete this we are not using 

const columns = [
  { title: 'Virtual Service Hosts', field: 'virtual_service_host' },
  { title: 'Admin Port', field: 'port' },
  { title: 'WebServer/Proxy Port', field: 'proxy_port' },

  // {title:'Mode', field: 'mode'},
  { title: 'Status', field: 'status' },
  { title: 'Request Count', field: 'total_requests', type: 'numeric' }
];

export default function Monitor(props) {
  const [table, setTable] = useState(false);

  const [data, setData] = useState([
    {
      virtual_service_host: '',
      proxy_port: '',
      port: '',
      status: '',
    },
  ]);

  const setTableData = () => {
    setTable(true);
  };

  const getData = async (getAllContainers) => {
    setData(await CommonService.httpGet(getAllContainers));
  };

  useEffect(() => {
    const getAllContainers = CommonService.getApiUrl('monitor/getAllContainers');
    getData(getAllContainers);
    setTableData();
  }, []);
  return (
    <div>
      <Form>
        <Row>
          <MaterialTable
            style={{ boxShadow: 'none', width: '100%', display: 'block' }}
            onRowClick={(event, rowData) => {
              
              props.history.push({
                pathname:
                  '/virtualServiceDetails/' +
                  rowData.port +
                  '/' +
                  rowData.virtual_service_host,
              });
            }}
            columns={columns}
            data={data.data}
            title={
              <h3>
                <b>Virtual Services</b>
              </h3>
            }
            options={{
              headerStyle: {
                fontWeight: 'bold',
              },
              actionsColumnIndex: -1,
            }}
          />
        </Row>
        <Row>
          <HealthHistory />
        </Row>
      </Form>
    </div>
  );
}
