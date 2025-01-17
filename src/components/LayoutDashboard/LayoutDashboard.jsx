import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import PropTypes from "prop-types";

export const LayoutDashboard = ({ children }) => {
  return (
    <div className="layout-dashboard">
      <Sidebar />
      <Topbar />
      <div className="layout-dashboard-content">{children}</div>
    </div>
  );
};

LayoutDashboard.propTypes = {
  children: PropTypes.node,
};

export default LayoutDashboard;
