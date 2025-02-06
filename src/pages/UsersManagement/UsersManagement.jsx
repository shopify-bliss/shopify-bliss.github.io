import { useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import DisplayUsers from "./DisplayUsers/DisplayUsers";
import { useNavigate } from "react-router-dom";

function UsersManagement() {
  const { submenuPage, accessMenus, user } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "3e1f3895-691f-4962-af43-225d73cfcf91"
      );

      if (hasAccess === false) {
        navigate("/403", { replace: true });
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [accessMenus, user, navigate]);

  return (
    <>
      <LayoutDashboard>
        {submenuPage === "c4f884b7-f98a-40a9-a436-ad293b13d565" && (
          <DisplayUsers />
        )}
      </LayoutDashboard>
    </>
  );
}

export default UsersManagement;
