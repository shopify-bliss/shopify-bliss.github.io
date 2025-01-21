import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { MenuManSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function MenuManModal({ type, onOpen, onClose, refreshData, menuId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    name: "",
    url: "",
  });
  const [isDevelopValue, setIsDevelopValue] = useState(true);

  const { toastMessage, toastPromise, token } = useDashboard();

  const statusInsert = useRef(false);
  const statusUpdate = useRef(false);

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        name: "",
        url: "",
      });
      setIsDevelopValue(true);
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.menusId}?id=${menuId}`)
        .then((res) => {
          setData(res.data.data[0]);
          setIsDevelopValue(res.data.data[0].is_develope);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
    }
  }, [onOpen, type, menuId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        const insertData = {
          name: data.name,
          url: data.url,
          isDevelope: isDevelopValue,
        };

        MenuManSchema.validate(insertData, { abortEarly: false })
          .then(() => {
            const menuManPromise = axios.post(urlEndpoint.menus, insertData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            menuManPromise.then((res) => {
              statusInsert.current = res.data.success;
            });

            toastPromise(
              menuManPromise,
              {
                pending: "Adding menu data on progress, please wait..!",
                success: "Data has been successfully added!",
                error: "Failed to add data!",
              },
              {
                autoClose: 2500,
                position: "top-center",
              },
              () => {
                if (statusInsert.current === true) {
                  onClose();
                  refreshData();
                }
              }
            );

            menuManPromise.catch((error) => {
              console.error("Error adding menu data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        const updateData = {
          name: data.name,
          url: data.url,
          isDevelope: isDevelopValue,
        };

        MenuManSchema.validate(updateData, { abortEarly: false })
          .then(() => {
            const menuManPromise = axios.put(
              `${urlEndpoint.menus}?id=${menuId}`,
              updateData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            menuManPromise.then((res) => {
              statusUpdate.current = res.data.success;
            });

            toastPromise(
              menuManPromise,
              {
                pending: "Updating menu data on progress, please wait..!",
                success: "Data has been successfully updated!",
                error: "Failed to update data!",
              },
              {
                autoClose: 2500,
                position: "top-center",
              },
              () => {
                if (statusUpdate.current === true) {
                  onClose();
                  refreshData();
                }
              }
            );

            menuManPromise.catch((error) => {
              console.error("Error updating menu data:", error);
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
      data,
      isDevelopValue,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      menuId,
      token,
      type,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(`${urlEndpoint.menus}?id=${menuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastPromise(
        deletePromise,
        {
          pending: "deleting menu data on progress, please wait..!",
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
        console.error("Error deleting menu data:", error);
      });
    },
    [menuId, token, onClose, refreshData, toastPromise]
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
            type === "create" ? "Insert Menu Data" : "Update Menu Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <label htmlFor="name">
                Menu name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Access Management"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="modal-dashboard-form-group">
              <label htmlFor="url">
                Menu url <span>(Required)</span>
              </label>
              <input
                type="text"
                id="url"
                name="url"
                placeholder="access-management"
                value={data.url}
                onChange={handleChange}
              />
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Setting Is Develope <span>(Required)</span>
              </div>
              <div
                className="check-option"
                onClick={() => setIsDevelopValue(!isDevelopValue)}
              >
                <span className="material-symbols-outlined">
                  {isDevelopValue ? "circle" : "task_alt"}
                </span>
                <div className="text">
                  {isDevelopValue ? "Progress" : "Done"}
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

MenuManModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  menuId: PropTypes.string,
};

export default MenuManModal;
