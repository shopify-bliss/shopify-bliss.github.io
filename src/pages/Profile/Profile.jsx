import { useState, useCallback } from "react";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import Password from "./Password";
import Bio from "./Bio";
import Modal from "../../components/LayoutDashboard/Modal/Modal";
import axios from "axios";
import PropTypes from "prop-types";

function Profile({ onClose, onOpen }) {
  axios.defaults.withCredentials = true;

  const { submenus } = useDashboard();

  const [currentSubmenu, setCurrentSubmenu] = useState(
    submenus.filter(
      (submenu) =>
        submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311" &&
        submenu.default === true
    )[0].sub_menu_id
  );
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCurrentSubmenu = useCallback((submenuId) => {
    if (submenuId === "d86578b0-4497-4d43-bdad-0f50af1011aa") {
      setOpenConfirm(true);
    } else {
      setCurrentSubmenu(submenuId);
    }
  }, []);

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
                  submenu.menu_id === "6556df8f-7cd6-4848-b39f-1e6ab4973311"
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
          </div>
          <div className="modal-menu-content">
            <div className="header">
              <span className="header-title">
                Profile —{" "}
                {currentSubmenu === "0977a7d1-7ee9-4b68-8e3d-edad0ef87a56"
                  ? "Bio"
                  : currentSubmenu === "d86578b0-4497-4d43-bdad-0f50af1011aa"
                  ? "Password"
                  : "Submenu not found"}
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
              currentSubmenu === "d86578b0-4497-4d43-bdad-0f50af1011aa" ? (
              <Password />
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        type="confirm"
        titleModal="Are you sure you want to reset password?"
        descModal="Proceed to the next step to change your password."
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
          <div
            className="confirm"
            onClick={() => {
              setCurrentSubmenu("d86578b0-4497-4d43-bdad-0f50af1011aa");
              setOpenConfirm(false);
            }}
          >
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
