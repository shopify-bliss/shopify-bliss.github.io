import { useEffect, Fragment } from "react";
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
import FirstComponent from "../../../components/AiBuilderSupport/FirstComponent";
import { BgColors } from "../../../components/AiBuilderSupport/ColorsSupport";
import PropTypes from "prop-types";

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
  activeColors,
  activeFonts,
}) {
  const { handleNext, handlePrev } = ControllingOverviews({
    activePages,
    currentPageId,
    setCurrentPageId,
  });
  const { firstProduct, firstService, firstAbout, firstForm } = FirstComponent({
    activeSections: activeSections,
    currentPageId: currentPageId,
  });

  const bg = BgColors({ activeColors });

  useEffect(() => {
    console.log(activeSections);

    console.log(activeSections[currentPageId]);
  }, [activeSections, currentPageId]);

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

            <div className={`display-data ${bg}`}>
              <NavbarLayout
                activePages={activePages}
                dataPages={dataPages}
                activeSections={activeSections}
                siteTitle={siteTitle}
                currentPageId={currentPageId}
                activeNavbar={activeNavbar}
                handleActiveNavbar={handleActiveNavbar}
                activeIntro={activeIntro}
                toastMessage={toastMessage}
                typeMain="element"
                activeFonts={activeFonts}
                activeColors={activeColors}
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
                            activeSections={activeSections}
                            currentPageId={currentPageId}
                            handleActiveIntro={handleActiveIntro}
                            activeIntro={activeIntro}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                          <Products
                            handleActiveProducts={handleActiveProducts}
                            activeProducts={activeProducts}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            firstProduct={firstProduct}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                          <Services
                            handleActiveServices={handleActiveServices}
                            activeServices={activeServices}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            firstService={firstService}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                          <About
                            handleActiveAbout={handleActiveAbout}
                            activeAbout={activeAbout}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            firstAbout={firstAbout}
                            typeMain="element"
                          />
                        ) : section.section_id ===
                          "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e" ? (
                          <Form
                            handleActiveForm={handleActiveForm}
                            activeForm={activeForm}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            firstForm={firstForm}
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
                key={section.section_id}
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

ElementPages.propTypes = {
  activePages: PropTypes.array,
  activeSections: PropTypes.object,
  siteTitle: PropTypes.string,
  dataPages: PropTypes.array,
  currentPageId: PropTypes.string,
  setCurrentPageId: PropTypes.func,
  toastMessage: PropTypes.func,
  activeNavbar: PropTypes.bool,
  handleActiveIntro: PropTypes.func,
  handleActiveProducts: PropTypes.func,
  handleActiveServices: PropTypes.func,
  handleActiveAbout: PropTypes.func,
  handleActiveForm: PropTypes.func,
  handleActiveNavbar: PropTypes.func,
  dataElements: PropTypes.array,
  activeIntro: PropTypes.string,
  activeProducts: PropTypes.string,
  activeServices: PropTypes.string,
  activeAbout: PropTypes.string,
  activeForm: PropTypes.string,
  activeColors: PropTypes.string,
  activeFonts: PropTypes.string,
  handleActiveSection: PropTypes.func,
};

export default ElementPages;
