import React, { useEffect } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { useDataToken } from "../../helpers/DataToken";
import { Error403 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const { submenuPage, toastMessage } = useDashboard();
  const { decoded } = useDataToken();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.messageLoginGoogle) {
      toastMessage("success", location.state.messageLoginGoogle);
      navigate(location.pathname, {
        state: { ...location.state, messageLoginGoogle: undefined },
        replace: true,
      });
    }
  }, [location.state, navigate, toastMessage, location.pathname]);

  return (
    <>
      {decoded?.role !== "admin" ? (
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
