import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../helpers/AuthContext";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { AccessManSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function AccessManModal({
  type,
  onOpen,
  onClose,
  refreshData,
  accessId,
  roles,
}) {
  axios.defaults.withCredentials = true;

  const [openMenu, setOpenMenu] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [valueMenu, setValueMenu] = useState("");
  const [valueRole, setValueRole] = useState("");

  const listMenuRef = useRef(null);
  const listRoleRef = useRef(null);

  const { toastMessage, toastPromise, menus } = useDashboard();
  const { token } = useAuth();

  const handleClickOutside = useCallback(
    (e) => {
      if (listMenuRef.current && !listMenuRef.current.contains(e.target)) {
        setOpenMenu(false);
      } else if (
        listRoleRef.current &&
        !listRoleRef.current.contains(e.target)
      ) {
        setOpenRole(false);
      }
    },
    [listMenuRef, listRoleRef]
  );

  useEffect(() => {
    if (openMenu || openRole) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, openRole, handleClickOutside]);

  useEffect(() => {
    if (onOpen && type === "create") {
      setValueRole("");
      setValueMenu("");
    }
  }, [onOpen, type]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        menuID: valueMenu,
        roleID: valueRole,
      };

      console.log(data);

      AccessManSchema.validate(data, { abortEarly: false })
        .then(() => {
          const elementsAiPromise = axios.post(
            urlEndpoint.accessManagement,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toastPromise(
            elementsAiPromise,
            {
              pending: "Adding access data on progress, please wait..!",
              success: "Data has been successfully added!",
              error: "Failed to add data!",
            },
            {
              autoClose: 2500,
              position: "top-center",
            },
            () => {
              onClose();
              refreshData();
            }
          );
          elementsAiPromise.catch((error) => {
            console.error("Error adding access data:", error);
          });
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            toastMessage("error", error.message);
          });
        });
    },
    [
      AccessManSchema,
      valueRole,
      valueMenu,
      onClose,
      refreshData,
      token,
      accessId,
      toastMessage,
      toastPromise,
      urlEndpoint.accessManagement,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.accessManagement}?id=${accessId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting access data on progress, please wait..!",
          success: "Data has been successfully deleted!",
          error: "Failed to delete data!",
        },
        {
          autoClose: 2500,
          position: "top-center",
        },
        () => {
          onClose();
          refreshData();
        }
      );

      deletePromise.catch((error) => {
        console.error("Error deleting access data:", error);
      });
    },
    [
      token,
      toastPromise,
      accessId,
      onClose,
      refreshData,
      urlEndpoint.accessManagement,
    ]
  );

  return (
    <>
      {type === "delete" ? (
        <Modal
          onClose={onClose}
          onOpen={onOpen}
          type="confirm"
          titleModal={"Are you sure you want to delete this?"}
          descModal={
            "Your content will be permanently deleted. This can't be undone."
          }
        >
          <div className="confirm-dashboard-action">
            <div className="cancel" onClick={onClose}>
              cancel
            </div>
            <div className="confirm" onClick={handleDelete}>
              delete
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          titleModal="Insert Access Data"
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Role <span>(Required)</span>
              </div>
              <div className="select-default" onClick={() => setOpenRole(true)}>
                <div className="text">
                  {valueRole === ""
                    ? "Choose Role"
                    : roles
                        .filter((item) => item.role_id === valueRole)
                        .map((data) => data.role_name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openRole ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openRole && (
                <div className="select-list no-more" ref={listRoleRef}>
                  {roles
                    .filter((item) => item.role_id !== valueRole)
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.role_id}
                          onClick={() => {
                            setValueRole(data.role_id);
                            setOpenRole(false);
                          }}
                        >
                          <div className="name">{data.role_name}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Menu <span>(Required)</span>
              </div>
              <div className="select-default" onClick={() => setOpenMenu(true)}>
                <div className="text">
                  {valueMenu === ""
                    ? "Choose Menu"
                    : menus
                        .filter((item) => item.menu_id === valueMenu)
                        .map((data) => data.name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openMenu ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openMenu && (
                <div className="select-list" ref={listMenuRef}>
                  {menus
                    .filter((item) => item.menu_id !== valueMenu)
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.menu_id}
                          onClick={() => {
                            setValueMenu(data.menu_id);
                            setOpenMenu(false);
                          }}
                        >
                          <div className="name">{data.name}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AccessManModal;
