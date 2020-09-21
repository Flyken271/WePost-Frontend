import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

/* Auth Context */
const UserContext = createContext({
  user: {},
  setUser: () => {},
});

/* Auth Provider Component */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    let user1 = JSON.parse(localStorage.getItem("user"));
    const checkAuth = async () => {
      const response = await axios.get(`https://api.wepost.xyz/users/me/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data) setAuthorized(true);
    };
    if (token) checkAuth();
    if (user1) setUser(user1);
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authorized,
        setAuthorized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* Use Auth Context */
export const useUserCtx = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("can't use user context here..");
  return context;
};
