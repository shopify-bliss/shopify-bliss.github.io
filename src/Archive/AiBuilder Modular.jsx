import React, {
  useState,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import SiteInfo from "./SiteInfo/SiteInfo";
import PagesAi from "./PagesAi/PagesAi";
import ElementPages from "./ElementPages/ElementPages";
import Colors from "./Colors/Colors";
import Fonts from "./Fonts/Fonts";
import { siteTitleSchema } from "../../helpers/ValidationSchema";
import { toastMessage } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import { LoaderProgress } from "../../components/LoaderProgress/LoaderProgress";
import urlEndpoint from "../../helpers/urlEndpoint";
import steps from "../../data/steps.json";
import axios from "axios";
import SiteInfoLogic from "../../components/AiBuilderSupport/AiBuilderLogics/SiteInfoLogic";
import PagesLogic from "../../components/AiBuilderSupport/AiBuilderLogics/PagesLogic";
import SectionsLogic from "../../components/AiBuilderSupport/AiBuilderLogics/SectionsLogic";
import ColorsLogic from "../../components/AiBuilderSupport/AiBuilderLogics/ColorsLogic";
import FontsLogic from "../../components/AiBuilderSupport/AiBuilderLogics/FontsLogic";

function AiBuilder() {
  axios.defaults.withCredentials = true;

  const { siteTitle, maxChars, handleSiteTitleInput } = SiteInfoLogic();
  const {
    initialPageId,
    activePages,
    currentPageId,
    setCurrentPageId,
    dataPages,
    isLoadingPagesAi,
    handleActivePage,
    fetchDataPages,
  } = PagesLogic();
  const {
    activeSections,
    dataElements,
    isLoadingElementPages,
    handleActiveSection,
    fetchDataElements,
  } = SectionsLogic();
  const { activeColors, handleactiveColors } = ColorsLogic();
  const { activeFonts, handleactiveFonts } = FontsLogic();

  const activeStylesTemplate = useMemo(
    () => ({
      intro: 1,
      products: 1,
      services: 1,
      about: 1,
      form: 1,
      navbar: 1,
    }),
    []
  );

  const sectionMapping = useMemo(
    () => ({
      intro: "798f1ce0-b732-45a6-838e-f28e137243f7",
      products: "b42d4d56-d411-4aa8-ae01-52f0c406328a",
      services: "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8",
      about: "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed",
      form: "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e",
      navbar: "2bff7888-e861-4341-869b-189af29ad3f8",
    }),
    []
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [navbarStyle, setNavbarStyle] = useState(activeStylesTemplate.navbar);
  const [pageStyles, setPageStyles] = useState({});
  const [mergedPageStyles, setMergedPageStyles] = useState({});

  useEffect(() => {
    if (currentStep === 1) {
      fetchDataPages();
    } else if (currentStep === 2) {
      fetchDataElements();
    }
  }, [currentStep, fetchDataPages, fetchDataElements]);

  // Inisialisasi gaya halaman jika belum ada
  useEffect(() => {
    if (!currentPageId || pageStyles[currentPageId]) return;

    setPageStyles((prevStyles) => ({
      ...prevStyles,
      [currentPageId]: {
        ...activeStylesTemplate,
      },
    }));
  }, [currentPageId, activeStylesTemplate, pageStyles]);

  // Fungsi untuk memperbarui gaya
  const updatePageStyle = (section, value) => {
    setPageStyles((prevStyles) => {
      const updatedPageStyles = {
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          [section]: value,
        },
      };

      // Jika `section` adalah `navbar`, perbarui `navbarStyle` global
      if (section === "navbar") {
        setNavbarStyle(value);
        // Sinkronkan gaya `navbar` ke semua halaman
        Object.keys(updatedPageStyles).forEach((pageId) => {
          updatedPageStyles[pageId] = {
            ...updatedPageStyles[pageId],
            navbar: value,
          };
        });
      }

      return updatedPageStyles;
    });
  };

  // Hitung gaya halaman saat ini
  const currentPageStyles = useMemo(() => {
    const activeSectionsForPage = activeSections[currentPageId] || [];

    const filteredStyles = Object.entries(activeStylesTemplate)
      .filter(([section]) =>
        activeSectionsForPage.includes(sectionMapping[section])
      )
      .reduce((acc, [section, styleValue]) => {
        acc[section] = styleValue;
        return acc;
      }, {});

    return {
      navbar: navbarStyle, // Gunakan gaya navbar global
      ...filteredStyles,
      ...(pageStyles[currentPageId] || {}),
    };
  }, [
    pageStyles,
    currentPageId,
    activeStylesTemplate,
    activeSections,
    sectionMapping,
    navbarStyle,
  ]);

  // Perbarui gaya gabungan untuk semua halaman
  useEffect(() => {
    setMergedPageStyles(() => {
      const filteredStyles = Object.keys(pageStyles)
        .filter((pageId) => pageId !== "99") // Hapus ID `99`
        .reduce((acc, pageId) => {
          const activeSectionsForPage = activeSections[pageId] || [];

          acc[pageId] = Object.entries(pageStyles[pageId] || {})
            .filter(
              ([section]) =>
                section === "navbar" || // Pastikan navbar selalu ada
                activeSectionsForPage.includes(sectionMapping[section])
            )
            .reduce((styleAcc, [section, value]) => {
              styleAcc[section] = value;
              return styleAcc;
            }, {});

          return acc;
        }, {});

      return filteredStyles;
    });
  }, [pageStyles, activeSections, sectionMapping]);

  // // Debugging log
  // useEffect(() => {
  //   console.log("Active Sections:", activeSections[currentPageId]);
  //   console.log("Filtered Current Page Styles:", currentPageStyles);
  //   console.log("Merged Page Styles:", mergedPageStyles);
  // }, [currentPageId, activeSections, currentPageStyles, mergedPageStyles]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (activePages.length < 3) {
        toastMessage("error", "Please select at least 1 page", {
          position: "top-center",
        });
        return;
      }
    }

    if (currentStep === 4) {
      siteTitleSchema
        .validate({ title: siteTitle }, { abortEarly: false })
        .then(() => {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        })
        .catch((err) => {
          toastMessage("error", err.errors[0], {
            position: "top-center",
          });
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
        {currentStep === 1 && (
          <>
            {isLoadingPagesAi ? (
              <LoaderProgress />
            ) : (
              <PagesAi
                siteTitle={siteTitle}
                initialPageId={initialPageId}
                activePages={activePages}
                currentPageId={currentPageId}
                setCurrentPageId={setCurrentPageId}
                handleActivePage={handleActivePage}
                dataPages={dataPages}
              />
            )}
          </>
        )}

        {currentStep === 2 && (
          <>
            {isLoadingElementPages ? (
              <LoaderProgress />
            ) : (
              <ElementPages
                activePages={activePages}
                activeSections={activeSections}
                handleActiveSection={handleActiveSection}
                siteTitle={siteTitle}
                dataPages={dataPages}
                currentPageId={currentPageId}
                setCurrentPageId={setCurrentPageId}
                dataElements={dataElements}
                toastMessage={toastMessage}
                activeNavbar={currentPageStyles.navbar}
                handleActiveNavbar={(value) => updatePageStyle("navbar", value)}
                activeIntro={currentPageStyles.intro}
                handleActiveIntro={(value) => updatePageStyle("intro", value)}
                activeProducts={currentPageStyles.products}
                handleActiveProducts={(value) =>
                  updatePageStyle("products", value)
                }
                activeServices={currentPageStyles.services}
                handleActiveServices={(value) =>
                  updatePageStyle("services", value)
                }
                activeAbout={currentPageStyles.about}
                handleActiveAbout={(value) => updatePageStyle("about", value)}
                activeForm={currentPageStyles.form}
                handleActiveForm={(value) => updatePageStyle("form", value)}
                activeColors={activeColors}
                activeFonts={activeFonts}
              />
            )}
          </>
        )}

        {currentStep === 3 && (
          <Colors
            activePages={activePages}
            activeSections={activeSections}
            siteTitle={siteTitle}
            dataPages={dataPages}
            currentPageId={currentPageId}
            setCurrentPageId={setCurrentPageId}
            dataElements={dataElements}
            toastMessage={toastMessage}
            activeNavbar={currentPageStyles.navbar}
            activeIntro={currentPageStyles.intro}
            activeProducts={currentPageStyles.products}
            activeServices={currentPageStyles.services}
            activeAbout={currentPageStyles.about}
            activeForm={currentPageStyles.form}
            activeColors={activeColors}
            handleactiveColors={handleactiveColors}
            activeFonts={activeFonts}
          />
        )}

        {currentStep === 4 && (
          <Fonts
            activePages={activePages}
            activeSections={activeSections}
            siteTitle={siteTitle}
            dataPages={dataPages}
            currentPageId={currentPageId}
            setCurrentPageId={setCurrentPageId}
            dataElements={dataElements}
            toastMessage={toastMessage}
            activeNavbar={currentPageStyles.navbar}
            activeIntro={currentPageStyles.intro}
            activeProducts={currentPageStyles.products}
            activeServices={currentPageStyles.services}
            activeAbout={currentPageStyles.about}
            activeForm={currentPageStyles.form}
            activeColors={activeColors}
            activeFonts={activeFonts}
            handleactiveFonts={handleactiveFonts}
          />
        )}

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
            {steps.map((step) => (
              <Fragment key={step.id}>
                <div
                  className={`step ${
                    step.id <= currentStep + 1 ? "active" : ""
                  }`}
                >
                  <span className="material-symbols-outlined step-icon">
                    {step.icon}
                  </span>
                  <div className="step-text">{step.text}</div>
                </div>
                {step.id < steps.length && (
                  <div
                    className={`line-divider ${
                      step.id <= currentStep + 1 ? "active" : ""
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
