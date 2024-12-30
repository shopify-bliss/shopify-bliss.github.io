import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import MenuMan from "./MenuMan/MenuMan";
import SubmenuMan from "./SubmenuMan/SubmenuMan";
import AccessMan from "./AccessMan/AccessMan";
import RoleMan from "./RoleMan/RoleMan";

function AccessManagement() {
  const { submenuPage } = useDashboard();

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
