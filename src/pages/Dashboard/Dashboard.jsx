import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { useDataToken } from "../../helpers/DataToken";
import { Error401, Error403 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";

function Dashboard() {
  const { submenuPage } = useDashboard();
  const { token, decoded } = useDataToken();

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
