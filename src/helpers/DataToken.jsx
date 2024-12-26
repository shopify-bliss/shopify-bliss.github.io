import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export function useDataToken() {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);

  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {
    const updateToken = () => {
      const getToken = cookies.get("shopify-bliss") || null;
      const decodedToken = getToken ? jwtDecode(getToken) : null;

      setToken(getToken);
      setDecoded(decodedToken);
    };

    // Initial fetch of token
    updateToken();

    // Set interval to monitor changes (optional)
    const interval = setInterval(updateToken, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return { token, decoded };
}
