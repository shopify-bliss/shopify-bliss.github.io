import { useState, useEffect, useCallback, useRef } from "react";
import { Logo } from "../../AiBuilderSupport/AiBuilderSupport";
import { useDashboard } from "../DashboardContext";
import { useNavigate, Link } from "react-router-dom";
import Profile from "../../../pages/Profile/Profile";
import Cookies from "js-cookie";

function Topbar() {
  const [isAccountModal, setIsAccountModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);

  const modalRef = useRef(null);

  const {
    submenus,
    activeMenu,
    handleSubmenuPage,
    submenuPage,
    toastDevelop,
    menus,
    user,
    token,
  } = useDashboard();
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
  }, [isAccountModal, handleOutsideModal]);

  const handleLogout = useCallback(() => {
    if (token) {
      Cookies.remove("shopify-bliss");
      navigate("/login", { state: { messageLogout: "Logout successfully!" } });
    }
  }, [token, navigate]);

  return (
    <>
      <div className="layout-dashboard-topbar">
        <Logo />
        <div className="links">
          {submenus
            .filter(
              (submenu) =>
                submenu.menu_id === activeMenu && submenu.is_develope === false
            )
            .map((submenu) => {
              return (
                <div
                  key={submenu.sub_menu_id}
                  className={`links-item ${
                    submenu.sub_menu_id === submenuPage ? "active" : ""
                  }`}
                  onClick={() => handleSubmenuPage(submenu.sub_menu_id)}
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
          <div
            className="config-account"
            onClick={() => setIsAccountModal(true)}
          >
            <div className="text">Account Setting</div>
            <img src={`/avatar/${user?.avatar}`} alt="Profile image's" />
          </div>
          {isAccountModal ? (
            <div className="account-modal" ref={modalRef}>
              <div className="account-modal-profile">
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
              </div>
              {menus
                .filter(
                  (menu) =>
                    menu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311"
                )
                .map((menu) => {
                  return (
                    <Link
                      className="account-modal-item"
                      key={menu.menu_id}
                      onClick={() => {
                        setIsProfileModal(true);
                        setIsAccountModal(false);
                      }}
                    >
                      {menu.name}
                    </Link>
                  );
                })}
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
      {isProfileModal ? (
        <Profile
          onOpen={isProfileModal}
          onClose={() => setIsProfileModal(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Topbar;
