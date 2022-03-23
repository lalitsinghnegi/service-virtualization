import React, {useEffect,useContext } from 'react';
import { HeaderNavIcon } from './HeaderNavIcon';
import { HeaderNavUserMenu } from './HeaderNavUserMenu';
import { TelstraIcon } from '../icons/GradientIcons';
import { GlobalContext } from '../../../context/GlobalState';

const HeaderNavUser = (props) => {
        // Global state variables
  const { profile_data } = useContext(GlobalContext);
       
  console.log("setProfileData::",profile_data);
        useEffect(() => {
            console.log('Global state change detected in HeaderNavUser.js');
            console.log(profile_data);
        }, [profile_data])

        return (
            <div className="header-nav-user">
                <HeaderNavIcon className={`base-purple`} linkFlex={true}>
                    <TelstraIcon color="purple" icon="my-profile" />
                    {<p className="text-white mt-0 pl-1 pr-1">
         
          {profile_data.user_name}
          </p>}
                </HeaderNavIcon>
        { <HeaderNavUserMenu signout={props.signout}/>}
            </div>
        )

}



export default HeaderNavUser;
