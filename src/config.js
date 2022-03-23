const dev = {
    appId: '',
    redirectUri: 'http://localhost:3000',
    scopes: [
      ''
    ],
    hoverfly_ports: [{name:'First Hoverfly', port: 8888}, //8500
                     {name:'Second Hoverfly', port: 8889}, //8501
                     {name:'Third Hoverfly', port: 8890}]  //8502
    ,
    title: "Service Virtualisation Portal",
    color: 'magenta',
    subtitle: "V1.0",
    api: {
        uri: 'http://localhost:5000/backend/api/'
        // uri: 'https://cave-dev.sdpamp.com/backend/api/'

    }
    
  };
  
  const prod = {
    appId: '',
    redirectUri: 'http://localhost:3000',
    scopes: [
      ''
    ],
    title: "Service Virtualisation Portal",
    color: 'magenta',
    subtitle: "",
    api: {
        uri: 'https://cave-dev.sdpamp.com/backend/api/'
    }
  };
  
  const config = process.env.REACT_APP_STAGE == 'production'
    ? prod
    : dev;
  
  
  export default {
    ...config
  }
  