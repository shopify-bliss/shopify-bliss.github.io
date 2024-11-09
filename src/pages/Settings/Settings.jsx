import React from "react";
import { Settings } from "lucide-react";
import Layout from "../../components/Layout/Layout";

function ControllSettings() {
  return (
    <>
      <Layout>
        <div className="settings">
          <div className="settings-header">
            <div className="menu">
              <div className="icon">
                <Settings strokeWidth={1.5} size={28} />
              </div>
              <div className="title">Settings</div>
              <div className="desc">Overview All Component</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ControllSettings;
