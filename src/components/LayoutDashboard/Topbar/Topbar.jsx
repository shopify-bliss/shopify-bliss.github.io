import React from "react";
import logo from "../../../assets/logo/black_logo_nobg.png";

function Topbar() {
  return (
    <div className="layout-dashboard-topbar">
      <div className="logo">
        <img className="image" src={logo} alt="Shopify Bliss Logo" />
        <div className="text">Shopify Bliss</div>
      </div>
      <div className="links">
        <div className="links-item">Testing 1</div>
        <div className="links-item">Testing 2</div>
        <div className="links-item">Testing 3</div>
      </div>
      <div className="others">
        <div className="others-icons">
          <div className="message"></div>
          <div className="notif"></div>
        </div>
        <div className="others-config"></div>
      </div>
      <div>Topbar</div>
    </div>
  );
}

export default Topbar;
