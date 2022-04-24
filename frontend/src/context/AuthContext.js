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

  const login = (user) => {
    setUser({ ...user });
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  };

  const logout = (user) => {
    setUser({});
    setIsLoggedIn(false);
  };

  const context = {
    isLoggedIn,
    user,
    updateUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
