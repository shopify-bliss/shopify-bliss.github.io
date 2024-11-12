import React, { useState, Fragment, useCallback } from "react";
import SiteInfo from "./SiteInfo/SiteInfo";
import PagesAi from "./PagesAi/PagesAi";
import { siteTitleSchema } from "../../helpers/ValidationSchema";
import { toastMessage } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";

const steps = [
  { icon: "info", text: "Site info" },
  { icon: "stacks", text: "Pages" },
  { icon: "grid_view", text: "Components" },
  { icon: "colors", text: "Colors" },
  { icon: "text_fields", text: "Fonts" },
];

function AiBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [siteTitle, setSiteTitle] = useState("");
  const maxChars = 60;

  const handleSiteTitleInput = useCallback((e) => {
    const inputSiteTitle = e.target.value;
    if (inputSiteTitle.length <= maxChars) {
      setSiteTitle(inputSiteTitle);
    }
  }, []);

  const handleNext = () => {
    if (currentStep === 4) {
      siteTitleSchema
        .validate({ title: siteTitle }, { abortEarly: false })
        .then(() => {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        })
        .catch((err) => {
          toastMessage("error", err.errors[0], "top-center");
        });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <div className="ai-builder">
        {currentStep === 0 && (
          <SiteInfo
            siteTitle={siteTitle}
            maxChars={maxChars}
            handleSiteTitleInput={handleSiteTitleInput}
          />
        )}
        {currentStep === 1 && <PagesAi siteTitle={siteTitle} />}
        <div className="ai-builder-steps">
          <div className="step-prev">
            <button
              onClick={handlePrev}
              className="prev-button"
              disabled={currentStep === 0}
            >
              back
            </button>
          </div>
          <div className="step-list">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <div className={`step ${index <= currentStep ? "active" : ""}`}>
                  <span className="material-symbols-outlined step-icon">
                    {step.icon}
                  </span>
                  <div className="step-text">{step.text}</div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`line-divider ${
                      index <= currentStep ? "active" : ""
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <div className="step-next">
            <button onClick={handleNext} className="next-button">
              {currentStep === steps.length - 1 ? "finish" : "next"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AiBuilder;
