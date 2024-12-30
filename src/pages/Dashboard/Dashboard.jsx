import React, { useEffect, useState } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { Error403 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const { submenuPage, toastMessage, user } = useDashboard();

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
      <LayoutDashboard>
        {submenuPage === "analytics 1" &&
          (user?.role_name === "admin" ? (
            <div>Dashboard Admin</div>
          ) : user?.role_name === "customer" ? (
            <div>Dashboard Customer</div>
          ) : (
            <div>Dashboard Who</div>
          ))}
        {submenuPage === "analytics 2" && <Analytics />}
      </LayoutDashboard>
    </>
  );
}

export default Dashboard;
