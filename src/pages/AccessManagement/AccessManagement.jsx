import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error401, Error403 } from "../Error/Error";
import MenuManagement from "./MenuManagement/MenuManagement";
import SubmenuManagement from "./SubmenuManagement/SubmenuManagement";

function AccessManagement() {
  const { submenuPage } = useDashboard();
  const { token, decoded } = useDataToken();

  return (
    <>
      {!token ? (
        <Error401 />
      ) : decoded?.role !== "admin" ? (
        <Error403 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "access" && <div>Access Management</div>}
          {submenuPage === "menu" && <MenuManagement />}
          {submenuPage === "submenu" && <SubmenuManagement />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default AccessManagement;
