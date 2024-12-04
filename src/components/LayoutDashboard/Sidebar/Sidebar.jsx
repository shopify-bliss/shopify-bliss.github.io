import React from "react";
import { NavLink } from "react-router-dom";
import { useDashboard } from "../DashboardContext";
import { useDataToken } from "../../../helpers/DataToken";

function Sidebar() {
  const { menu, accessMenu } = useDashboard();
  const { decoded } = useDataToken();

  return (
    <div className="layout-dashboard-sidebar">
      {menu.map((dataMenu) => {
        const accessibleMenus = accessMenu.filter(
          (dataAccess) =>
            dataAccess.role === decoded?.role &&
            dataAccess.accessMenu === dataMenu.id
        );

        return accessibleMenus.map((access) => (
          <NavLink
            to={`/${dataMenu.url}`}
            className="sidebar-list"
            key={access.id}
          >
            <div className="sidebar-list-item">{dataMenu.name}</div>
            <div className="border-effect"></div>
          </NavLink>
        ));
      })}
    </div>
  );
}

export default Sidebar;
