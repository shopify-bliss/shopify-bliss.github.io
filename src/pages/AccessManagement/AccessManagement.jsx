import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error403 } from "../Error/Error";
import MenuMan from "./MenuMan/MenuMan";
import SubmenuMan from "./SubmenuMan/SubmenuMan";

function AccessManagement() {
  const { submenuPage } = useDashboard();
  const { decoded } = useDataToken();

  return (
    <>
      {decoded?.role !== "admin" ? (
        <Error403 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "access" && <div>Access Management</div>}
          {submenuPage === "menu" && <MenuMan />}
          {submenuPage === "submenu" && <SubmenuMan />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default AccessManagement;
