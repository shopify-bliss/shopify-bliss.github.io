import React, { useState, Fragment } from "react";
import SmoothScroll from "../../helpers/SmoothScroll";
import { Link } from "react-router-dom";
import SiteInfo from "./SiteInfo/SiteInfo";
import PagesAi from "./PagesAi/PagesAi";

const steps = [
  { icon: "info", text: "Site info" },
  { icon: "stacks", text: "Pages" },
  { icon: "grid_view", text: "Components" },
  { icon: "colors", text: "Colors" },
  { icon: "text_fields", text: "Fonts" },
];

function AiBuilder() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <SmoothScroll />
      <div className="ai-builder">
        <div className="ai-builder-header">
          <Link to="/" className="logo">
            <span className="material-symbols-outlined logo-icon">
              local_mall
            </span>
            <span className="logo-text">Shopify Bliss</span>
          </Link>
          <span className="material-symbols-outlined quit">close</span>
        </div>
        {currentStep === 0 && <SiteInfo />}
        {currentStep === 1 && <PagesAi />}
        <div className="ai-builder-steps">
          <button
            onClick={handlePrev}
            className="prev-button"
            disabled={currentStep === 0}
          >
            back
          </button>
          <div className="step-list">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <div
                  className={`step ${index <= currentStep ? "active" : ""}`}
                >
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
          <button
            onClick={handleNext}
            className="next-button"
            disabled={currentStep === steps.length - 1}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default AiBuilder;
