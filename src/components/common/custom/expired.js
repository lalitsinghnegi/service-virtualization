import React,{Component} from 'react';
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
class Expired extends Component {
    render(){
         
          return(
            <Container
            className="white"
            style={{ boxShadow: "none", display: "block" }}
          >
                <div className="col-md-12 text-center float-md-none mx-auto">
    <h2>You are logged-out from SV Portal or your session has expired</h2>
    <p>Please Re-Login To Continue</p>
    <Link to="/signin">
    <Button
          className={classNames(
            'btn',
            'btn-sm',
            'btn-success',
            'ld-ext-right'
          )}
          type='submit'
        >
          {' '}
          Login{' '}
        </Button>
        </Link> 
   </div>
  </Container>
      )
   }
 }
export default Expired