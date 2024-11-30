import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/black_logo_nobg.png";
import google from "../../assets/images/login/google.png";
import urlEndpoint from "../../helpers/urlEndpoint";
import axios from "axios";

function Login() {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = useCallback((e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  const handleLoginForm = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post(urlEndpoint.loginForm, values)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [values]
  );

  const handleLoginGoogle = useCallback(() => {
    axios
      .get(urlEndpoint.loginGoogle)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="login">
        <div className="login-header">
          <Link to={"/"} className="login-header-back">
            <span className="material-symbols-outlined">chevron_backward</span>
            <div className="text">Back</div>
          </Link>
          <div className="login-header-signup">Create Account</div>
        </div>
        <div className="login-content">
          <div className="login-content-title">
            <img className="logo" src={logo} alt="Shopify Bliss Logo" />
            <div className="text">Log into Shopify Bliss</div>
          </div>
          <div className="login-content-core">
            <form className="form" onSubmit={handleLoginForm}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {
                  <span
                    className="material-symbols-outlined"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? "visibility" : "visibility_off"}
                  </span>
                }
              </div>
              <button
                type="submit"
                className="form-submit"
                disabled={!values.email || !values.password}
              >
                Log in
              </button>
            </form>
            <div className="divider"></div>
            <div className="integration">
              <button
                className="integration-google"
                onClick={handleLoginGoogle}
              >
                <img className="icon" src={google} />
                <span className="text">Continue with Google</span>
              </button>
            </div>
          </div>
          <Link className="login-content-problems" to={"/404"}>
            Can't Log In
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
