import React, { createContext, useState } from 'react';

// 1. Create the Context
export const UserContext = createContext();

// 2. Create the Provider Component
export function UserProvider({ children }) {
  // Put all your shared state here!
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [selectedLink, setSelectedLink] = useState("logIn");

  return (
    <UserContext.Provider value={{ 
      userEmail, setUserEmail, 
      userPass, setUserPass, 
      selectedLink, setSelectedLink 
    }}>
      {children}
    </UserContext.Provider>
  );
}