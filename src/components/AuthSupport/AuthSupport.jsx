import { useState, Fragment, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import google from "../../assets/login/google.png";
// import facebook from "../../assets/login/facebook.png";
// import whatsapp from "../../assets/login/whatsapp (1).png";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useSearch } from "../../helpers/SearchContext";
import PropTypes from "prop-types";
import axios from "axios";

export function AuthHeader({ type, classDiff = "auth" }) {
  return (
    <>
      <Link
        to={
          type === "recovery" ||
          type === "reset-password" ||
          type === "verify-password"
            ? "/login"
            : "/"
        }
        className={`${classDiff}-header-back`}
      >
        <span className="material-symbols-outlined">chevron_backward</span>
        <div className="text">Back</div>
      </Link>
      {type === "signup" ? (
        <Link className={`${classDiff}-header-link`} to={"/login"}>
          Log in
        </Link>
      ) : type === "login" ? (
        <Link className={`${classDiff}-header-link`} to={"/signup"}>
          Create Account
        </Link>
      ) : type === "verify" ? (
        <div className={`${classDiff}-header-link`}>Verify Email Code</div>
      ) : type === "verify-password" ? (
        <div className={`${classDiff}-header-link`}>Verify Password Code</div>
      ) : type === "recovery" ? (
        <div className={`${classDiff}-header-link recovery`}>
          Recovery Account
        </div>
      ) : type === "reset-password" ? (
        <div className={`${classDiff}-header-link`}>Reset Password</div>
      ) : null}
    </>
  );
}

AuthHeader.propTypes = {
  type: PropTypes.string,
  classDiff: PropTypes.string,
};

export function AuthTitle({ logo, type, classDiff = "auth", email = null }) {
  return (
    <div
      className={`${classDiff}-content-title ${
        type === "recovery" ? "recovery" : ""
      }`}
    >
      <img className="logo" src={logo} alt="Shopify Bliss Logo" />
      {type === "signup" ? (
        <div className="text">Create Your Account</div>
      ) : type === "login" ? (
        <div className="text">
          Log into <span>shopify bliss</span>
        </div>
      ) : type === "verify" ? (
        <>
          <div className="text">Verification Email to Registration</div>
          <div className="desc">
            Please check your email inbox for a 6-digit verification code we
            have sent to your registered email address. Enter the code in the
            field below to confirm your email and complete the verification
            process.
          </div>
        </>
      ) : type === "verify-password" ? (
        <>
          <div className="text">Verification Email to Reset Password</div>
          <div className="desc">
            Please check your email inbox for a 6-digit verification code we
            have sent to your recovered email address. Enter the code in the
            field below to confirm your email and complete the reset password
            process.
          </div>
        </>
      ) : type === "recovery" ? (
        <>
          <div className="text">Recovery Your Account</div>
          <div className="desc">
            Enter your account&apos;s email and we&apos;ll send you an otp code
            in the email to reset the password.
          </div>
        </>
      ) : type === "reset-password" ? (
        <>
          <div className="text">Reset Password</div>
          <div className="desc">
            Enter a new password for your account and confirm it.
            {email && <div className="desc-email">{email}</div>}
          </div>
        </>
      ) : null}
    </div>
  );
}

AuthTitle.propTypes = {
  logo: PropTypes.string,
  type: PropTypes.string,
  classDiff: PropTypes.string,
  email: PropTypes.string,
};

export function AuthValidationPassword({ validationPassword }) {
  return (
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
  );
}

AuthValidationPassword.propTypes = {
  validationPassword: PropTypes.object,
};

export function AuthPhoneCodes({ selectedCode, setSelectedCode, children }) {
  axios.defaults.withCredentials = true;

  const [phoneCodes, setPhoneCodes] = useState([]);
  const [openPhoneCodes, setOpenPhoneCodes] = useState(false);
  const phoneCodeModalRef = useRef(null);
  const { search, setSearch } = useSearch();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const data = res.data;

        // console.log(data);

        const getCodes = data
          .filter((item) => item.idd && item.idd.root)
          .map((item) => {
            const flag = item.flags.png;
            const name = item.name.common;
            const root = item.idd.root.replace("+", "");
            const suffixes = item.idd.suffixes;

            const codes = `+${root}${suffixes[0]}`;
            const valueCodes = parseInt(`${root}${suffixes[0]}`);

            return {
              flag,
              name,
              codes,
              valueCodes,
            };
          });

        const sortedCodes = getCodes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setPhoneCodes(sortedCodes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
  }, [openPhoneCodes, handleClickOutside]);

  const handleCodeSelect = useCallback(
    (code) => {
      setSelectedCode(code);
      setOpenPhoneCodes(false);
    },
    [setSelectedCode, setOpenPhoneCodes]
  );

  const handleSearchCountry = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <div className="phone-code-wrapper-loan">
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
                  <span className="material-symbols-rounded">search</span>
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
      {children}
    </div>
  );
}

AuthPhoneCodes.propTypes = {
  selectedCode: PropTypes.string,
  setSelectedCode: PropTypes.func,
  children: PropTypes.node,
};

export function AuthForm({
  handleForm,
  handleChange,
  values,
  hidePassword,
  setHidePassword,
  validationPassword,
  type,
  selectedCode,
  setSelectedCode,
}) {
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
            <AuthPhoneCodes
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
            >
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
            </AuthPhoneCodes>
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
        <span
          className="material-symbols-outlined"
          onClick={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? "visibility_off" : "visibility"}
        </span>
        <div className="input-border"></div>
      </div>
      {type === "signup" && (
        <AuthValidationPassword validationPassword={validationPassword} />
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

AuthForm.propTypes = {
  type: PropTypes.string,
  handleForm: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  hidePassword: PropTypes.bool,
  setHidePassword: PropTypes.func,
  validationPassword: PropTypes.object,
  phoneCodes: PropTypes.array,
  selectedCode: PropTypes.string,
  setSelectedCode: PropTypes.func,
};

// export function AuthIntegration({ toastDevelop }) {
export function AuthIntegration() {
  return (
    <div className="integration">
      {/* <button
        className="integration-item"
        onClick={() => {
          toastDevelop("continue with WhatsApp");
        }}
      >
        <img className="icon" src={whatsapp} alt="WhatsApp's Logo" />
        <span className="text">Continue with WhatsApp</span>
      </button> */}
      <Link className="integration-item" to={urlEndpoint.loginGoogle}>
        <img className="icon" src={google} alt="Google's Logo" />
        <span className="text">Continue with Google</span>
      </Link>
      {/* <button
        className="integration-item"
        onClick={() => {
          toastDevelop("continue with Facebook");
        }}
      >
        <img className="icon" src={facebook} alt="Facebook's Logo" />
        <span className="text">Continue with Facebook</span>
      </button> */}
    </div>
  );
}

// AuthIntegration.propTypes = {
//   toastDevelop: PropTypes.func,
// };
