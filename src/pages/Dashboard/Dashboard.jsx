import React, { useEffect } from "react";
import LayoutDashboard from "../../components/LayoutDashboard/LayoutDashboard";
import { getToken } from "../../helpers/GetToken";

function Dashboard() {
  useEffect(() => {
    console.log(getToken);
  }, []);

  return (
    <LayoutDashboard>
      <div className="dashboard">Dashboard</div>
    </LayoutDashboard>
  );
}

export default Dashboard;
