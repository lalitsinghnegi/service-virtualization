import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import CommonService from "../../services/common.service";
export default function VirtualServiceDetail(props) {
  
// IMP : delete this we are not using 

  const [serviceDetail, setServiceDetail] = useState({
    data: {
      mode: '',
      usage: {
        counters: {
          capture: '',
          simulate: '',
        },
      },
    },
  });
  const getData = async (virtualServiceDetails) => {
    setServiceDetail(
      await CommonService.httpPost(virtualServiceDetails, {
        port: props.match.params.port,
      })
    );
  };
  useEffect(() => {
    const virtualServiceDetails = CommonService.getApiUrl(
      'monitor/virtualServiceDetails'
    );
    getData(virtualServiceDetails);
  }, []);
  return (
    <div>
      <Container className='white'>
        <h1>Virtual Service Details</h1>
        <p>
          <b>Name :</b> {props.match.params.name}
        </p>
        <p>
          <b>Port: </b> {props.match.params.port}
        </p>
        {/* Capiltalise the first letter */}
        <p>
          <b>Mode: </b>
          {serviceDetail.data.mode.replace(/^\w/, (c) => c.toUpperCase())}{' '}
        </p>

        <p>
          <b>Number of Requests </b>{' '}
          {serviceDetail.data.usage.counters.simulate}{' '}
        </p>
        <p>
          <b></b>
        </p>
      </Container>
    </div>
  );
}
