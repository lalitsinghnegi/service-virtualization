const dev = {
  appId: '167bbd82-d8b2-4dc8-8c26-e876019741f6',
  redirectUri: 'http://localhost:3000',
  title: "Service Virtualisation",
  color: 'magenta',
  subtitle: "Development",
  api: {
      uri: 'http://localhost:5000/backend/api/'
      // uri:'https://cave-dev.sdpamp.com/backend/api/'
  }
};

const prod = {
  appId: '167bbd82-d8b2-4dc8-8c26-e876019741f6',
  redirectUri: 'http://localhost:3000',
  title: "Service Virtualisation",
  color: 'magenta',
  subtitle: "Development",
  api: {
      uri: 'https://cave-dev.sdpamp.com/backend/api/'
  }
  }
;

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;


export default {
  ...config
}
