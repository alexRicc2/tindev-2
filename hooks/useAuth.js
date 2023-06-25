//creating custom hook to manage login user authorization

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser]=useState(null)
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  return (
    <AuthContext.Provider value={{user, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
