import { useCallback } from "react";
import { Link } from "react-router-dom";
import google from "../../assets/images/login/google.png";
import facebook from "../../assets/images/login/facebook.png";
import whatsapp from "../../assets/images/login/whatsapp (1).png";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";

export function AuthHeader({ type }) {
  return (
    <>
      <Link to={"/"} className="auth-header-back">
        <span className="material-symbols-outlined">chevron_backward</span>
        <div className="text">Back</div>
      </Link>
      {type === "signup" ? (
        <Link className="auth-header-link" to={"/login"}>
          Log in
        </Link>
      ) : (
        <Link className="auth-header-link" to={"/signup"}>
          Create Account
        </Link>
      )}
    </>
  );
}

export function AuthTitle({ logo, type }) {
  return (
    <div className="auth-content-title">
      <img className="logo" src={logo} alt="Shopify Bliss Logo" />
      {type === "signup" ? (
        <div className="text">Create Your Account</div>
      ) : (
        <div className="text">Log into Shopify Bliss</div>
      )}
    </div>
  );
}

export function AuthForm({
  handleForm,
  handleChange,
  values,
  hidePassword,
  setHidePassword,
  type,
}) {
  return (
    <form className="form" onSubmit={handleForm}>
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
        <div className="input-border"></div>
      </div>
      {type === "signup" && (
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="name"
            placeholder="example is me"
            onChange={handleChange}
            value={values.username}
          />
          <div className="input-border"></div>
        </div>
      )}
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
        <div className="input-border"></div>
      </div>
      <button
        type="submit"
        className="form-submit"
        disabled={
          type === "signup"
            ? !values.email || !values.password || !values.username
            : !values.email || !values.password
        }
      >
        {type === "signup" ? "Sign up" : "Log in"}
      </button>
    </form>
  );
}

export function AuthIntegration({ toastMessage }) {
  axios.defaults.withCredentials = true;

  const handleLoginGoogle = useCallback(() => {
    axios
      .get(urlEndpoint.loginGoogle, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [urlEndpoint.loginGoogle]);

  return (
    <div className="integration">
      <button
        className="integration-item"
        onClick={() => {
          toastMessage(
            "info",
            "The Continue with WhatsApp feature is currently under development.",
            "top-center"
          );
        }}
      >
        <img className="icon" src={whatsapp} alt="WhatsApp's Logo" />
        <span className="text">Continue with WhatsApp</span>
      </button>
      <button className="integration-item" onClick={handleLoginGoogle}>
        <img className="icon" src={google} alt="Google's Logo" />
        <span className="text">Continue with Google</span>
      </button>
      <button
        className="integration-item"
        onClick={() => {
          toastMessage(
            "info",
            "The Continue with Facebook feature is currently under development.",
            "top-center"
          );
        }}
      >
        <img className="icon" src={facebook} alt="Facebook's Logo" />
        <span className="text">Continue with Facebook</span>
      </button>
    </div>
  );
}
