import React from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { decodedToken, getToken } from "../../helpers/DataToken";
import { Error401 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";

function Dashboard() {
  const { submenuPage } = useDashboard();

  return (
    <>
      {getToken && decodedToken.role === "admin" ? (
        <LayoutDashboard>
          {submenuPage === "analytics 1" && <div>Dashboard</div>}
          {submenuPage === "analytics 2" && <Analytics />}
        </LayoutDashboard>
      ) : (
        <Error401 />
      )}
    </>
  );
}

export default Dashboard;
