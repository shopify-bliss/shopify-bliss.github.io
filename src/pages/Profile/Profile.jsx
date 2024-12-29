import React, { useEffect, useState, useCallback } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password";
import Bio from "./Bio";
import { useLocation, useNavigate } from "react-router-dom";
import { Error401 } from "../Error/Error";
import { useDataToken } from "../../helpers/DataToken";

function Profile({ onClose, onOpen }) {
  if (!onOpen) return null;

  const {
    toastMessage,
    toastPromise,
    isLoading,
    submenus,
    submenuPage,
    handleSubmenuPage,
  } = useDashboard();
  const [currentSubmenu, setCurrentSubmenu] = useState(
    submenus.filter(
      (submenu) =>
        submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
        submenu.default === true
    )[0].name
  );

  const location = useLocation();
  const navigate = useNavigate();

  const { token, decoded } = useDataToken();

  const handleCurrentSubmenu = useCallback((name) => {
    setCurrentSubmenu(name);
  }, []);

  useEffect(() => {
    console.log(submenuPage);
  }, [submenuPage]);

  if (!token) return <Error401 />;

  return (
    <>
      <div className="overlay-modal-menu" onClick={onClose}>
        <div
          className="modal-menu"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-menu-nav">
            <div className="modal-menu-nav-title">Menu</div>
            {submenus
              .filter(
                (submenu) =>
                  submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311"
              )
              .map((submenu) => {
                return (
                  <div
                    key={submenu.sub_menu_id}
                    className={`modal-menu-nav-item ${
                      submenu.name === currentSubmenu ? "active" : ""
                    }`}
                    onClick={() => handleCurrentSubmenu(submenu.name)}
                  >
                    <div className="name">{submenu.name}</div>
                    <div className="border-effect"></div>
                  </div>
                );
              })}
          </div>
          <div className="modal-menu-content">
            <div className="header">
              <span className="header-title">
                Profile — {currentSubmenu === "bio" ? "Bio" : "Password"}
              </span>
              <span
                className="header-close material-symbols-outlined"
                onClick={onClose}
              >
                close
              </span>
            </div>
            {currentSubmenu === "bio" ? <Bio /> : <Password />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
