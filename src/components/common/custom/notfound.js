import React,{Component} from 'react';
import { Container } from "reactstrap";
import notfoundimg from '../../../assets/images/404_mdb.png';
class NotFound extends Component {
    render(){
         
          return(
            <Container
            className="white"
            style={{ boxShadow: "none", display: "block" }}
          >
                <div className="col-md-12 text-center float-md-none mx-auto">
    <img src={notfoundimg} alt="Error 404" className="img-fluid wow fadeIn"></img>
    <h2>Oops! This obviously isn't a page you were looking for.</h2>
    <p>Please, let us know how you got here, and use one of the following links to navigate back to safe harbor.</p>
    </div>
  </Container>
      )
   }
 }
export default NotFound