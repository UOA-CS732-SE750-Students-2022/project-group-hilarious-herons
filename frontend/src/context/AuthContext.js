import { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = (updatedUser) => {
    setUser({ ...updatedUser });

    return updatedUser;
  };

  const context = {
    isLoggedIn,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
