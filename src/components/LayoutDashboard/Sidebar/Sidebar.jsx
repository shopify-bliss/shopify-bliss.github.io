import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDashboard } from "../DashboardContext";

function Sidebar() {
  const { menus, accessMenus, user } = useDashboard();

  return (
    <div className="layout-dashboard-sidebar">
      {menus.map((data) => {
        const accessibleMenus = accessMenus.filter(
          (dataAccess) =>
            dataAccess.role_id === user?.role_id &&
            dataAccess.menu_id === data.menu_id &&
            data.menu_id !== "6556df8f-7cd6-4848-b39f-1e6ab4973311"
        );

        return (
          <Fragment key={data.menu_id}>
            {accessibleMenus.map((access) => (
              <NavLink
                to={`/${data.url}`}
                className="sidebar-list"
                key={access.access_id}
              >
                <div className="sidebar-list-item">{data.name}</div>
                <div className="border-effect"></div>
              </NavLink>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Sidebar;
