import React, { useState, useCallback } from "react";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <div className="login">
        <div className="login-header">
          <div className="login-header-back">Back</div>
          <div className="login-header-signup">Create Account</div>
        </div>
        <div className="login-content">
          <div className="login-content-title">
            <div className="logo"></div>
            <div className="text">Log into Shopify Bliss</div>
          </div>
          <div className="login-content-core">
            <form className="form">
              <div className="form-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type="text"
                    id="password"
                    name="password"
                    autoComplete="password"
                  />
                  {hidePassword ? (
                    <span class="material-symbols-outlined">visibility</span>
                  ) : (
                    <span class="material-symbols-outlined">
                      visibility_off
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className="form-submit"></button>
            </form>
            <div className="divider"></div>
            <div className="integration">
              <div className="integration-google">
                <div className="icon"></div>
                <span className="text">Continue with Google</span>
              </div>
            </div>
          </div>
          <div className="login-content-problems"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
