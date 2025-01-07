import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { RoleManSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function RoleManModal({ type, onOpen, onClose, refreshData, roleId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    roleName: "",
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        roleName: "",
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.roleId}?id=${roleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);

          setData({
            roleName: res.data.data.role_name,
          });
        })
        .catch((error) => {
          console.error("Error fetching role data:", error);
        });
    }
  }, [onOpen, type, roleId, token, urlEndpoint]);

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
        RoleManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.post(urlEndpoint.role, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              elementsAiPromise,
              {
                pending: "Adding role data on progress, please wait..!",
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
              console.error("Error adding role data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        RoleManSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.put(
              `${urlEndpoint.role}?id=${roleId}`,
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
                pending: "Updating role data on progress, please wait..!",
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
              console.error("Error updating role data:", error);
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
      RoleManSchema,
      data,
      token,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      roleId,
      urlEndpoint,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(`${urlEndpoint.role}?id=${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toastPromise(
        deletePromise,
        {
          pending: "deleting role data on progress, please wait..!",
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
        console.error("Error deleting role data:", error);
      });
    },
    [roleId, token, onClose, refreshData, toastPromise, urlEndpoint]
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
            type === "create" ? "Insert Role Data" : "Update Role Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <label htmlFor="roleName">
                Role name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                placeholder="Admin"
                value={data.roleName}
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

export default RoleManModal;
