import { useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import MenuMan from "./MenuMan/MenuMan";
import SubmenuMan from "./SubmenuMan/SubmenuMan";
import AccessMan from "./AccessMan/AccessMan";
import RoleMan from "./RoleMan/RoleMan";
import { useNavigate } from "react-router-dom";

function AccessManagement() {
  const { submenuPage, accessMenus, user } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "b37d4e96-87b0-4480-805e-562ccd798338"
      );

      if (hasAccess === false) {
        navigate("/403", { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [accessMenus, user, navigate]);

  return (
    <>
      <LayoutDashboard>
        {submenuPage === "access" && <AccessMan />}
        {submenuPage === "menu" && <MenuMan />}
        {submenuPage === "submenu" && <SubmenuMan />}
        {submenuPage === "role" && <RoleMan />}
      </LayoutDashboard>
    </>
  );
}

export default AccessManagement;
