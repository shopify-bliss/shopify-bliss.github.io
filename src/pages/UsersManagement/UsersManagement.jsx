import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error401, Error403 } from "../Error/Error";

function UsersManagement() {
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
          {submenuPage === "display data" && <div>Users Management</div>}
        </LayoutDashboard>
      )}
    </>
  );
}

export default UsersManagement;
