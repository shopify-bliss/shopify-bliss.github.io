import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import DisplayUsers from "./DisplayUsers/DisplayUsers";

function UsersManagement() {
  const { submenuPage } = useDashboard();

  return (
    <>
      <LayoutDashboard>
        {submenuPage === "display data" && <DisplayUsers />}
      </LayoutDashboard>
    </>
  );
}

export default UsersManagement;
