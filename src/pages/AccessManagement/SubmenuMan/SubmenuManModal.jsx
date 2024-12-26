import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDataToken } from "../../../helpers/DataToken";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { SubmenuManSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function SubmenuManModal({ type, onOpen, onClose, refreshData, submenuId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    menuID: "",
    name: "",
    default: false,
  });

  const { toastMessage, toastPromise } = useDashboard();
  const { token } = useDataToken();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        menuID: "",
        name: "",
        default: false,
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.submenusId}?id=${submenuId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data[0]);

          setData(res.data.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching submenu data:", error);
        });
    }
  }, [onOpen, type, submenuId, token, urlEndpoint]);

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
      SubmenuManSchema,
      data,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      submenuId,
      token,
      urlEndpoint,
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
    [submenuId, token, onClose, refreshData]
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
              <label htmlFor="name">
                Submenu name <span>(Required)</span>
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
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default SubmenuManModal;
