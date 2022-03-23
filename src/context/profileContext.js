import React, { createContext, useState } from "react";
export const ProfileContext = createContext();
const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(
      {user_name: ""}
    );
    const saveProfile = (profile) => {
      const newProfile = {
        user_name: profile.user_name
      };
      setProfile(newProfile);
    };
    return (
      <ProfileContext.Provider value={{ profile, saveProfile }}>
        {children}
      </ProfileContext.Provider>
    );
  };
  
  export default ProfileProvider;