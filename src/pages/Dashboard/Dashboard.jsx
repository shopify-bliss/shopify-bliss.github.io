import React, { useEffect, useState } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Analytics from "./Analytics/Analytics";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const { submenuPage, toastMessage, user, accessMenus } = useDashboard();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "702fe74b-5891-4207-89d1-76d6d91766eb"
      );

      if (hasAccess === false) {
        navigate("/403", { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [accessMenus, user, navigate]);

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
          (user?.roles?.role_name === "super admin" ? (
            <div>Dashboard Super Admin</div>
          ) : user?.roles?.role_name === "admin" ? (
            <div>Dashboard Admin</div>
          ) : user?.roles?.role_name === "customer" ? (
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
