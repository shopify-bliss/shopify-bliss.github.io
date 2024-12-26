import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import google from "../../assets/images/login/google.png";
import facebook from "../../assets/images/login/facebook.png";
import whatsapp from "../../assets/images/login/whatsapp (1).png";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useSearch } from "../../helpers/SearchContext";

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
      ) : type === "login" ? (
        <Link className="auth-header-link" to={"/signup"}>
          Create Account
        </Link>
      ) : (
        <Link className="auth-header-link" to={"/login"}>
          Verify Code
        </Link>
      )}
    </>
  );
}

export function AuthTitle({ logo, type }) {
  return (
    <div className={`auth-content-title ${type === "verify" ? "verify" : ""}`}>
      <img className="logo" src={logo} alt="Shopify Bliss Logo" />
      {type === "signup" ? (
        <div className="text">Create Your Account</div>
      ) : type === "login" ? (
        <div className="text">
          Log into <span>shopify bliss</span>
        </div>
      ) : (
        <>
          <div className="text verify">Check Your Email !</div>
          <div className="desc">
            Please check your email inbox for a 6-digit verification code we
            have sent to your registered email address. Enter the code in the
            field below to confirm your email and complete the verification
            process.
          </div>
        </>
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
  phoneCodes,
  selectedCode,
  setSelectedCode,
}) {
  const [openPhoneCodes, setOpenPhoneCodes] = useState(false);
  const phoneCodeModalRef = useRef(null);
  const { search, setSearch } = useSearch();

  const handleClickOutside = useCallback(
    (e) => {
      if (phoneCodeModalRef && !phoneCodeModalRef.current.contains(e.target)) {
        setOpenPhoneCodes(false);
      }
    },
    [phoneCodeModalRef]
  );

  useEffect(() => {
    if (openPhoneCodes) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPhoneCodes]);

  const handleCodeSelect = useCallback((code) => {
    setSelectedCode(code);
    setOpenPhoneCodes(false);
  }, []);

  const handleSearchCountry = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <form className="form" onSubmit={handleForm}>
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
      {type === "signup" && (
        <>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-group-input"
              type="text"
              id="username"
              name="username"
              autoComplete="name"
              placeholder="example is me"
              onChange={handleChange}
              value={values.username || ""}
            />
            <div className="input-border"></div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="phone-wrapper-loan">
              <div className="phone-code">
                <div
                  className="phone-code-default"
                  onClick={() => setOpenPhoneCodes(true)}
                >
                  {phoneCodes
                    .filter((item) => item.valueCodes === selectedCode)
                    .map((data, index) => {
                      const flag = data.flag;

                      return (
                        <Fragment key={index}>
                          <div className="image">
                            <img src={flag} alt={data.name} />
                          </div>
                          <div className="code">{data.codes}</div>
                          <span className="material-symbols-rounded">
                            arrow_drop_down
                          </span>
                        </Fragment>
                      );
                    })}
                </div>
                {openPhoneCodes ? (
                  <>
                    <div className="phone-code-list" ref={phoneCodeModalRef}>
                      <div className="phone-code-list-search">
                        <div className="search-country">
                          <span className="material-symbols-rounded">
                            search
                          </span>
                          <input
                            className="search-country-input"
                            type="text"
                            onChange={handleSearchCountry}
                            placeholder="Search country"
                          />
                        </div>
                      </div>
                      {phoneCodes
                        .filter((item) => {
                          const searchLower = search.toLowerCase();

                          return (
                            item.name.toLowerCase().includes(searchLower) ||
                            item.codes.includes(searchLower)
                          );
                        })
                        .map((data, index) => {
                          const flag = data.flag;

                          return (
                            <div
                              className="phone-code-list-item"
                              key={index}
                              onClick={() => handleCodeSelect(data.valueCodes)}
                            >
                              <div className="image">
                                <img src={flag} alt={data.name} />
                              </div>
                              <div className="desc">
                                <div className="desc-name">{data.name}</div>
                                <div className="desc-code">({data.codes})</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <input
                className="form-group-input"
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="tel"
                placeholder="81234567890"
                onChange={handleChange}
                value={values.phoneNumber || ""}
              />
            </div>
            <div className="input-border"></div>
          </div>
        </>
      )}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-group-input"
          type={hidePassword ? "password" : "text"}
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="password"
          onChange={handleChange}
          value={values.password || ""}
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
