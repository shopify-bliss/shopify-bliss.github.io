import React, { useEffect, Fragment, useMemo, useState } from "react";
import {
  Quit,
  Logo,
  DefaultFooter,
  useHandleActiveEl,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionData from "../../../data/sections.json";
import { ControllingOverviews } from "../../../components/AiBuilderSupport/AiBuilderSupport";
import NavbarLayout from "../../../components/AiBuilderSupport/NavbarLayout/NavbarLayout";
import IntroEl from "./IntroEl/IntroEl";
import ProductsEl from "./ProductsEl/ProductsEl";
import ServicesEl from "./ServicesEl/ServicesEl";

function ElementPages({
  activePages,
  activeSections,
  handleActiveSection,
  siteTitle,
  dataPages,
  currentPageId,
  setCurrentPageId,
  toastMessage,
  // dataElements,
  // fetchDataElements,
}) {
  // useEffect(() => {
  //   fetchDataElements();
  // }, [fetchDataElements]);

  const [activeIntroEl, setActiveIntroEl] = useState(1);
  const [activeNavbar, setActiveNavbar] = useState(1);

  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
  });

  const handleActiveNavbar = useHandleActiveEl({
    setActiveEl: setActiveNavbar,
  });
  const handleActiveIntroEl = useHandleActiveEl({
    setActiveEl: setActiveIntroEl,
  });

  return (
    <>
      <div className="ai-builder-overview">
        <Logo />
        <div className="element-pages">
          <div className="element-pages-core">
            <div
              className={`prev-button ${activePages.length < 4 ? "none" : ""}`}
            >
              <span className="material-symbols-outlined" onClick={handlePrev}>
                arrow_back_ios_new
              </span>
            </div>

            <div className="display-data">
              <NavbarLayout
                activePages={activePages}
                dataPages={dataPages}
                siteTitle={siteTitle}
                currentPageId={currentPageId}
                activeNavbar={activeNavbar}
                handleActiveNavbar={handleActiveNavbar}
                activeIntroEl={activeIntroEl}
                toastMessage={toastMessage}
              />
              {currentPageId !== null && (
                <div className="display-data-section">
                  {sectionData
                    .filter((section) =>
                      activeSections[currentPageId]?.includes(section.id)
                    )
                    .map((section) => (
                      <Fragment key={section.id}>
                        {section.id === 1 ? (
                          <IntroEl
                            handleActiveIntroEl={handleActiveIntroEl}
                            activeIntroEl={activeIntroEl}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                          />
                        ) : section.id === 2 ? (
                          <ProductsEl toastMessage={toastMessage} />
                        ) : section.id === 3 ? (
                          <ServicesEl toastMessage={toastMessage} />
                        ) : (
                          <div className="text">{section.name}</div>
                        )}
                      </Fragment>
                    ))}
                </div>
              )}
              <DefaultFooter dataPages={dataPages} />
            </div>
            <div
              className={`next-button  ${activePages.length < 4 ? "none" : ""}`}
              onClick={handleNext}
            >
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ai-builder-content">
        <Quit />
        <div className="element-pages">
          <div className="element-pages-title">
            Build your site pages and components
          </div>
          <div className="element-pages-desc">
            Design your components and pages step-by-step, adding as many or as
            few sections as needed to achieve your desired structure.
          </div>
          <div className="content">
            {sectionData.map((section) => (
              <div
                className={`content-item ${
                  activeSections[currentPageId]?.includes(section.id)
                    ? "active"
                    : ""
                }`}
                key={section.id}
                onClick={() => handleActiveSection(section.id)}
              >
                {activeSections[currentPageId]?.includes(section.id) ? (
                  <span className="material-symbols-outlined">task_alt</span>
                ) : (
                  <span className="material-symbols-outlined">
                    radio_button_unchecked
                  </span>
                )}
                <div className="content-item-text">{section.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ElementPages;
