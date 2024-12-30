import React from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import TempPages from "./TempPages/TempPages";
import TempSections from "./TempSections/TempSections";
import TempColors from "./TempColors/TempColors";
import TempFonts from "./TempFonts/TempFonts";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";

function TemplatesManagement() {
  const { submenuPage } = useDashboard();

  return (
    <>
      <LayoutDashboard>
        {submenuPage === "overview" && <span>test</span>}
        {submenuPage === "pages" && <TempPages />}
        {submenuPage === "sections" && <TempSections />}
        {submenuPage === "colors" && <TempColors />}
        {submenuPage === "fonts" && <TempFonts />}
      </LayoutDashboard>
    </>
  );
}

export default TemplatesManagement;
