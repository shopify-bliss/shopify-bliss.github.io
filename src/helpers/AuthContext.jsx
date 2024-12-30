import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const updateAuthState = () => {
      const newToken = Cookies.get("shopify-bliss");
      if (newToken !== token) {
        setToken(newToken);
      }
    };

    updateAuthState();

    const interval = setInterval(updateAuthState, 1000); // Polling
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
