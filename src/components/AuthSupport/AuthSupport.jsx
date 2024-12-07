import { Link } from "react-router-dom";
import google from "../../assets/images/login/google.png";
import facebook from "../../assets/images/login/facebook.png";
import whatsapp from "../../assets/images/login/whatsapp (1).png";
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
        <div className="text">
          Log into <span>shopify bliss</span>
        </div>
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
  validationPassword,
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
            {hidePassword ? "visibility_off" : "visibility"}
          </span>
        }
        <div className="input-border"></div>
      </div>
      {type === "signup" && (
        <div className="validation-password">
          <div className={`item ${validationPassword.length ? "done" : ""}`}>
            <span className="material-symbols-rounded">check_circle</span>
            <div className="item-text">Password should be 8 chars minimum.</div>
          </div>
          <div className={`item ${validationPassword.lowercase ? "done" : ""}`}>
            <span className="material-symbols-rounded">check_circle</span>
            <div className="item-text">
              Password must contain at least one lowercase letter.
            </div>
          </div>
          <div className={`item ${validationPassword.uppercase ? "done" : ""}`}>
            <span className="material-symbols-rounded">check_circle</span>
            <div className="item-text">
              Password must contain at least one uppercase letter.
            </div>
          </div>
          <div className={`item ${validationPassword.number ? "done" : ""}`}>
            <span className="material-symbols-rounded">check_circle</span>
            <div className="item-text">
              Password must contain at least one number.
            </div>
          </div>
          <div className={`item ${validationPassword.special ? "done" : ""}`}>
            <span className="material-symbols-rounded">check_circle</span>
            <div className="item-text">
              Password must contain at least one special character.
            </div>
          </div>
        </div>
      )}
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

export function AuthIntegration({ toastDevelop }) {
  return (
    <div className="integration">
      <button
        className="integration-item"
        onClick={() => {
          toastDevelop("continue with WhatsApp");
        }}
      >
        <img className="icon" src={whatsapp} alt="WhatsApp's Logo" />
        <span className="text">Continue with WhatsApp</span>
      </button>
      <Link className="integration-item" to={urlEndpoint.loginGoogle}>
        <img className="icon" src={google} alt="Google's Logo" />
        <span className="text">Continue with Google</span>
      </Link>
      <button
        className="integration-item"
        onClick={() => {
          toastDevelop("continue with Facebook");
        }}
      >
        <img className="icon" src={facebook} alt="Facebook's Logo" />
        <span className="text">Continue with Facebook</span>
      </button>
    </div>
  );
}
