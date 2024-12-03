import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const getToken = cookies.get("shopify-bliss");
export const decodedToken = jwtDecode(getToken);
