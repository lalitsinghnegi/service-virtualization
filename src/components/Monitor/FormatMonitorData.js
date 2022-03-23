import axios from "axios";
export const hello = async (port_number) => {
// IMP : Delete this we are not using 

    let apiResponse;

//    http://localhost:8889/api/v2/hoverfly
    const url = 'http://localhost:'+port_number+'/api/v2/hoverfly';
    await axios
    .get(url)
    .then(res => {
      apiResponse = res;
    }) 
    .catch(e => {
      const { response } = e;
      if (response) {
        apiResponse = e;
      }
    });

};

export const getMode = async (port_number) => {
  let apiResponse;
  // const url = 'http://localhost:'+8888+'/api/v2/hoverfly/mode';
  const url = 'http://localhost:'+8500+'/api/hello2';

  await axios
  .get(url)
  .then(res => {
    console.log("res is ", res)
    apiResponse = res;
  })
  .catch(e => {
    const { response } = e;
    if (response) {
      apiResponse = e;
    }
  });

}

