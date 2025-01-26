import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { FontDesignsSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function FontDesignsModal({
  type,
  onOpen,
  onClose,
  refreshData,
  fontDesignId = null,
  brands = null,
  fonts = null,
}) {
  axios.defaults.withCredentials = true;

  const [openBrand, setOpenBrand] = useState(false);
  const [openFont1, setOpenFont1] = useState(false);
  const [openFont2, setOpenFont2] = useState(false);

  const [dataDesign, setDataDesign] = useState({
    brand_id: "",
    font1_id: "",
    font2_id: "",
    group: 0,
    isDevelope: true,
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  const statusInsert = useRef(false);
  const statusUpdate = useRef(false);

  const listBrandRef = useRef(null);
  const listFont1Ref = useRef(null);
  const listFont2Ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listBrandRef.current && !listBrandRef.current.contains(e.target)) {
        setOpenBrand(false);
      }
    };

    if (openBrand) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listBrandRef, openBrand]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listFont1Ref.current && !listFont1Ref.current.contains(e.target)) {
        setOpenFont1(false);
      }
    };

    if (openFont1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listFont1Ref, openFont1]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listFont2Ref.current && !listFont2Ref.current.contains(e.target)) {
        setOpenFont2(false);
      }
    };

    if (openFont2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listFont2Ref, openFont2]);

  useEffect(() => {
    if (onOpen && type === "create") {
      setDataDesign({
        brand_id: "",
        font1_id: "",
        font2_id: "",
        group: 0,
        isDevelope: true,
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.fontsAiId}?id=${fontDesignId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data[0]);

          setDataDesign({
            brand_id: res.data.data[0].brand_id,
            font1_id: res.data.data[0].font1_id,
            font2_id: res.data.data[0].font2_id,
            group: res.data.data[0].group,
            isDevelope: res.data.data[0].is_develope,
          });
        })
        .catch((error) => {
          console.error("Error fetching font design data:", error);
        });
    }
  }, [onOpen, type, fontDesignId, token]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        FontDesignsSchema.validate(dataDesign, { abortEarly: false })
          .then(() => {
            const fontDesignsPromise = axios.post(
              urlEndpoint.fontsAi,
              dataDesign,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            fontDesignsPromise.then((res) => {
              statusInsert.current = res.data.success;
            });

            toastPromise(
              fontDesignsPromise,
              {
                pending: "Adding font design data on progress, please wait..!",
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

            fontDesignsPromise.catch((error) => {
              console.error("Error adding font design data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        FontDesignsSchema.validate(dataDesign, { abortEarly: false })
          .then(() => {
            const fontDesignsPromise = axios.put(
              `${urlEndpoint.fontsAi}?id=${fontDesignId}`,
              dataDesign,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            fontDesignsPromise.then((res) => {
              statusUpdate.current = res.data.success;
            });

            toastPromise(
              fontDesignsPromise,
              {
                pending:
                  "Updating font design data on progress, please wait..!",
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

            fontDesignsPromise.catch((error) => {
              console.error("Error updating font design data:", error);
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
      dataDesign,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      fontDesignId,
      token,
      type,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.font}?id=${fontDesignId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting font design data on progress, please wait..!",
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
        console.error("Error deleting font design data:", error);
      });
    },
    [fontDesignId, token, onClose, refreshData, toastPromise]
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
              <div className="label">
                Brand <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenBrand(true)}
              >
                <div className="text">
                  {dataDesign.brand_id === ""
                    ? "Select Brand"
                    : brands
                        .filter((item) => item.brand_id === dataDesign.brand_id)
                        .map((data) => data.name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openBrand ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openBrand && (
                <div className="select-list" ref={listBrandRef}>
                  {brands
                    .filter(
                      (item) =>
                        item.brand_id !== dataDesign.brand_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.brand_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              brand_id: data.brand_id,
                            });
                            setOpenBrand(false);
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
              <div className="label">
                Font 1 <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenFont1(true)}
              >
                <div className="text">
                  {dataDesign.font1_id === ""
                    ? "Select Font 1"
                    : fonts
                        .filter((item) => item.font_id === dataDesign.font1_id)
                        .map((data) => data.name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openFont1 ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openFont1 && (
                <div className="select-list" ref={listFont1Ref}>
                  {fonts
                    .filter(
                      (item) =>
                        item.font_id !== dataDesign.font1_id &&
                        item.font_id !== dataDesign.font2_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.font_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              font1_id: data.font_id,
                            });
                            setOpenFont1(false);
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
              <div className="label">
                Font 2 <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenFont2(true)}
              >
                <div className="text">
                  {dataDesign.font2_id === ""
                    ? "Select Font 2"
                    : fonts
                        .filter((item) => item.font_id === dataDesign.font2_id)
                        .map((data) => data.name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openFont2 ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openFont2 && (
                <div className="select-list" ref={listFont2Ref}>
                  {fonts
                    .filter(
                      (item) =>
                        item.font_id !== dataDesign.font2_id &&
                        item.font_id !== dataDesign.font1_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.font_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              font2_id: data.font_id,
                            });
                            setOpenFont2(false);
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
              <label htmlFor="group">
                Group <span>(Required)</span>
              </label>
              <input
                type="text"
                id="group"
                name="group"
                placeholder="1"
                value={dataDesign.group}
                onChange={(e) =>
                  setDataDesign({ ...dataDesign, group: e.target.value })
                }
              />
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Setting Is Develope <span>(Required)</span>
              </div>
              <div
                className="check-option"
                onClick={() =>
                  setDataDesign({
                    ...dataDesign,
                    isDevelope: !dataDesign.isDevelope,
                  })
                }
              >
                <span className="material-symbols-outlined">
                  {dataDesign.isDevelope ? "circle" : "task_alt"}
                </span>
                <div className="text">
                  {dataDesign.isDevelope ? "Progress" : "Done"}
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

FontDesignsModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  fontDesignId: PropTypes.string,
  brands: PropTypes.array,
  fonts: PropTypes.array,
};

export default FontDesignsModal;
