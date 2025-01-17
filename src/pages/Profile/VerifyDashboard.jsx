import { useCallback, useRef, useState } from "react";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import PropTypes from "prop-types";

function VerifyDashboard({ setCurrentSubmenu }) {
  axios.defaults.withCredentials = true;

  const [code, setCode] = useState(new Array(6).fill(""));

  const statusRecovery = useRef(null);

  const { toastMessage, toastPromise, user } = useDashboard();

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

      const codeValue = code.join("");

      if (codeValue.length === 6) {
        const recoveryPromise = axios.post(urlEndpoint.verifyOtpPassword, {
          email: user.email,
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
              setCurrentSubmenu("d86578b0-4497-4d43-bdad-0f50af1011aa");
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
    },
    [code, setCurrentSubmenu, toastPromise, toastMessage, user.email]
  );

  return (
    <form className="recovery-dashboard" onSubmit={handleFormSubmit}>
      <div className="recovery-dashboard-text">
        Please check your email inbox for a 6-digit verification code we have
        sent to your email address. Enter the code in the field below to confirm
        your email and complete the reset password process.
      </div>
      <div className="recovery-dashboard-wrapper">
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
                document.getElementById(`code-input-${index - 1}`).focus();
              }
            }}
            onPaste={handleVerifyPaste}
            autoComplete="off"
          />
        ))}
      </div>
      <button className="recovery-dashboard-button">Submit Code</button>
    </form>
  );
}

VerifyDashboard.propTypes = {
  setCurrentSubmenu: PropTypes.func,
};

export default VerifyDashboard;
