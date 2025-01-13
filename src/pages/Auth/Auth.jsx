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
import Cookies from "js-cookie";

function Auth({ typeMain }) {
  axios.defaults.withCredentials = true;

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

  const statusSignup = useRef(null);
  const statusLogin = useRef(null);

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
      Cookies.set("shopify-bliss", getTokenParams, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      params.delete("shopify-bliss");
      params.delete("role");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, document.title, newUrl);

      navigate("/dashboard", {
        state: { messageLoginGoogle: "Login successfully!" },
      });
    }
  }, [searchParams, navigate]);

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
                  navigate("/verify-email", {
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
      } else {
        const loginPromise = axios.post(urlEndpoint.loginForm, {
          email: values.email,
          password: values.password,
        });

        toastPromise(
          loginPromise,
          {
            pending: "Login in progress, please wait.",
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

            Cookies.set("shopify-bliss", token, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            setValues("");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [values, typeMain]
  );

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
        autoClose: 3500,
      });
      navigate(location.pathname, {
        state: { ...location.state, messageNoEmail: undefined },
        replace: true,
      });
    } else if (location.state?.messageTimeout) {
      toastMessage("info", location.state.messageTimeout, {
        position: "top-center",
        autoClose: 3500,
      });
      navigate(location.pathname, {
        state: { ...location.state, messageTimeout: undefined },
        replace: true,
      });
    } else if (location.state?.messageSessionExpired) {
      toastMessage("info", location.state.messageSessionExpired, {
        position: "top-center",
        autoClose: 3500,
      });
      navigate(location.pathname, {
        state: { ...location.state, messageSessionExpired: undefined },
        replace: true,
      });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <>
      <div className="auth">
        <div className="auth-header">
          <AuthHeader type={typeMain} />
        </div>
        <div className="auth-content">
          <AuthTitle logo={logo} type={typeMain} />
          <div
            className={`auth-content-core ${
              typeMain === "signup" ? "signup" : ""
            }`}
          >
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

            {typeMain === "login" && (
              <>
                <div className="divider"></div>
                <AuthIntegration type={typeMain} toastDevelop={toastDevelop} />
              </>
            )}
          </div>
          {typeMain === "login" ? (
            <Link to="/recovery" className="auth-content-problems">
              Can't Log In
            </Link>
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
