import { useState, useEffect, useCallback } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export function useDataToken() {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);

  const updateToken = useCallback(() => {
    const cookies = new Cookies();
    const newToken = cookies.get("shopify-bliss") || null;
    const decodedToken = newToken ? jwtDecode(newToken) : null;

    setToken(newToken);
    setDecoded(decodedToken);
  }, []);

  useEffect(() => {
    updateToken();

    const interval = setInterval(() => {
      updateToken();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateToken]);

  return { token, decoded };
}
