import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export function useDataToken() {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });

    const getToken = cookies.get("shopify-bliss") || null;
    const decodedToken = getToken ? jwtDecode(getToken) : null;

    setToken(getToken);
    setDecoded(decodedToken);
  }, []);

  return { token, decoded };
}
