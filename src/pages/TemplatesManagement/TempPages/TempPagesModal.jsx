import { useState, useEffect, useCallback } from "react";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { tempPagesSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import axios from "axios";
import PropTypes from "prop-types";

function TempPagesModal({ type, onOpen, onClose, refreshData, pageId }) {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    type: "",
    icon: "",
    name_class: "",
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  useEffect(() => {
    if (onOpen && type === "create") {
      setData({
        type: "",
        icon: "",
        name_class: "",
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.pagesAiId}?id=${pageId}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching page data:", error);
        });
    }
  }, [onOpen, type, pageId]);

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
        tempPagesSchema
          .validate(data, { abortEarly: false })
          .then(() => {
            const pagesAiPromise = axios.post(urlEndpoint.pagesAi, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              pagesAiPromise,
              {
                pending: "Adding page data on progress, please wait..!",
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

            pagesAiPromise.catch((error) => {
              console.error("Error adding page data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        tempPagesSchema
          .validate(data, { abortEarly: false })
          .then(() => {
            const pagesAiPromise = axios.put(
              `${urlEndpoint.pagesAi}?id=${pageId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toastPromise(
              pagesAiPromise,
              {
                pending: "Updating page data on progress, please wait..!",
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

            pagesAiPromise.catch((error) => {
              console.error("Error updating page data:", error);
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
      pageId,
      token,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.pagesAi}?id=${pageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting page data on progress, please wait..!",
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
        console.error("Error deleting page data:", error);
      });
    },
    [pageId, token, onClose, refreshData, toastPromise]
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
            type === "create" ? "Insert Page Data" : "Update Page Data"
          }
          onOpen={onOpen}
          onClose={onClose}
        >
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <label htmlFor="type">
                Page name <span>(Required)</span>
              </label>
              <input
                type="text"
                id="type"
                name="type"
                placeholder="Home Page"
                value={data.type}
                onChange={handleChange}
              />
            </div>
            <div className="modal-dashboard-form-group">
              <label htmlFor="icon">
                Page icon <span>(Required)</span>
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                placeholder="home (google material icon)"
                value={data.icon}
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

TempPagesModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  pageId: PropTypes.string,
};

export default TempPagesModal;
