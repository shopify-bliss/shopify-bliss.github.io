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
        {submenuPage === "f38556ea-5da9-4eb2-8b8b-dd72b073aba4" && (
          <AccessMan />
        )}
        {submenuPage === "0349079b-d986-43f3-962b-6510c2c8772a" && <MenuMan />}
        {submenuPage === "d06c3224-d2c3-4122-89cc-6c8b42043fb3" && (
          <SubmenuMan />
        )}
        {submenuPage === "2d529de1-847f-493a-b2cf-672eca925729" && <RoleMan />}
      </LayoutDashboard>
    </>
  );
}

export default AccessManagement;
