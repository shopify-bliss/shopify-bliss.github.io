import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import logo from "../../assets/logo/black-logo.png";
import urlEndpoint from "../../helpers/urlEndpoint";
import axios from "axios";
import { signupSchema } from "../../helpers/ValidationSchema";
import {
  AuthHeader,
  AuthTitle,
  AuthIntegration,
  AuthForm,
} from "../../components/AuthSupport/AuthSupport";
import { ToastContainer } from "react-toastify";
import {
  toastMessage,
  toastPromise,
  toastDevelop,
} from "../../helpers/AlertMessage";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

function Auth({ typeMain }) {
  axios.defaults.withCredentials = true;
  const cookies = new Cookies(null, { path: "/" });

  const [values, setValues] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
  });
  const [phoneCodes, setPhoneCodes] = useState([]);
  const [hidePassword, setHidePassword] = useState(true);
  const [validationPassword, setValidationPassword] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [selectedCode, setSelectedCode] = useState(62);
  const [code, setCode] = useState(new Array(6).fill(""));

  const statusSignup = useRef(null);
  const statusLogin = useRef(null);
  const statusVerify = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = searchParams.get("message");
    const getTokenParams = searchParams.get("shopify-bliss");
    const getRoleParams = searchParams.get("role");

    const params = new URLSearchParams(window.location.search);

    if (verifyEmail) {
      toastMessage("success", verifyEmail, {
        position: "top-center",
      });

      params.delete("message");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, document.title, newUrl);
    } else if (getTokenParams && getRoleParams) {
      cookies.set("shopify-bliss", getTokenParams);

      params.delete("shopify-bliss");
      params.delete("role");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, document.title, newUrl);

      if (getRoleParams === "admin") {
        navigate("/dashboard", {
          state: { messageLoginGoogle: "Login successfully!" },
        });
      } else if (getRoleParams === "customer") {
        navigate("/profile", {
          state: { messageLoginGoogle: "Login successfully!" },
        });
      }
    }
  }, [cookies, navigate]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const data = res.data;

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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      if (name === "password") {
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

  const handleVerifyChange = useCallback(
    (e, index) => {
      const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
      if (value.length <= 1) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Automatically focus on the next input
        if (value && index < 5) {
          document.getElementById(`code-input-${index + 1}`).focus();
        }
      }
    },
    [code]
  );

  const handleVerifyPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setCode(newCode);

      // Focus on the last input to indicate completion
      document.getElementById("code-input-5").focus();
    } else {
      toastMessage("error", "Invalid code format. Please paste 6 digits.");
    }
  };

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (typeMain === "signup") {
        signupSchema
          .validate(
            {
              email: values.email,
              username: values.username,
              phoneNumber: values.phoneNumber,
              password: values.password,
            },
            { abortEarly: false }
          )
          .then(() => {
            const signupPromise = axios.post(urlEndpoint.signupForm, {
              email: values.email,
              username: values.username,
              phoneNumber: selectedCode + values.phoneNumber,
              password: values.password,
            });

            toastPromise(
              signupPromise,
              {
                pending: "Signup in progress, please wait..",
                success: "Signup successful! 🎉",
                error: "Failed to signup, please try again!",
              },
              {
                autoClose: 3500,
                position: "top-center",
              },
              () => {
                if (statusSignup.current === true) {
                  navigate("/verify-code", {
                    state: {
                      email: values.email,
                    },
                  });
                }
              }
            );

            signupPromise
              .then((res) => {
                // console.log(res);
                statusSignup.current = res.data.success;

                setValues("");
                setValidationPassword({
                  length: false,
                  uppercase: false,
                  lowercase: false,
                  number: false,
                  special: false,
                });
              })
              .catch((err) => {
                console.error(err);
                toastMessage("error", err, {
                  position: "top-center",
                });
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
      } else if (typeMain === "login") {
        const loginPromise = axios.post(urlEndpoint.loginForm, {
          email: values.email,
          password: values.password,
        });

        toastPromise(
          loginPromise,
          {
            pending: "Log in progress, please wait.",
            success: "Login successful! 🎉",
            error: "Failed to login, please try again!",
          },
          {
            position: "top-center",
          },
          () => {
            if (statusLogin.current === 200) {
              navigate("/dashboard");
            }
          }
        );

        loginPromise
          .then((res) => {
            // console.log(res.data);
            const token = res.data.token;

            statusLogin.current = res.status;

            cookies.set("shopify-bliss", token);
            const decoded = jwtDecode(token);

            if (!decoded.role) {
              toastMessage("error", "Access denied. Role not recognized.");
            }

            setValues("");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        const codeValue = code.join("");

        if (codeValue.length === 6) {
          const verifyPromise = axios.post(urlEndpoint.verifyEmail, {
            code: codeValue,
            email: location.state.email,
          });
          toastPromise(
            verifyPromise,
            {
              pending: "Verification in progress, please wait..",
              success: "Email verified successfully! 🎉",
              error: "Failed to verify email, please try again!",
            },
            {
              position: "top-center",
            },
            () => {
              if (statusVerify.current === true) {
                navigate("/login");
              }
            }
          );

          verifyPromise
            .then((res) => {
              // console.log(res.data);

              statusVerify.current = res.data.success;
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          toastMessage("error", "Please enter all 6 digits.");
        }
      }
    },
    [values, typeMain, code]
  );

  useEffect(() => {
    if (typeMain === "verify" && !location.state) {
      navigate("/login", {
        state: {
          messageNoEmail:
            "Email is missing. Please go back to the previous step and ensure your email is entered correctly!",
        },
      });
    }
  }, [typeMain, navigate, location.state]);

  useEffect(() => {
    if (location.state?.messageLogout) {
      toastMessage("success", location.state.messageLogout);
      navigate(location.pathname, {
        state: { ...location.state, messageLogout: undefined },
        replace: true,
      });
    } else if (location.state?.messageNoEmail) {
      toastMessage("warn", location.state.messageNoEmail, {
        position: "top-center",
        autoClose: 5000,
      });
      navigate(location.pathname, {
        state: { ...location.state, messageNoEmail: undefined },
        replace: true,
      });
    }
  }, [location.state, navigate, toastMessage, location.pathname]);

  const AuthContentElement = typeMain === "verify" ? "form" : "div";

  return (
    <>
      <div className="auth">
        <div className="auth-header">
          <AuthHeader type={typeMain} />
        </div>
        <div className="auth-content">
          <AuthTitle logo={logo} type={typeMain} />
          <AuthContentElement
            className={`auth-content-core ${
              typeMain === "signup"
                ? "signup"
                : typeMain === "verify"
                ? "verify"
                : ""
            }`}
            onSubmit={typeMain === "verify" ? handleFormSubmit : null}
          >
            {typeMain !== "verify" && (
              <>
                <AuthForm
                  values={values}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  validationPassword={validationPassword}
                  handleChange={handleChange}
                  handleForm={handleFormSubmit}
                  type={typeMain}
                  phoneCodes={phoneCodes}
                  selectedCode={selectedCode}
                  setSelectedCode={setSelectedCode}
                />

                {typeMain !== "signup" && (
                  <>
                    <div className="divider"></div>
                    <AuthIntegration
                      type={typeMain}
                      toastDevelop={toastDevelop}
                    />
                  </>
                )}
              </>
            )}

            {typeMain === "verify" && (
              <>
                <div className="verify-wrapper">
                  {code.map((value, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      className="code-number"
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleVerifyChange(e, index)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !code[index] &&
                          index > 0
                        ) {
                          document
                            .getElementById(`code-input-${index - 1}`)
                            .focus();
                        }
                      }}
                      onPaste={handleVerifyPaste}
                    />
                  ))}
                </div>
                <button className="code-button">Submit Code</button>
              </>
            )}
          </AuthContentElement>
          {typeMain === "login" ? (
            <span
              className="auth-content-problems"
              onClick={() => toastDevelop("can't log in")}
            >
              Can't Log In
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Auth;
