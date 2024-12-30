import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import { Error401, Error403 } from "../../pages/Error/Error";
import { useAuth } from "../../helpers/AuthContext";
import { useDashboard } from "./DashboardContext";

function LayoutDashboard({ children }) {
  const { token } = useAuth();
  const { accessMenus, user } = useDashboard();

  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasValidated = useRef(false);

  useEffect(() => {
    if (token && user && !hasValidated.current) {
      hasValidated.current = true;

      const isValid = accessMenus.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "e0c2b209-08c0-4c8b-ae0d-77f86b088879"
      );

      setTimeout(() => {
        setValidation(isValid);
        setLoading(false);
      }, 1500);
    }
  }, [token, user, accessMenus]);

  if (!token) return <Error401 />;
  if (loading)
    return (
      <div className="loader-pages">
        <div className="loader-pages-item"></div>
      </div>
    );
  if (!validation) return <Error403 />;

  return (
    <div className="layout-dashboard">
      <Sidebar />
      <Topbar />
      <div className="layout-dashboard-content">{children}</div>
    </div>
  );
}

export default LayoutDashboard;
