import { useState, useEffect, useCallback } from "react";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { NameDevelopeSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import axios from "axios";
import PropTypes from "prop-types";

function TempBrandsModal({ type, onOpen, onClose, refreshData, brandId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    name: "",
    isDevelope: true,
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        name: "",
        isDevelope: true,
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.brandsAiId}?id=${brandId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data[0]);

          setData({
            name: res.data.data[0].name,
            isDevelope: res.data.data[0].is_develope,
          });
        })
        .catch((error) => {
          console.error("Error fetching brand data:", error);
        });
    }
  }, [onOpen, type, brandId, token]);

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
        NameDevelopeSchema.validate(data, { abortEarly: false })
          .then(() => {
            const brandsAiPromise = axios.post(urlEndpoint.brandsAi, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              brandsAiPromise,
              {
                pending: "Adding brand data on progress, please wait..!",
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

            brandsAiPromise.catch((error) => {
              console.error("Error adding brand data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        NameDevelopeSchema.validate(data, { abortEarly: false })
          .then(() => {
            const brandsAiPromise = axios.put(
              `${urlEndpoint.brandsAi}?id=${brandId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toastPromise(
              brandsAiPromise,
              {
                pending: "Updating brand data on progress, please wait..!",
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

            brandsAiPromise.catch((error) => {
              console.error("Error updating brand data:", error);
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
      data,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      brandId,
      token,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.brandsAi}?id=${brandId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting brand data on progress, please wait..!",
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
        console.error("Error deleting brand data:", error);
      });
    },
    [brandId, token, onClose, refreshData, toastPromise]
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
            type === "create" ? "Insert Brand Data" : "Update Brand Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <label htmlFor="name">
                Brand name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Professional"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Setting Is Develope <span>(Required)</span>
              </div>
              <div
                className="check-option"
                onClick={() =>
                  setData({ ...data, isDevelope: !data.isDevelope })
                }
              >
                <span className="material-symbols-outlined">
                  {data.isDevelope ? "circle" : "task_alt"}
                </span>
                <div className="text">
                  {data.isDevelope ? "Progress" : "Done"}
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

TempBrandsModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  brandId: PropTypes.string,
};

export default TempBrandsModal;
