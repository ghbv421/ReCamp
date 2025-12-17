import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultImage = require("../../assets/images/Profile-icon.png"); 
  
  const [profileImage, setProfileImage] = useState(defaultImage);
  
  // ✅ Added 'role' to userData
  const [userData, setUserData] = useState({
    name: "Guest",
    email: "",
    contact: "",
    address: "",
    role: "user" // Default role
  });

  const updateProfileImage = (newUri: string) => {
    setProfileImage({ uri: newUri });
  };

  const updateUserData = (newData: any) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ profileImage, updateProfileImage, userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);