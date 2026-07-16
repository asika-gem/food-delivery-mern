
import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const isLoggedIn = !!currentUser;

  const updateUser = (data) => {
    setCurrentUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
