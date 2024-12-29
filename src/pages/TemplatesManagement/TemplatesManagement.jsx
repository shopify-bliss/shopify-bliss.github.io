import React, { useState, useEffect } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import TempPages from "./TempPages/TempPages";
import TempSections from "./TempSections/TempSections";
import TempColors from "./TempColors/TempColors";
import TempFonts from "./TempFonts/TempFonts";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error403, Error401 } from "../Error/Error";

function TemplatesManagement() {
  const [validation, setValidation] = useState(false);

  const { submenuPage, accessMenus } = useDashboard();
  const { decoded, token } = useDataToken();

  useEffect(() => {
    const toValidate = accessMenus.filter(
      (data) =>
        data.role === decoded?.role &&
        data.menu_id === "e0c2b209-08c0-4c8b-ae0d-77f86b088879"
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
          {submenuPage === "overview" && <span>test</span>}
          {submenuPage === "pages" && <TempPages />}
          {submenuPage === "sections" && <TempSections />}
          {submenuPage === "colors" && <TempColors />}
          {submenuPage === "fonts" && <TempFonts />}
        </LayoutDashboard>
      ) : (
        <Error403 />
      )}
    </>
  );
}

export default TemplatesManagement;
