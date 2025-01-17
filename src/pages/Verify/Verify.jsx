import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/black-logo.png";
import urlEndpoint from "../../helpers/urlEndpoint";
import axios from "axios";
import {
  AuthHeader,
  AuthTitle,
} from "../../components/AuthSupport/AuthSupport";
import { ToastContainer } from "react-toastify";
import { toastMessage, toastPromise } from "../../helpers/AlertMessage";
import PropTypes from "prop-types";

function Verify({ typeMain = null }) {
  axios.defaults.withCredentials = true;

  const [code, setCode] = useState(new Array(6).fill(""));

  const statusVerify = useRef(null);
  const statusRecovery = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

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

      if (typeMain === "verify") {
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
      } else {
        const codeValue = code.join("");

        if (codeValue.length === 6) {
          const recoveryPromise = axios.post(urlEndpoint.verifyOtpPassword, {
            email: location.state?.email,
            otp: codeValue,
          });
          toastPromise(
            recoveryPromise,
            {
              pending: "Reset password in progress, please wait..",
              success: "Reset password verified successfully! 🎉",
              error: "Failed to verify reset password, please try again!",
            },
            {
              position: "top-center",
            },
            () => {
              if (statusRecovery.current === true) {
                navigate("/reset-password", {
                  state: {
                    messageNoEmail: location.state?.email,
                  },
                });
              }
            }
          );

          recoveryPromise
            .then((res) => {
              // console.log(res.data);

              statusRecovery.current = res.data.success;
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          toastMessage("error", "Please enter all 6 digits.");
        }
      }
    },
    [typeMain, code, navigate, location.state]
  );

  useEffect(() => {
    if (typeMain === "verify" && !location.state) {
      navigate("/login", {
        state: {
          messageNoEmail:
            "Email is missing. Please go back to the previous step and ensure your email is entered correctly!",
        },
      });
    } else if (typeMain === "verify-password" && !location.state) {
      navigate("/recovery", {
        state: {
          messageNoEmail:
            "Email is missing. Please go back to the previous step and ensure your email is entered correctly!",
        },
      });
    }
  }, [navigate, location.state, typeMain]);

  return (
    <>
      <div className="verify">
        <div className="verify-header">
          <AuthHeader type={typeMain} classDiff="verify" />
        </div>
        <div className="verify-content">
          <AuthTitle logo={logo} type={typeMain} classDiff="verify" />
          <form className="verify-content-core" onSubmit={handleFormSubmit}>
            <div className="verify-content-core-wrapper">
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
                    if (e.key === "Backspace" && !code[index] && index > 0) {
                      document
                        .getElementById(`code-input-${index - 1}`)
                        .focus();
                    }
                  }}
                  onPaste={handleVerifyPaste}
                  autoComplete="off"
                />
              ))}
            </div>
            <button className="verify-content-core-button">Submit Code</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

Verify.propTypes = {
  typeMain: PropTypes.string,
};

export default Verify;
