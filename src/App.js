import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import oneTelstra from "./assets/images/backgrounds/onetelstra.webp";
import telstraAir from "./assets/images/backgrounds/telstraAir.jpg";
import telstraAir2 from "./assets/images/backgrounds/telstraAir2.jpg";
import telstraAir3 from "./assets/images/backgrounds/telstraAir3.jpg";
import telstraInsightCentre from "./assets/images/backgrounds/telstraInsightCentre.jpg";
import telstraInsightCentre2 from "./assets/images/backgrounds/telstraInsightCentre2.jpg";
import telstraOffice from "./assets/images/backgrounds/telstraOffice.jpg";
import telstraOrange from "./assets/images/backgrounds/telstraOrange.jpg";
import BackgroundSlideshow from "react-background-slideshow";
import { useHistory } from "react-router-dom";
import config from "./config";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/App.css";
import TelstraStyles from "./telstraStyles";
import Routes from "../src/routes/index";
import logo from "./assets/images/coelogo.png";

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
require("dotenv").config();

function App() {
  const images = [
    oneTelstra,
    telstraAir,
    telstraAir2
  ];
  
  
  return (
  
    <React.Fragment>
      <div>
        <TelstraStyles />
        <BackgroundSlideshow className animationDelay={60000} images={images} />
          <ThemeProvider theme={theme}>
          <Routes></Routes>
          </ThemeProvider>
      </div>
    </React.Fragment>
 
  );
}

export default App;
