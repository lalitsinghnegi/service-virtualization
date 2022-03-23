import './HeaderNavUserMenu.css';
import { Link } from 'react-router-dom';
import React ,{useState } from 'react';
import {session_logout} from '../../../services/authentication';
export const HeaderNavUserMenu = (props) => {
   // const [version,setVersion] = useState(0);
    const signout = (e) => {
        session_logout()
        .then(response => {
            console.log("session_logout::",response)
           
           // setVersion(version+1)
        })
    }

    return (
        <div id="user-menu" style={{"zIndex": "2000"}}>
            <Link to="changepass">
        <div className="user-menu-item clickable">
          <i className="td-icon-sm icon-my-profile position-static text-primary"></i>
          <span className="item-title">Change Password</span>
        </div>
      </Link>
      <div className="item-break" />
            <Link to="/signin" onClick={signout}>
                <div className="user-menu-item clickable">
                    <i className="td-icon-sm icon-lock position-static text-warning"></i>
                    <span className="item-title">Logout</span>
                </div>
            </Link>
        </div>
    )
}