import React, { useState, useEffect, useCallback, useRef } from "react";
import { Logo } from "../../AiBuilderSupport/AiBuilderSupport";
import { useDashboard } from "../DashboardContext";
import profileImage from "../../../assets/images/elements/intro/pexels-alancabello-1291515.jpg";
import Cookies from "universal-cookie";
import { useDataToken } from "../../../helpers/DataToken";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [isAccountModal, setIsAccountModal] = useState(false);
  const modalRef = useRef(null);

  const { submenu, activeMenu, handleSubmenuPage, submenuPage, toastDevelop } =
    useDashboard();
  const { token, decoded } = useDataToken();

  const navigate = useNavigate();

  const handleOutsideModal = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsAccountModal(false);
      }
    },
    [modalRef]
  );

  useEffect(() => {
    if (isAccountModal) {
      document.addEventListener("mousedown", handleOutsideModal);
    } else {
      document.removeEventListener("mousedown", handleOutsideModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideModal);
    };
  }, [isAccountModal]);

  const handleLogout = useCallback(() => {
    if (token) {
      const cookies = new Cookies();

      cookies.remove("shopify-bliss");
      navigate("/login", { state: { messageLogout: "Logout successfully!" } });
    }
  }, [token]);

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
        <div
          className="config-help"
          onClick={() => {
            toastDevelop("help");
          }}
        >
          Help
        </div>
        <div className="config-account" onClick={() => setIsAccountModal(true)}>
          <div className="text">Account Setting</div>
          <img src={profileImage} alt="Profile image's" />
        </div>
        {isAccountModal ? (
          <div className="account-modal" ref={modalRef}>
            <div className="account-modal-profile">
              <div className="username">{decoded.username}</div>
              <div className="email">{decoded.email}</div>
            </div>
            <div
              className="account-modal-item"
              onClick={() => {
                toastDevelop("notifications");
              }}
            >
              Notifications
            </div>
            <div
              className="account-modal-item"
              onClick={() => {
                toastDevelop("language");
              }}
            >
              Language
            </div>
            <div className="account-modal-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Topbar;
