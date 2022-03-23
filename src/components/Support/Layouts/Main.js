import React from "react";
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/styles';

import Topbar from "../Topbar";

import { session_logout } from '../../../services/authentication';
const useStyles = makeStyles(theme => ({
  root: {
    width:'100%',
    [theme.breakpoints.up('sm')]: {
      padding: 80
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    width:'100%',
    marginTop:100
  }
}));

export const Main = props => {

    
 //Purpose : This component is the layout fram for support role
 // this is the container for other routes for support role
 


let history = useHistory();
const { children } = props;
const classes = useStyles();

  const signout = (e) => {
    e.preventDefault();
      session_logout()
      .then(response => {
          console.log("response after logout ::",response)
          history.push("/expired");
      })
  }

  return (
  
    <div>
    <Topbar signout={signout} />
  
    <main className={classes.content}>
      {children}
    </main>
  </div>
  );
}


Main.propTypes = {
  children: PropTypes.node
};

export default Main;
