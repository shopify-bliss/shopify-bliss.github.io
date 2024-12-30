import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password";
import Bio from "./Bio";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import Modal from "../../components/LayoutDashboard/Modal/Modal";
import Verify from "./Verify";

function Profile({ onClose, onOpen }) {
  if (!onOpen) return null;

  const { submenus } = useDashboard();

  const [currentSubmenu, setCurrentSubmenu] = useState(
    submenus.filter(
      (submenu) =>
        submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
        submenu.default === true
    )[0].sub_menu_id
  );
  const [openConfirm, setOpenConfirm] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useAuth();

  const handleCurrentSubmenu = useCallback(
    (submenuId) => {
      if (
        submenuId === "d86578b0-4497-4d43-bdad-0f50af1011aa" &&
        !resetPassword
      ) {
        setOpenConfirm(true);
      } else {
        setCurrentSubmenu(submenuId);
      }
    },
    [resetPassword]
  );

  // useEffect(() => {
  //   console.log(resetPassword);
  // }, [resetPassword]);

  return (
    <>
      <div
        className="overlay-modal-menu"
        onClick={() => {
          onClose();
          setResetPassword(false);
        }}
      >
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
                  submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
                  submenu.sub_menu_id !== "a14736d9-7bcc-4eef-9be3-2015223cc5ed"
              )
              .map((submenu) => {
                return (
                  <>
                    <div
                      key={submenu.sub_menu_id}
                      className={`modal-menu-nav-item ${
                        submenu.sub_menu_id === currentSubmenu ? "active" : ""
                      }`}
                      onClick={() => handleCurrentSubmenu(submenu.sub_menu_id)}
                    >
                      <div className="name">{submenu.name}</div>
                      <div className="border-effect"></div>
                    </div>
                  </>
                );
              })}
            {resetPassword && (
              <>
                {submenus
                  .filter(
                    (submenu) =>
                      submenu.menu_id ===
                        "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
                      submenu.sub_menu_id ===
                        "a14736d9-7bcc-4eef-9be3-2015223cc5ed"
                  )
                  .map((submenu) => {
                    return (
                      <>
                        <div
                          key={submenu.sub_menu_id}
                          className={`modal-menu-nav-item ${
                            submenu.sub_menu_id === currentSubmenu
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleCurrentSubmenu(submenu.sub_menu_id)
                          }
                        >
                          <div className="name">{submenu.name}</div>
                          <div className="border-effect"></div>
                        </div>
                      </>
                    );
                  })}
              </>
            )}
          </div>
          <div className="modal-menu-content">
            <div className="header">
              <span className="header-title">
                Profile —{" "}
                {currentSubmenu === "0977a7d1-7ee9-4b68-8e3d-edad0ef87a56"
                  ? "Bio"
                  : currentSubmenu === "d86578b0-4497-4d43-bdad-0f50af1011aa"
                  ? "Password"
                  : "Verify OTP"}
              </span>
              <span
                className="header-close material-symbols-outlined"
                onClick={onClose}
              >
                close
              </span>
            </div>
            {currentSubmenu === "0977a7d1-7ee9-4b68-8e3d-edad0ef87a56" ? (
              <Bio onClose={() => setOpenConfirm(false)} />
            ) : currentSubmenu === "d86578b0-4497-4d43-bdad-0f50af1011aa" &&
              resetPassword ? (
              <Password />
            ) : (
              <Verify />
            )}
          </div>
        </div>
      </div>
      <Modal
        type="confirm"
        titleModal="Are you sure you want to reset password?"
        descModal="If you sure want to change your password, please check your email for a verification code."
        onClose={() => {
          setOpenConfirm(false);
          setResetPassword(false);
        }}
        onOpen={openConfirm}
      >
        <div className="confirm-dashboard-action">
          <div
            className="cancel"
            onClick={() => {
              setOpenConfirm(false);
              setResetPassword(false);
            }}
          >
            cancel
          </div>
          <div
            className="confirm"
            onClick={() => {
              setOpenConfirm(false);
              setResetPassword(true);
              setCurrentSubmenu("a14736d9-7bcc-4eef-9be3-2015223cc5ed");
            }}
          >
            reset
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Profile;
