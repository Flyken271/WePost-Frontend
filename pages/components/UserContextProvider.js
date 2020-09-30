import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext();
const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const storeUser = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser({});
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt").replace(/['"]+/g, "");
      axios
        .get("https://api.wepost.xyz/Users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((re) => {
          storeUser(re.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, storeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

export default UserContextProvider;
