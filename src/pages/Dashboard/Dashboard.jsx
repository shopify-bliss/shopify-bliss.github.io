import React from "react";
import { LayoutDashboard } from "lucide-react";
import Layout from "../../components/Layout/Layout";

function Dashboard() {
  return (
    <>
      <Layout>
        <div className="dashboard">
          <div className="dashboard-header">
            <div className="menu">
              <div className="icon">
                <LayoutDashboard strokeWidth={1.5} size={28} />
              </div>
              <div className="title">Dashboard</div>
              <div className="desc">Overview All Component</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
