import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error403 } from "../Error/Error";

function UsersManagement() {
  const { submenuPage } = useDashboard();
  const { decoded } = useDataToken();

  return (
    <>
      {decoded?.role !== "admin" ? (
        <Error403 />
      ) : (
        <LayoutDashboard>
          {submenuPage === "display data" && <div>Users Management</div>}
        </LayoutDashboard>
      )}
    </>
  );
}

export default UsersManagement;
