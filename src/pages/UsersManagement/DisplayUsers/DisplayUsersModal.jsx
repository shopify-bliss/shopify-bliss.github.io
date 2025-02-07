import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import {
  adminSchema,
  updateUserRoleSchema,
} from "../../../helpers/ValidationSchema";
import Modal from "../../../components/LayoutDashboard/Modal/Modal";
import PropTypes from "prop-types";
import {
  AuthPhoneCodes,
  AuthValidationPassword,
} from "../../../components/AuthSupport/AuthSupport";

function DisplayUsersModal({ type, onOpen, onClose, refreshData, userId }) {
  axios.defaults.withCredentials = true;

  const [selectedCode, setSelectedCode] = useState(62);
  const [roles, setRoles] = useState([]);
  const [values, setValues] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    roleID: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [validationPassword, setValidationPassword] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [updateData, setUpdateData] = useState({
    userID: "",
    role: "",
  });
  const [openRole, setOpenRole] = useState(false);

  const listRoleRef = useRef(null);
  const createStatus = useRef(null);
  const updateStatus = useRef(null);

  const { toastMessage, toastPromise, token, user } = useDashboard();

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
  }, [token]);

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
  }, [openRole, clickOutside]);

  useEffect(() => {
    if (onOpen && type === "update") {
      axios
        .get(`${urlEndpoint.userId}?userID=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUpdateData({
            userID: res.data.data.user_id,
            role: res.data.data.role_id,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else if (onOpen && type === "create") {
      setValues({
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        roleID: "",
      });
      setValidationPassword({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
      });
      setSelectedCode(62);
    }
  }, [onOpen, userId, token, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(({ roleID, ...rest }) => ({
      ...rest,
      [name]: value,
      roleID, // Tambahkan roleID agar tidak berubah
    }));

    if (name === "password") {
      setValidationPassword({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[@$!%*?&#^()_\-+=]/.test(value),
      });
    }
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (type === "create") {
        adminSchema
          .validate(values, { abortEarly: false })
          .then(() => {
            const userPromise = axios.post(urlEndpoint.addAdmin, values, {
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
                if (createStatus.current === true) {
                  onClose();
                  refreshData();
                }
              }
            );

            userPromise
              .then((res) => {
                createStatus.current = res.data.success;
              })
              .catch((error) => {
                console.error("Error adding user data:", error);
              });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      } else {
        // console.log(updateData);

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
                if (updateStatus.current === true) {
                  onClose();
                  refreshData();
                }
              }
            );

            userPromise
              .then((res) => {
                updateStatus.current = res.data.success;
              })
              .catch((error) => {
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
      type,
      values,
      updateData,
      onClose,
      refreshData,
      toastMessage,
      toastPromise,
      token,
    ]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();

      const deletePromise = axios.delete(
        `${urlEndpoint.userId}?userID=${userId}`,
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
    [userId, token, onClose, refreshData, toastPromise]
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
            {type === "create" ? (
              <>
                <div className="modal-dashboard-form-group">
                  <label htmlFor="username">
                    Username <span>(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Example"
                    value={values.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-dashboard-form-group">
                  <label htmlFor="email">
                    Email <span>(Required)</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-dashboard-form-group">
                  <label htmlFor="phoneNumber">
                    Phone Number <span>(Required)</span>
                  </label>
                  <AuthPhoneCodes
                    selectedCode={selectedCode}
                    setSelectedCode={setSelectedCode}
                  >
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="628123456789"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                  </AuthPhoneCodes>
                </div>
                <div className="modal-dashboard-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type={`${hidePassword ? "password" : "text"}`}
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span
                    className="material-symbols-outlined hide-pw"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? "visibility_off" : "visibility"}
                  </span>
                  <AuthValidationPassword
                    validationPassword={validationPassword}
                  />
                </div>
              </>
            ) : null}
            <div className="modal-dashboard-form-group">
              <div className="label">
                Role <span>(Required)</span>
              </div>
              <div className="select-default" onClick={() => setOpenRole(true)}>
                {type === "create" ? (
                  <div className="text">
                    {values.roleID === ""
                      ? "Choose Role"
                      : roles
                          .filter((item) => item.role_id === values.roleID)
                          .map((data) => data.role_name)}
                  </div>
                ) : (
                  <div className="text">
                    {updateData.role === ""
                      ? "Choose Role"
                      : roles
                          .filter((item) => item.role_id === updateData.role)
                          .map((data) => data.role_name)}
                  </div>
                )}
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
                    .filter(
                      (item) =>
                        item.role_id !== updateData.role &&
                        item.role_id !==
                          "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80" &&
                        (user.role_id !== "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                          ? item.role_id !==
                            "0057ae60-509f-40de-a637-b2b6fdc1569e"
                          : item.role_id)
                    )
                    .map((data) => {
                      return (
                        <div
                          className="select-list-item"
                          key={data.role_id}
                          onClick={
                            type === "create"
                              ? () => {
                                  setValues({
                                    ...values,
                                    roleID: data.role_id,
                                  });
                                  setOpenRole(false);
                                }
                              : () => {
                                  setUpdateData({
                                    ...updateData,
                                    role: data.role_id,
                                  });
                                  setOpenRole(false);
                                }
                          }
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

DisplayUsersModal.propTypes = {
  type: PropTypes.string,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
  refreshData: PropTypes.func,
  userId: PropTypes.string,
};

export default DisplayUsersModal;
