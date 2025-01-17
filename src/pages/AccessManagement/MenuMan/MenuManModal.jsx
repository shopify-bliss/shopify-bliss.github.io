import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { MenuManSchema } from "../../../helpers/ValidationSchema.js";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function MenuManModal({ type, onOpen, onClose, refreshData, menuId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    name: "",
    url: "",
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        name: "",
        url: "",
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.menusId}?id=${menuId}`)
        .then((res) => {
          setData(res.data.data[0]);
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
        MenuManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.post(urlEndpoint.menus, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              elementsAiPromise,
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
                onClose();
                refreshData();
              }
            );

            elementsAiPromise.catch((error) => {
              console.error("Error adding menu data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        MenuManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.put(
              `${urlEndpoint.menus}?id=${menuId}`,
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
                pending: "Updating menu data on progress, please wait..!",
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
  menuId: PropTypes.number,
};

export default MenuManModal;
