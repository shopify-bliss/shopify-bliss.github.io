import { useEffect } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Analytics from "./Analytics/Analytics";
import { useLocation, useNavigate } from "react-router-dom";
import Accumulation from "./Accumulation/Accumulation";

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
        {submenuPage === "09e64f50-c6c3-4366-9d31-6d8e16f6a54f" &&
          (user?.roles?.role_name === "super admin" ? (
            <>
              <Accumulation />
            </>
          ) : user?.roles?.role_name === "admin" ? (
            <>
              <Accumulation />
            </>
          ) : user?.roles?.role_name === "developer" ? (
            <>
              <Accumulation />
            </>
          ) : (
            <div>Dashboard Customer</div>
          ))}
        {submenuPage === "b8b986b7-46e2-4127-97f8-f3ffae7c7180" && (
          <Analytics />
        )}
      </LayoutDashboard>
    </>
  );
}

export default Dashboard;
