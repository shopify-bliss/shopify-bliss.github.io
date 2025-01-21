import { useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useNavigate } from "react-router-dom";
import FontFamilies from "./Families/FontFamilies";
import FontDesigns from "./Designs/FontDesignsMan";

function FontsManagement() {
  const { submenuPage, accessMenus, user } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasAccess = accessMenus?.some(
        (data) =>
          data.role_id === user?.role_id &&
          data.menu_id === "9b9a07fd-536c-4bec-9658-b2ad11bd08bd"
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
        {submenuPage === "fbb6b983-c564-4d96-9473-c351194a1359" && (
          <FontFamilies />
        )}
        {submenuPage === "4e57e7b9-8cee-4fb8-bdc8-1211c99b9bec" && (
          <FontDesigns />
        )}
      </LayoutDashboard>
    </>
  );
}

export default FontsManagement;
