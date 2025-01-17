import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { SubmenuManSchema } from "../../../helpers/ValidationSchema.js";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function SubmenuManModal({ type, onOpen, onClose, refreshData, submenuId }) {
  axios.defaults.withCredentials = true;

  const [openMenu, setOpenMenu] = useState(false);
  const [defaultMenu, setDefaultMenu] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);
  const [submenuName, setSubmenuName] = useState("");

  const listMenuRef = useRef(null);

  const { toastMessage, toastPromise, menus, token } = useDashboard();

  const handleClickOutside = useCallback(
    (e) => {
      if (listMenuRef.current && !listMenuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    },
    [listMenuRef]
  );

  useEffect(() => {
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu, handleClickOutside]);

  useEffect(() => {
    if (onOpen && type === "create") {
      setSubmenuName("");
      setDefaultMenu("");
      setDefaultValue(false);
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.submenusId}?id=${submenuId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSubmenuName(res.data.data.name);
          setDefaultMenu(res.data.data.menu_id);
          setDefaultValue(res.data.data.default);
        })
        .catch((error) => {
          console.error("Error fetching submenu data:", error);
        });
    }
  }, [onOpen, type, submenuId, token]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        menuID: defaultMenu,
        name: submenuName,
        defaults: defaultValue,
      };

      if (type === "create") {
        SubmenuManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.post(urlEndpoint.submenus, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            toastPromise(
              elementsAiPromise,
              {
                pending: "Adding submenu data on progress, please wait..!",
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
              console.error("Error adding submenu data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        SubmenuManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.put(
              `${urlEndpoint.submenus}?id=${submenuId}`,
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
                pending: "Updating submenu data on progress, please wait..!",
                success: "Data has been successfully updated!",
                error: "Failed to update data!",
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
              console.error("Error updating submenu data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      }
    },
    [
      type,
      submenuName,
      defaultMenu,
      defaultValue,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      token,
      submenuId,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.submenus}?id=${submenuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting submenu data on progress, please wait..!",
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
        console.error("Error deleting submenu data:", error);
      });
    },
    [token, submenuId, onClose, refreshData, toastPromise]
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
          titleModal={
            type === "create" ? "Insert Submenu Data" : "Update Submenu Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Menu Parent <span>(Required)</span>
              </div>
              <div className="select-default" onClick={() => setOpenMenu(true)}>
                <div className="text">
                  {defaultMenu === ""
                    ? "Select Menu Parent"
                    : menus
                        .filter((item) => item.menu_id === defaultMenu)
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
                    .filter((item) => item.menu_id !== defaultMenu)
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.menu_id}
                          onClick={() => {
                            setDefaultMenu(data.menu_id);
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
            <div className="modal-dashboard-form-group">
              <label htmlFor="name">
                Submenu Name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Analytics XX"
                value={submenuName}
                onChange={(e) => setSubmenuName(e.target.value)}
              />
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Setting Default <span>(Required)</span>
              </div>
              <div
                className="check-default"
                onClick={() => setDefaultValue(!defaultValue)}
              >
                <span className="material-symbols-outlined">
                  {defaultValue ? "task_alt" : "circle"}
                </span>
                <div className="text">{defaultValue ? "True" : "Null"}</div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

SubmenuManModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  submenuId: PropTypes.number,
};

export default SubmenuManModal;
