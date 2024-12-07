import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { useDataToken } from "../../helpers/DataToken";
import { Error401, Error403 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";
import Cookies from "universal-cookie";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const { submenuPage } = useDashboard();
  const { token, decoded } = useDataToken();

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
      ) : decoded?.role !== "admin" ? (
        <Error403 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "analytics 1" && <div>Dashboard</div>}
          {submenuPage === "analytics 2" && <Analytics />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default Dashboard;
