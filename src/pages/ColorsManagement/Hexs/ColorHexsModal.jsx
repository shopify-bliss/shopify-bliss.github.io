import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { ColorSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function ColorHexsModal({ type, onOpen, onClose, refreshData, colorId }) {
  axios.defaults.withCredentials = true;

  const [hexValue, setHexValue] = useState("");
  const [isDevelopValue, setIsDevelopValue] = useState(true);

  const { toastMessage, toastPromise, token } = useDashboard();

  const statusInsert = useRef(false);
  const statusUpdate = useRef(false);

  useEffect(() => {
    if (onOpen && type === "create") {
      setHexValue("");
      setIsDevelopValue(true);
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.colorId}?id=${colorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setHexValue(res.data.data.color);
          setIsDevelopValue(res.data.data.is_develope);
        })
        .catch((error) => {
          console.error("Error fetching color data:", error);
        });
    }
  }, [onOpen, type, colorId, token]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        const insertData = {
          color: hexValue,
          isDevelope: isDevelopValue,
        };

        ColorSchema.validate(insertData, { abortEarly: false })
          .then(() => {
            const colorPromise = axios.post(urlEndpoint.colors, insertData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            colorPromise.then((res) => {
              statusInsert.current = res.data.success;
            });

            toastPromise(
              colorPromise,
              {
                pending: "Adding color data on progress, please wait..!",
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

            colorPromise.catch((error) => {
              console.error("Error adding color data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        const updateData = {
          color: hexValue,
          isDevelope: isDevelopValue,
        };

        // console.log(updateData);

        ColorSchema.validate(updateData, { abortEarly: false })
          .then(() => {
            const colorPromise = axios.put(
              `${urlEndpoint.colors}?id=${colorId}`,
              updateData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            colorPromise.then((res) => {
              statusUpdate.current = res.data.success;
            });

            toastPromise(
              colorPromise,
              {
                pending: "Updating color data on progress, please wait..!",
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

            colorPromise.catch((error) => {
              console.error("Error updating color data:", error);
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
      hexValue,
      isDevelopValue,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      colorId,
      token,
      type,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.colors}?id=${colorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting color data on progress, please wait..!",
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
        console.error("Error deleting color data:", error);
      });
    },
    [colorId, token, onClose, refreshData, toastPromise]
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
              <label htmlFor="color">
                Color <span>(Required)</span>
              </label>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="f0f0f0"
                value={hexValue}
                onChange={(e) => setHexValue(e.target.value)}
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

ColorHexsModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  colorId: PropTypes.string,
};

export default ColorHexsModal;
