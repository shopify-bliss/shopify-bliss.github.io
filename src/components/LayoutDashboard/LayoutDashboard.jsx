import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import SmoothScroll from "../../helpers/SmoothScroll";

function LayoutDashboard({ children }) {
  return (
    <>
      <div className="layout-dashboard">
        <Sidebar />
        <Topbar />
        <div className="layout-dashboard-content">{children}</div>
      </div>
    </>
  );
}

export default LayoutDashboard;
