import { useCallback, useState } from "react";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { AuthValidationPassword } from "../../components/AuthSupport/AuthSupport";
import { resetPasswordSchema } from "../../helpers/ValidationSchema";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";

function Password() {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
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

  const { toastPromise, toastMessage } = useDashboard();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "newPassword") {
        setValidationPassword({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          lowercase: /[a-z]/.test(value),
          number: /[0-9]/.test(value),
          special: /[@$!%*?&#^()_\-+=]/.test(value),
        });
      }

      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setValidationPassword, setData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

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
            { autoClose: 2500, position: "top-center" }
          );

          resetPasswordPromise
            .then((res) => {
              console.log(res.data);
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
    },
    [data, toastPromise, toastMessage]
  );

  return (
    <form className="core" onSubmit={handleSubmit}>
      <div className="core-input">
        <div className="core-input-group core-input-pw">
          <label htmlFor="oldPassword">Current Password</label>
          <input
            type={`${hideCurrPassword ? "password" : "text"}`}
            id="oldPassword"
            name="oldPassword"
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="material-symbols-outlined"
            onClick={() => setHideCurrPassword(!hideCurrPassword)}
          >
            {hideCurrPassword ? "visibility_off" : "visibility"}
          </span>
          <div className="input-border"></div>
        </div>
        <div className="core-input-group core-input-pw">
          <label htmlFor="newPassword">Set New Password</label>
          <input
            type={`${hideSetPassword ? "password" : "text"}`}
            id="newPassword"
            name="newPassword"
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="material-symbols-outlined"
            onClick={() => setHideSetPassword(!hideSetPassword)}
          >
            {hideSetPassword ? "visibility_off" : "visibility"}
          </span>
          <div className="input-border"></div>
        </div>
      </div>
      <AuthValidationPassword validationPassword={validationPassword} />
      <button className="core-button" type="submit">
        Save
      </button>
    </form>
  );
}

export default Password;
