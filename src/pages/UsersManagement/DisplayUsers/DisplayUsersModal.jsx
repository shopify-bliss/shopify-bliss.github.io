import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDataToken } from "../../../helpers/DataToken";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { TempSectionsSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function DisplayUsersModal({ type, onOpen, onClose, refreshData, sectionId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    name: "",
  });

  const { toastMessage, toastPromise } = useDashboard();
  const { token } = useDataToken();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        name: "",
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.elementsAiId}?id=${sectionId}`)
        .then((res) => {
          setData(res.data.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching section data:", error);
        });
    }
  }, [onOpen, type, sectionId, urlEndpoint]);

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
        TempSectionsSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.post(urlEndpoint.elementsAi, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              elementsAiPromise,
              {
                pending: "Adding section data on progress, please wait..!",
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
              console.error("Error adding section data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        TempSectionsSchema.validate(data, { abortEarly: false })
          .then(() => {
            const elementsAiPromise = axios.put(
              `${urlEndpoint.elementsAi}?id=${sectionId}`,
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
                pending: "Updating section data on progress, please wait..!",
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
              console.error("Error updating section data:", error);
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
      TempSectionsSchema,
      data,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      sectionId,
      token,
      urlEndpoint,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.elementsAi}?id=${sectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting section data on progress, please wait..!",
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
        console.error("Error deleting section data:", error);
      });
    },
    [sectionId, token, onClose, refreshData]
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
            type === "create" ? "Insert Section Data" : "Update Section Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form
            className="modal-dashboard-form"
            onSubmit={handleSubmit}
          >
            <div className="modal-dashboard-form-group">
              <label htmlFor="name">
                Section name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Intro Section"
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

export default DisplayUsersModal;
