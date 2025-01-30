import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { ColorDesignsSchema } from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";

function ColorDesignsModal({
  type,
  onOpen,
  onClose,
  refreshData,
  colorDesignId = null,
  brands = null,
  colors = null,
}) {
  axios.defaults.withCredentials = true;

  const [openBrand, setOpenBrand] = useState(false);
  const [openColor1, setOpenColor1] = useState(false);
  const [openColor2, setOpenColor2] = useState(false);
  const [openColor3, setOpenColor3] = useState(false);

  const [dataDesign, setDataDesign] = useState({
    brand_id: "",
    color1_id: "",
    color2_id: "",
    color3_id: "",
    isDevelope: true,
  });

  const { toastMessage, toastPromise, token } = useDashboard();

  const statusInsert = useRef(false);
  const statusUpdate = useRef(false);

  const listBrandRef = useRef(null);
  const listColor1Ref = useRef(null);
  const listColor2Ref = useRef(null);
  const listColor3Ref = useRef(null);

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
      if (listColor1Ref.current && !listColor1Ref.current.contains(e.target)) {
        setOpenColor1(false);
      }
    };

    if (openColor1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listColor1Ref, openColor1]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listColor2Ref.current && !listColor2Ref.current.contains(e.target)) {
        setOpenColor2(false);
      }
    };

    if (openColor2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listColor2Ref, openColor2]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listColor3Ref.current && !listColor3Ref.current.contains(e.target)) {
        setOpenColor3(false);
      }
    };

    if (openColor3) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listColor3Ref, openColor3]);

  useEffect(() => {
    if (onOpen && type === "create") {
      setDataDesign({
        brand_id: "",
        color1_id: "",
        color2_id: "",
        color3_id: "",
        isDevelope: true,
      });
    } else if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.colorsAiId}?id=${colorDesignId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDataDesign({
            brand_id: res.data.data[0].brand_id,
            color1_id: res.data.data[0].color1_id,
            color2_id: res.data.data[0].color2_id,
            color3_id: res.data.data[0].color3_id,
            isDevelope: res.data.data[0].is_develope,
          });
        })
        .catch((error) => {
          console.error("Error fetching color design data:", error);
        });
    }
  }, [onOpen, type, colorDesignId, token]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        ColorDesignsSchema.validate(dataDesign, { abortEarly: false })
          .then(() => {
            const colorDesignsPromise = axios.post(
              urlEndpoint.colorsAi,
              dataDesign,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            colorDesignsPromise.then((res) => {
              statusInsert.current = res.data.success;
            });

            toastPromise(
              colorDesignsPromise,
              {
                pending: "Adding color design data on progress, please wait..!",
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

            colorDesignsPromise.catch((error) => {
              console.error("Error adding color design data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        ColorDesignsSchema.validate(dataDesign, { abortEarly: false })
          .then(() => {
            const colorDesignsPromise = axios.put(
              `${urlEndpoint.colorsAi}?id=${colorDesignId}`,
              dataDesign,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            colorDesignsPromise.then((res) => {
              statusUpdate.current = res.data.success;
            });

            toastPromise(
              colorDesignsPromise,
              {
                pending:
                  "Updating color design data on progress, please wait..!",
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

            colorDesignsPromise.catch((error) => {
              console.error("Error updating color design data:", error);
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
      colorDesignId,
      token,
      type,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.colorsAi}?id=${colorDesignId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting color design data on progress, please wait..!",
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
        console.error("Error deleting color design data:", error);
      });
    },
    [colorDesignId, token, onClose, refreshData, toastPromise]
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
            type === "create" ? "Insert Color Data" : "Update Color Data"
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
                Color 1 <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenColor1(true)}
              >
                <div className="text">
                  {dataDesign.color1_id === ""
                    ? "Select Color 1"
                    : colors
                        .filter(
                          (item) => item.color_id === dataDesign.color1_id
                        )
                        .map((data) => data.color)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openColor1 ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openColor1 && (
                <div className="select-list" ref={listColor1Ref}>
                  {colors
                    .filter(
                      (item) =>
                        item.color_id !== dataDesign.color1_id &&
                        item.color_id !== dataDesign.color2_id &&
                        item.color_id !== dataDesign.color3_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.color_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              color1_id: data.color_id,
                            });
                            setOpenColor1(false);
                          }}
                        >
                          <div className="name">{data.color}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Color 2 <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenColor2(true)}
              >
                <div className="text">
                  {dataDesign.color2_id === ""
                    ? "Select Color 2"
                    : colors
                        .filter(
                          (item) => item.color_id === dataDesign.color2_id
                        )
                        .map((data) => data.color)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openColor2 ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openColor2 && (
                <div className="select-list" ref={listColor2Ref}>
                  {colors
                    .filter(
                      (item) =>
                        item.color_id !== dataDesign.color1_id &&
                        item.color_id !== dataDesign.color2_id &&
                        item.color_id !== dataDesign.color3_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.color_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              color2_id: data.color_id,
                            });
                            setOpenColor2(false);
                          }}
                        >
                          <div className="name">{data.color}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Color 3 <span>(Required)</span>
              </div>
              <div
                className="select-default"
                onClick={() => setOpenColor3(true)}
              >
                <div className="text">
                  {dataDesign.color3_id === ""
                    ? "Select Color 3"
                    : colors
                        .filter(
                          (item) => item.color_id === dataDesign.color3_id
                        )
                        .map((data) => data.color)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openColor3 ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openColor3 && (
                <div className="select-list" ref={listColor3Ref}>
                  {colors
                    .filter(
                      (item) =>
                        item.color_id !== dataDesign.color1_id &&
                        item.color_id !== dataDesign.color2_id &&
                        item.color_id !== dataDesign.color3_id &&
                        item.is_develope === false
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.color_id}
                          onClick={() => {
                            setDataDesign({
                              ...dataDesign,
                              color3_id: data.color_id,
                            });
                            setOpenColor3(false);
                          }}
                        >
                          <div className="name">{data.color}</div>
                        </div>
                      );
                    })}
                </div>
              )}
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

ColorDesignsModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  colorDesignId: PropTypes.string,
  brands: PropTypes.array,
  colors: PropTypes.array,
};

export default ColorDesignsModal;
