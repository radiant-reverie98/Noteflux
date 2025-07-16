import { createContext, useState } from "react";

// Create the context once
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(() => {
    return localStorage.getItem("userLogged") === "true";
  });
  const [userId,setUserId] = useState("")

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged ,userId,setUserId}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
