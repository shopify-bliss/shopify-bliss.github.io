import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useDataToken } from "../../helpers/DataToken";
import { AuthValidationPassword } from "../../components/AuthSupport/AuthSupport";

function Password() {
  axios.defaults.withCredentials = true;

  const [hideCurrPassword, setHideCurrPassword] = useState(true);
  const [hideSetPassword, setHideSetPassword] = useState(true);

  const [validationPassword, setValidationPassword] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const { token, decoded } = useDataToken();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "setPassword") {
        setValidationPassword({
          length: value.length >= 8,
          uppercase: /[A-Z]/.test(value),
          lowercase: /[a-z]/.test(value),
          number: /[0-9]/.test(value),
          special: /[@$!%*?&#^()_\-+=]/.test(value),
        });
      }
    },
    [setValidationPassword]
  );

  // useEffect(() => {
  //   axios
  //     .get(urlEndpoint.userId, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    console.log(decoded);
  }, [decoded]);

  return (
    <>
      <form className="core">
        <div className="core-input">
          <div className="core-input-group core-input-pw">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type={`${hideCurrPassword ? "password" : "text"}`}
              id="currentPassword"
              name="currentPassword"
              autoComplete="off"
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
            <label htmlFor="setPassword">Set New Password</label>
            <input
              type={`${hideSetPassword ? "password" : "text"}`}
              id="setPassword"
              name="setPassword"
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
          <AuthValidationPassword validationPassword={validationPassword} />
        </div>
        <button className="core-button" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default Password;