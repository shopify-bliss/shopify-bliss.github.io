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
import IntroEl from "./IntroEl/IntroEl";
import ProductsEl from "./ProductsEl/ProductsEl";
import ServicesEl from "./ServicesEl/ServicesEl";
import AboutEl from "./AboutEl/AboutEl";

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
}) {
  const [activeNavbar, setActiveNavbar] = useState(1);
  const [activeIntroEl, setActiveIntroEl] = useState(1);
  const [activeProductsEl, setActiveProductsEl] = useState(1);
  const [activeServicesEl, setActiveServicesEl] = useState(1);
  const [activeAboutEl, setActiveAboutEl] = useState(1);
  const [activeStyles, setActiveStyles] = useState({});

  useEffect(() => {
    console.log(activeStyles);
  }, [activeStyles]);

  useEffect(() => {
    if (!currentPageId) return;

    const currentActiveSections = activeSections[currentPageId] || [];

    const updatedStyles = currentActiveSections.reduce((styles, sectionId) => {
      if (sectionId === "798f1ce0-b732-45a6-838e-f28e137243f7") {
        styles[sectionId] = activeIntroEl;
      } else if (sectionId === "b42d4d56-d411-4aa8-ae01-52f0c406328a") {
        styles[sectionId] = activeProductsEl;
      } else if (sectionId === "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8") {
        styles[sectionId] = activeServicesEl;
      } else if (sectionId === "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed") {
        styles[sectionId] = activeAboutEl;
      }
      return styles;
    }, {});

    activePages.forEach((pageId) => {
      if (pageId === "2bff7888-e861-4341-869b-189af29ad3f8") {
        updatedStyles[pageId] = activeNavbar;
      }
    });

    setActiveStyles((prevStyles) => ({
      ...prevStyles,
      [currentPageId]: updatedStyles,
    }));
  }, [
    currentPageId,
    activeIntroEl,
    activeProductsEl,
    activeServicesEl,
    activeAboutEl,
    activeNavbar,
    activeSections,
    activePages,
  ]);

  const handleActiveNavbar = useCallback(
    (navbarId) => {
      setActiveNavbar(navbarId);

      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          ["2bff7888-e861-4341-869b-189af29ad3f8"]: navbarId,
        },
      }));
    },
    [currentPageId]
  );

  const handleActiveIntroEl = useCallback(
    (introElId) => {
      setActiveIntroEl(introElId);

      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          ["798f1ce0-b732-45a6-838e-f28e137243f7"]: introElId,
        },
      }));
    },
    [currentPageId]
  );

  const handleActiveProductsEl = useCallback(
    (productElId) => {
      setActiveProductsEl(productElId);

      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          ["b42d4d56-d411-4aa8-ae01-52f0c406328a"]: productElId,
        },
      }));
    },
    [currentPageId]
  );

  const handleActiveServicesEl = useCallback(
    (serviceElId) => {
      setActiveServicesEl(serviceElId);

      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          ["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"]: serviceElId,
        },
      }));
    },
    [currentPageId]
  );

  const handleActiveAboutEl = useCallback(
    (aboutElId) => {
      setActiveAboutEl(aboutElId);

      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          ["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"]: aboutElId,
        },
      }));
    },
    [currentPageId]
  );

  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
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
                          <IntroEl
                            handleActiveIntroEl={handleActiveIntroEl}
                            activeIntroEl={activeIntroEl}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                          />
                        ) : section.section_id ===
                          "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                          <ProductsEl
                            handleActiveProductsEl={handleActiveProductsEl}
                            activeProductsEl={activeProductsEl}
                            toastMessage={toastMessage}
                          />
                        ) : section.section_id ===
                          "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                          <ServicesEl
                            handleActiveServicesEl={handleActiveServicesEl}
                            activeServicesEl={activeServicesEl}
                            toastMessage={toastMessage}
                          />
                        ) : section.section_id ===
                          "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                          <AboutEl
                            handleActiveAboutEl={handleActiveAboutEl}
                            activeAboutEl={activeAboutEl}
                            toastMessage={toastMessage}
                          />
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
