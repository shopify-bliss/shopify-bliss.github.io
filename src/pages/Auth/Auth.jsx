import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo/black_logo_nobg.png";
import urlEndpoint from "../../helpers/urlEndpoint";
import axios from "axios";
import {
  AuthHeader,
  AuthTitle,
  AuthIntegration,
  AuthForm,
} from "../../components/AuthSupport/AuthSupport";
import { ToastContainer } from "react-toastify";
import { toastMessage, toastPromise } from "../../helpers/AlertMessage";

function AuthComponents({ typeMain }) {
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const userRole = useRef(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verifyEmail = searchParams.get("message");

  useEffect(() => {
    if (verifyEmail) {
      console.log(verifyEmail);
      toastMessage("success", verifyEmail, "top-center");
    }
  }, []);

  const handleChange = useCallback((e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (typeMain === "signup") {
        const signupPromise = axios.post(urlEndpoint.signupForm, {
          email: values.email,
          username: values.username,
          password: values.password,
        });

        toastPromise(
          signupPromise,
          {
            pending: "Signup in progress, please wait.",
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
          })
          .catch((err) => {
            console.error(err);
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
            console.log("userRole in onClose:", userRole.current);

            if (userRole.current === "admin") {
              navigate("/dashboard");
            } else if (userRole.current === "customer") {
              navigate("/profile");
            }
          }
        );

        loginPromise
          .then((res) => {
            console.log(res.data);
            const role = res.data.data.role;

            console.log(role);

            if (role === "admin" || role === "customer") {
              userRole.current = role;
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
              handleChange={handleChange}
              handleForm={handleFormSubmit}
              type={typeMain}
            />

            {typeMain !== "signup" && (
              <>
                <div className="divider"></div>
                <AuthIntegration type={typeMain} toastMessage={toastMessage} />
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

export function Login() {
  return <AuthComponents typeMain={"login"} />;
}

export function Signup() {
  return <AuthComponents typeMain={"signup"} />;
}
