import React, { useState, useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error403, Error401 } from "../Error/Error";
import MenuMan from "./MenuMan/MenuMan";
import SubmenuMan from "./SubmenuMan/SubmenuMan";
import AccessMan from "./AccessMan/AccessMan";

function AccessManagement() {
  const [validation, setValidation] = useState(false);

  const { submenuPage, accessMenus } = useDashboard();
  const { decoded, token } = useDataToken();

  useEffect(() => {
    const toValidate = accessMenus.filter(
      (data) =>
        data.role === decoded?.role &&
        data.menu_id === "b37d4e96-87b0-4480-805e-562ccd798338"
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
          {submenuPage === "access" && <AccessMan />}
          {submenuPage === "menu" && <MenuMan />}
          {submenuPage === "submenu" && <SubmenuMan />}
        </LayoutDashboard>
      ) : (
        <Error403 />
      )}
    </>
  );
}

export default AccessManagement;
