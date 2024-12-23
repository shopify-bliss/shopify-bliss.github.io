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
import SmoothScroll from "../../helpers/SmoothScroll";

function Auth({ typeMain }) {
  axios.defaults.withCredentials = true;
  const cookies = new Cookies(null, { path: "/" });

  const [values, setValues] = useState({
    email: "",
    username: "",
    phone: "",
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

  const userRole = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const verifyEmail = searchParams.get("message");
  const getTokenParams = searchParams.get("shopify-bliss");
  const getRoleParams = searchParams.get("role");

  useEffect(() => {
    if (verifyEmail) {
      toastMessage("success", verifyEmail, {
        position: "top-center",
      });

      const params = new URLSearchParams(window.location.search);
      params.delete("message");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, document.title, newUrl);
    }
  }, [verifyEmail]);

  useEffect(() => {
    if (getTokenParams && getRoleParams) {
      cookies.set("shopify-bliss", getTokenParams);

      const params = new URLSearchParams(window.location.search);
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
  }, [getTokenParams, getRoleParams, cookies, navigate]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const data = res.data;

        console.log(data);
        

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

  const handleChange = useCallback((e) => {
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
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (typeMain === "signup") {
        signupSchema
          .validate(
            {
              email: values.email,
              username: values.username,
              phone: values.phone,
              password: values.password,
            },
            { abortEarly: false }
          )
          .then(() => {
            const signupPromise = axios.post(urlEndpoint.signupForm, {
              email: values.email,
              username: values.username,
              phone: selectedCode + values.phone,
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
                autoClose: 5000,
                position: "top-center",
              }
            );

            signupPromise
              .then((res) => {
                console.log(res.data);
                setValues("");
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
            if (userRole.current === "admin") {
              navigate("/dashboard");
            } else if (userRole.current === "customer") {
              navigate("/profile");
            }
          }
        );

        loginPromise
          .then((res) => {
            // console.log(res.data);
            const token = res.data.token;

            cookies.set("shopify-bliss", token);
            const decoded = jwtDecode(token);

            if (decoded.role === "admin" || decoded.role === "customer") {
              userRole.current = decoded.role;
            } else {
              toastMessage("error", "Access denied. Role not recognized.");
            }
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
    }
  }, [location.state, navigate, toastMessage, location.pathname]);

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

            {typeMain !== "signup" && (
              <>
                <div className="divider"></div>
                <AuthIntegration type={typeMain} toastDevelop={toastDevelop} />
              </>
            )}
          </div>
          {typeMain === "signup" ? (
            ""
          ) : (
            <Link className="auth-content-problems" to={"/404"}>
              Can't Log In
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Auth;
