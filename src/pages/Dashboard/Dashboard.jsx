import React, { useEffect, useState } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import { useDataToken } from "../../helpers/DataToken";
import { Error403, Error401 } from "../Error/Error";
import Analytics from "./Analytics/Analytics";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const [validation, setValidation] = useState(false);

  const { submenuPage, toastMessage, accessMenus } = useDashboard();
  const { decoded, token } = useDataToken();

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

  useEffect(() => {
    const toValidate = accessMenus.filter(
      (data) =>
        data.role === decoded?.role &&
        data.menu_id === "702fe74b-5891-4207-89d1-76d6d91766eb"
    );

    if (toValidate.length > 0) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [accessMenus, decoded]);

  if (!token) return <Error401 />;

  return (
    <>
      {validation ? (
        <LayoutDashboard>
          {submenuPage === "analytics 1" && decoded?.role === "admin" ? (
            <div>Dashboard Admin</div>
          ) : decoded?.role === "customer" ? (
            <div>Dashboard Customer</div>
          ) : (
            <div>Dashboard Who</div>
          )}
          {submenuPage === "analytics 2" && <Analytics />}
        </LayoutDashboard>
      ) : (
        <Error403 />
      )}
    </>
  );
}

export default Dashboard;
