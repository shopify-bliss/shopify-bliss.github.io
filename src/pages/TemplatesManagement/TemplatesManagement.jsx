import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import TempPages from "./TempPages/TempPages";
import TempSections from "./TempSections/TempSections";
import TempColors from "./TempColors/TempColors";
import TempFonts from "./TempFonts/TempFonts";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { getToken, decodedToken } from "../../helpers/DataToken";
import { Error401 } from "../Error/Error";

function TemplatesManagement() {
  const { submenuPage } = useDashboard();

  return (
    <>
      {getToken && decodedToken.role === "admin" ? (
        <LayoutDashboard>
          {submenuPage === "overview" && <span>test</span>}
          {submenuPage === "pages" && <TempPages />}
          {submenuPage === "sections" && <TempSections />}
          {submenuPage === "colors" && <TempColors />}
          {submenuPage === "fonts" && <TempFonts />}
        </LayoutDashboard>
      ) : (
        <Error401 />
      )}
    </>
  );
}

export default TemplatesManagement;
