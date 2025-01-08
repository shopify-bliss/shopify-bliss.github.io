import React, {
  useEffect,
  Fragment,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  Quit,
  Logo,
  DefaultFooter,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import { ControllingOverviews } from "../../../components/AiBuilderSupport/AiBuilderSupport";
import NavbarLayout from "../../../components/AiBuilderSupport/NavbarLayout/NavbarLayout";
import Intro from "../../../components/AiBuilderSupport/ElementsLayout/Intro/Intro";
import Products from "../../../components/AiBuilderSupport/ElementsLayout/Products/Products";
import Services from "../../../components/AiBuilderSupport/ElementsLayout/Services/Services";
import About from "../../../components/AiBuilderSupport/ElementsLayout/About/About";
import Form from "../../../components/AiBuilderSupport/ElementsLayout/Form/Form";

function ElementPages({
  activePages,
  activeSections,
  handleActiveSection,
  siteTitle,
  dataPages,
  currentPageId,
  setCurrentPageId,
  toastMessage,
  dataElements,
  activeNavbar,
  handleActiveNavbar,
  activeIntro,
  handleActiveIntro,
  activeProducts,
  handleActiveProducts,
  activeServices,
  handleActiveServices,
  activeAbout,
  handleActiveAbout,
  activeForm,
  handleActiveForm,
  activeColor,
  activeFont,
  activeStyles,
}) {
  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
  });

  useEffect(() => {
    console.log(activeStyles);
  }, [activeStyles]);

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
                activeIntro={activeIntro}
                toastMessage={toastMessage}
                typeMain="element"
                activeFont={activeFont}
                activeColor={activeColor}
              />
              {currentPageId !== null && (
                <div className="display-data-section">
                  {dataElements
                    .filter((section) =>
                      activeSections[currentPageId]?.includes(
                        section.section_id
                      )
                    )
                    .map((section) => (
                      <Fragment key={section.section_id}>
                        {section.section_id ===
                        "798f1ce0-b732-45a6-838e-f28e137243f7" ? (
                          <Intro
                            handleActiveIntro={handleActiveIntro}
                            activeIntro={activeIntro}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                          <Products
                            handleActiveProducts={handleActiveProducts}
                            activeProducts={activeProducts}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                          <Services
                            handleActiveServices={handleActiveServices}
                            activeServices={activeServices}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                          <About
                            handleActiveAbout={handleActiveAbout}
                            activeAbout={activeAbout}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e" ? (
                          <Form
                            handleActiveForm={handleActiveForm}
                            activeForm={activeForm}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                            typeMain="element"
                          />
                        ) : (
                          <div className="no-element">{section.name}</div>
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
            {dataElements.map((section) => (
              <div
                className={`content-item ${
                  activeSections[currentPageId]?.includes(section.section_id)
                    ? "active"
                    : ""
                }`}
                key={section.id}
                onClick={() => handleActiveSection(section.section_id)}
              >
                {activeSections[currentPageId]?.includes(section.section_id) ? (
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
