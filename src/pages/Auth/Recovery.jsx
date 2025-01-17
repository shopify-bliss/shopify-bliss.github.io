import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/black-logo.png";
import urlEndpoint from "../../helpers/urlEndpoint";
import axios from "axios";
import {
  recoverySchema,
  resetPasswordSchema,
} from "../../helpers/ValidationSchema.js";
import {
  AuthHeader,
  AuthTitle,
  AuthValidationPassword,
} from "../../components/AuthSupport/AuthSupport";
import { ToastContainer } from "react-toastify";
import { toastMessage, toastPromise } from "../../helpers/AlertMessage";
import PropTypes from "prop-types";

function Recovery({ typeMain }) {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [hideCurrPassword, setHideCurrPassword] = useState(true);
  const [hideSetPassword, setHideSetPassword] = useState(true);
  const [validationPassword, setValidationPassword] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const statusRecovery = useRef(null);
  const statusResetPassword = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      if (name === "newPassword") {
        setValidationPassword({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          lowercase: /[a-z]/.test(value),
          number: /[0-9]/.test(value),
          special: /[@$!%*?&#^()_\-+=]/.test(value),
        });
      }
    },
    [setValues, setValidationPassword]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (typeMain === "recovery") {
        recoverySchema
          .validate(
            {
              email: values.email,
            },
            { abortEarly: false }
          )
          .then(() => {
            const recoveryPromise = axios.post(urlEndpoint.sendOtpPassword, {
              email: values.email,
            });

            toastPromise(
              recoveryPromise,
              {
                pending: "Recovery in progress, please wait..",
                success: "Recovery successful! 🎉",
                error: "Failed to recovery, please try again!",
              },
              {
                autoClose: 3500,
                position: "top-center",
              },
              () => {
                if (statusRecovery.current === true) {
                  navigate("/verify-password", {
                    state: {
                      email: values.email,
                    },
                  });
                }
              }
            );

            recoveryPromise
              .then((res) => {
                // console.log(res);
                statusRecovery.current = res.data.success;

                setValues("");
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((errors) => {
            errors.inner.forEach((error) => {
              toastMessage("error", error.message, {
                position: "top-center",
                autoClose: 3500,
              });
            });
          });
      } else {
        const data = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };

        resetPasswordSchema
          .validate(data, { abortEarly: false })
          .then(() => {
            const resetPasswordPromise = axios.put(
              urlEndpoint.updatePassword,
              data
            );

            toastPromise(
              resetPasswordPromise,
              {
                pending: "Reset password on progress, please wait..!",
                success: "Reset password has been successfully updated!",
                error: "Failed to reset password!",
              },
              { autoClose: 2500, position: "top-center" },
              () => {
                if (statusResetPassword.current === true) {
                  navigate("/login");
                }
              }
            );

            resetPasswordPromise
              .then((res) => {
                // console.log(res.data);

                statusResetPassword.current = res.data.success;

                setValues("");
              })
              .catch((error) => {
                console.error("Error updating password:", error);
              });
          })
          .catch((err) => {
            err.inner.forEach((error) => {
              toastMessage("error", error.message);
            });
          });
      }
    },
    [values, typeMain, navigate]
  );

  useEffect(() => {
    if (typeMain === "reset-password" && !location.state) {
      navigate("/recovery", {
        state: {
          messageNoEmail:
            "Email is missing. Please go back to the previous step and ensure your email is entered correctly!",
        },
      });
    }

    if (
      (typeMain === "recovery" && location.state?.messageNoEmail) ||
      (typeMain === "reset-password" && location.state?.messageNoEmail)
    ) {
      toastMessage("warn", location.state.messageNoEmail, {
        position: "top-center",
        autoClose: 5000,
      });
      navigate(location.pathname, {
        state: { ...location.state, messageNoEmail: undefined },
        replace: true,
      });
    }
  }, [location.state, navigate, location.pathname, typeMain]);

  return (
    <>
      <div className="auth">
        <div className="auth-header">
          <AuthHeader type={typeMain} />
        </div>
        <div className="auth-content">
          <AuthTitle logo={logo} type={typeMain} />
          <div className={`auth-content-core recovery`}>
            <form className="form" onSubmit={handleFormSubmit}>
              {typeMain === "recovery" ? (
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="form-group-input"
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    value={values.email || ""}
                  />
                  <div className="input-border"></div>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input
                      className="form-group-input"
                      type={hideCurrPassword ? "password" : "text"}
                      id="oldPassword"
                      name="oldPassword"
                      autoComplete="current-password"
                      placeholder="oldPassword"
                      onChange={handleChange}
                      value={values.oldPassword || ""}
                    />
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setHideCurrPassword(!hideCurrPassword)}
                    >
                      {hideCurrPassword ? "visibility_off" : "visibility"}
                    </span>
                    <div className="input-border"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">Set Password</label>
                    <input
                      className="form-group-input"
                      type={hideSetPassword ? "password" : "text"}
                      id="newPassword"
                      name="newPassword"
                      autoComplete="current-password"
                      placeholder="newPassword"
                      onChange={handleChange}
                      value={values.newPassword || ""}
                    />
                    <span
                      className="material-symbols-outlined"
                      onClick={() => setHideSetPassword(!hideSetPassword)}
                    >
                      {hideSetPassword ? "visibility_off" : "visibility"}
                    </span>
                    <div className="input-border"></div>
                  </div>
                  <AuthValidationPassword
                    validationPassword={validationPassword}
                  />
                </>
              )}
              <button
                type="submit"
                className="form-submit"
                disabled={
                  typeMain === "recovery"
                    ? !values.email
                    : !values.oldPassword || !values.newPassword
                }
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

Recovery.propTypes = {
  typeMain: PropTypes.string,
};

export default Recovery;
