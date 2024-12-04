import React from "react";
import { Logo } from "../../AiBuilderSupport/AiBuilderSupport";
import { useDashboard } from "../DashboardContext";
import profileImage from "../../../assets/images/elements/intro/pexels-alancabello-1291515.jpg";

function Topbar() {
  const { submenu, activeMenu, handleSubmenuPage, submenuPage } =
    useDashboard();

  return (
    <div className="layout-dashboard-topbar">
      <Logo />
      <div className="links">
        {submenu
          .filter((menu) => menu.menu_id === activeMenu)
          .map((submenu) => {
            return (
              <div
                key={submenu.id}
                className={`links-item ${
                  submenu.name === submenuPage ? "active" : ""
                }`}
                onClick={() => handleSubmenuPage(submenu.name)}
              >
                {submenu.name}
              </div>
            );
          })}
      </div>
      <div className="config">
        <div className="config-help">Help</div>
        <div className="config-account">
          <div className="text">Account Setting</div>
          <img src={profileImage} alt="Profile image's" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
