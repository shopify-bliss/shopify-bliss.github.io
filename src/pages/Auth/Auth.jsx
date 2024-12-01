import React, { useState, useCallback, useEffect } from "react";
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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verifyEmail = searchParams.get("message");

  useEffect(() => {
    if (verifyEmail) {
      toastMessage("success", "Yess, Email is ok!!", "top-center");
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
            pending: "Submitting your signup request...",
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
            console.error("Error:", err);
          });
      } else {
        axios
          .post(urlEndpoint.loginForm, {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
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
