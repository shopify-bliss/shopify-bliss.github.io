import React, { useEffect } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password/Password";
import { useDataToken } from "../../helpers/DataToken";
import { Error401 } from "../Error/Error";
import Cookies from "universal-cookie";
import { useSearchParams } from "react-router-dom";

function Profile() {
  const { submenuPage } = useDashboard();
  const { token } = useDataToken();

  const [searchParams] = useSearchParams();
  const getTokenParams = searchParams.get("shopify-bliss");

  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {
    if (getTokenParams) {
      cookies.set("shopify-bliss", getTokenParams);

      const params = new URLSearchParams(window.location.search);
      params.delete("shopify-bliss");
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [getTokenParams, cookies]);

  return (
    <>
      {!token ? (
        <Error401 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "bio" && <div>Profile</div>}
          {submenuPage === "password" && <Password />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default Profile;
