import { createContext, useContext, useEffect, useState } from "react";
import {
  userLogin,
  getAuthStatus,
  logoutUser,
  userSignup,
} from "../../helpers/api-functions";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user cookies are valid and then skip login
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await getAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.warn("Auth status check failed:", err);
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const data = await userLogin(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name, email, password) => {
    await userSignup(name, email, password);
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = { user, isLoggedIn, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook defined in the same file but NOT exported
export const useAuth = () => useContext(AuthContext);
