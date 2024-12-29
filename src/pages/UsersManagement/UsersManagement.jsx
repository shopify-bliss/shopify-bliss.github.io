import React, { useState, useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error403, Error401 } from "../Error/Error";
import DisplayUsers from "./DisplayUsers/DisplayUsers";

function UsersManagement() {
  const [validation, setValidation] = useState(false);

  const { submenuPage, accessMenus } = useDashboard();
  const { decoded, token } = useDataToken();

  useEffect(() => {
    const toValidate = accessMenus.filter(
      (data) =>
        data.role === decoded?.role &&
        data.menu_id === "3e1f3895-691f-4962-af43-225d73cfcf91"
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
          {submenuPage === "display data" && <DisplayUsers />}
        </LayoutDashboard>
      ) : (
        <Error403 />
      )}
    </>
  );
}

export default UsersManagement;
