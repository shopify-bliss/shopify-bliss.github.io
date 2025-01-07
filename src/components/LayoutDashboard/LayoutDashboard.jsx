import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

export const LayoutDashboard = ({ children }) => {
  return (
    <div className="layout-dashboard">
      <Sidebar />
      <Topbar />
      <div className="layout-dashboard-content">{children}</div>
    </div>
  );
};

export default LayoutDashboard;
