import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("campusmart_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const login = (token, userData) => {
    localStorage.setItem("campusmart_token", token);
    localStorage.setItem("campusmart_user", JSON.stringify(userData));
    setUser(userData);
  };


  const logout = () => {
  localStorage.removeItem("campusmart_token");
  localStorage.removeItem("campusmart_user");
  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
