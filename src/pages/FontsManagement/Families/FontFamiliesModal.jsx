import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { NameDevelopeSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";
import FontFamilies from "./FontFamilies";

function FontFamiliesModal({ type, onOpen, onClose, refreshData, fontId }) {
  axios.defaults.withCredentials = true;

  const [nameValue, setNameValue] = useState("");
  const [isDevelopValue, setIsDevelopValue] = useState(true);

  const { toastMessage, toastPromise, token } = useDashboard();

  const statusInsert = useRef(false);
  const statusUpdate = useRef(false);

  useEffect(() => {
    if (onOpen && type === "create") {
      setNameValue("");
      setIsDevelopValue(true);
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.font}?id=${fontId}`)
        .then((res) => {
          setNameValue(res.data.data.name);
          setIsDevelopValue(res.data.data.is_develope);
        })
        .catch((error) => {
          console.error("Error fetching menu data:", error);
        });
    }
  }, [onOpen, type, fontId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        const insertData = {
          name: nameValue,
          isDevelope: isDevelopValue,
        };

        NameDevelopeSchema.validate(insertData, { abortEarly: false })
          .then(() => {
            const menuManPromise = axios.post(urlEndpoint.font, insertData, {
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
          name: nameValue,
          isDevelope: isDevelopValue,
        };

        console.log(updateData);

        NameDevelopeSchema.validate(updateData, { abortEarly: false })
          .then(() => {
            const menuManPromise = axios.put(
              `${urlEndpoint.font}?id=${fontId}`,
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
      nameValue,
      isDevelopValue,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      fontId,
      token,
      type,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(`${urlEndpoint.font}?id=${fontId}`, {
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
    [fontId, token, onClose, refreshData, toastPromise]
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
            type === "create" ? "Insert Font Data" : "Update Font Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <label htmlFor="name">
                Font name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Access Management"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
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

FontFamiliesModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  fontId: PropTypes.string,
};

export default FontFamiliesModal;
