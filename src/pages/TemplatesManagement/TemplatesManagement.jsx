import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import TempPages from "./TempPages/TempPages";
import TempSections from "./TempSections/TempSections";
import TempColors from "./TempColors/TempColors";
import TempFonts from "./TempFonts/TempFonts";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { useDataToken } from "../../helpers/DataToken";
import { Error401, Error403 } from "../Error/Error";

function TemplatesManagement() {
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
          {submenuPage === "overview" && <span>test</span>}
          {submenuPage === "pages" && <TempPages />}
          {submenuPage === "sections" && <TempSections />}
          {submenuPage === "colors" && <TempColors />}
          {submenuPage === "fonts" && <TempFonts />}
        </LayoutDashboard>
      )}
    </>
  );
}

export default TemplatesManagement;
