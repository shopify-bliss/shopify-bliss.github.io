import { useState, useCallback } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password";
import Bio from "./Bio";
import Modal from "../../components/LayoutDashboard/Modal/Modal";
import VerifyDashboard from "./VerifyDashboard";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import PropTypes from "prop-types";

function Profile({ onClose, onOpen }) {
  axios.defaults.withCredentials = true;

  const [currentSubmenu, setCurrentSubmenu] = useState(
    submenus.filter(
      (submenu) =>
        submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
        submenu.default === true
    )[0].sub_menu_id
  );
  const [openConfirm, setOpenConfirm] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const { submenus, toastPromise, user } = useDashboard();

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

  const handleConfirmReset = useCallback(
    (e) => {
      e.preventDefault();

      setCurrentSubmenu("a14736d9-7bcc-4eef-9be3-2015223cc5ed");

      const sendOtpPasswordPromise = axios.post(urlEndpoint.sendOtpPassword, {
        email: user.email,
      });

      toastPromise(
        sendOtpPasswordPromise,
        {
          pending: "Sending OTP password on progress, please wait..!",
          success: "OTP password sent successfully.",
          error: "Failed to send OTP password.",
        },
        {
          position: "top-center",
          autoClose: 2500,
        },
        () => {
          setOpenConfirm(false);
          setResetPassword(true);

          setTimeout(() => {
            setResetPassword(false);
          }, 30000);
        }
      );

      sendOtpPasswordPromise
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [toastPromise, user.email]
  );

  if (!onOpen) return null;

  return (
    <>
      <div
        className="overlay-modal-menu"
        onClick={() => {
          onClose();
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
              <Bio onClose={onClose} />
            ) : currentSubmenu === "d86578b0-4497-4d43-bdad-0f50af1011aa" &&
              resetPassword ? (
              <Password />
            ) : (
              <VerifyDashboard setCurrentSubmenu={setCurrentSubmenu} />
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
        }}
        onOpen={openConfirm}
      >
        <div className="confirm-dashboard-action">
          <div
            className="cancel"
            onClick={() => {
              setOpenConfirm(false);
            }}
          >
            cancel
          </div>
          <div className="confirm" onClick={handleConfirmReset}>
            reset
          </div>
        </div>
      </Modal>
    </>
  );
}

Profile.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default Profile;
