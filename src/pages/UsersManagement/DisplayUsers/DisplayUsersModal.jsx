import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../helpers/AuthContext";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import {
  userSchema,
  updateUserRoleSchema,
} from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";

function DisplayUsersModal({ type, onOpen, onClose, refreshData, userId }) {
  axios.defaults.withCredentials = true;

  const [roles, setRoles] = useState([]);
  const [data, setData] = useState({
    avatar: "",
    username: "",
    phoneNumber: "",
  });
  const [updateData, setUpdateData] = useState({
    userID: "",
    role: "",
  });
  const [openRole, setOpenRole] = useState(false);

  const listRoleRef = useRef(null);

  const { toastMessage, toastPromise } = useDashboard();
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(urlEndpoint.role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRoles(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, [urlEndpoint.role, token]);

  const clickOutside = useCallback(
    (e) => {
      if (listRoleRef.current && !listRoleRef.current.contains(e.target)) {
        setOpenRole(false);
      }
    },
    [listRoleRef]
  );

  useEffect(() => {
    if (openRole) {
      document.addEventListener("mousedown", clickOutside);
    } else {
      document.removeEventListener("mousedown", clickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [openRole]);

  useEffect(() => {
    console.log(userId);

    if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.userId}?userID=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setUpdateData({
            userID: res.data.data.user_id,
            role: res.data.data.role_id,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [onOpen, type, urlEndpoint.userId, userId, token]);

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
        userSchema
          .validate(data, { abortEarly: false })
          .then(() => {
            const userPromise = axios.post(urlEndpoint.allusers, data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            toastPromise(
              userPromise,
              {
                pending: "Adding user data on progress, please wait..!",
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

            userPromise.catch((error) => {
              console.error("Error adding user data:", error);
            });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        console.log(updateData);

        updateUserRoleSchema
          .validate(updateData, { abortEarly: false })
          .then(() => {
            const userPromise = axios.put(
              urlEndpoint.updateUserRole,
              updateData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toastPromise(
              userPromise,
              {
                pending: "Updating user role data on progress, please wait..!",
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

            userPromise.catch((error) => {
              console.error("Error updating user role data:", error);
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
      userSchema,
      data,
      updateData,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      userId,
      token,
      urlEndpoint,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.allusers}?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toastPromise(
        deletePromise,
        {
          pending: "deleting user data on progress, please wait..!",
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
        console.error("Error deleting user data:", error);
      });
    },
    [userId, token, onClose, refreshData]
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
          <form className="modal-dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-dashboard-form-group">
              <div className="label">
                Role <span>(Required)</span>
              </div>
              <div className="select-default" onClick={() => setOpenRole(true)}>
                <div className="text">
                  {updateData.role === ""
                    ? "Choose Role"
                    : roles
                        .filter((item) => item.role_id === updateData.role)
                        .map((data) => data.role_name)}
                </div>
                <span
                  className={`material-symbols-outlined ${
                    openRole ? "default-closed" : ""
                  }`}
                >
                  south_east
                </span>
              </div>
              {openRole && (
                <div className="select-list no-more" ref={listRoleRef}>
                  {roles
                    .filter((item) => item.role_id !== updateData.role)
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.role_id}
                          onClick={() => {
                            setUpdateData({
                              ...updateData,
                              role: data.role_id,
                            });
                            setOpenRole(false);
                          }}
                        >
                          <div className="name">{data.role_name}</div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default DisplayUsersModal;
