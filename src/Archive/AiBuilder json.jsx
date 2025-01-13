import React, {
  useState,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import SiteInfo from "./SiteInfo/SiteInfo";
import PagesAi from "./PagesAi/PagesAi";
import ElementPages from "./ElementPages/ElementPages";
import Colors from "./Colors/Colors";
import Fonts from "./Fonts/Fonts";
import { siteTitleSchema } from "../../helpers/ValidationSchema";
import { toastMessage } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import steps from "../../data/steps.json";
import axios from "axios";
import { useAiBuilder } from "../../components/AiBuilderSupport/AiBuilderContext";
import SiteInfoLogics from "./SiteInfo/SiteInfoLogics";
import PagesAiLogics from "./PagesAi/PagesAiLogics";
import ElementPagesLogics from "./ElementPages/ElementPagesLogics";
import ColorsAiLogics from "./Colors/ColorsAiLogics";
import FontsAiLogics from "./Fonts/FontsAiLogics";

function AiBuilder() {
  axios.defaults.withCredentials = true;

  const [currentStep, setCurrentStep] = useState(0);
  const [disabledSteps, setDisabledSteps] = useState(false);

  const {
    dataBrands,
    dataPages,
    dataElements,
    dataColors,
    dataFonts,
    initialPageId,
    currentPageId,
    setCurrentPageId,
  } = useAiBuilder();

  const {
    siteTitle,
    maxChars,
    handleSiteTitleInput,
    activeBrand,
    handleBrandClick,
  } = SiteInfoLogics({ dataBrands });
  const { activePages, handleActivePage } = PagesAiLogics();
  const { activeSections, handleActiveSection } = ElementPagesLogics();
  const { activeColors, handleactiveColors } = ColorsAiLogics();
  const { activeFonts, handleactiveFonts } = FontsAiLogics();

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

  const [navbarStyle, setNavbarStyle] = useState(activeStylesTemplate.navbar);
  const [pageStyles, setPageStyles] = useState({});
  const [mergedPageStyles, setMergedPageStyles] = useState({});

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

  const aiBuilderElements = useMemo(
    () => ({
      siteTitle: siteTitle,
      activeBrand: activeBrand.brand_id,
      activePages: activePages,
      activeSections: activeSections,
      activeColors: activeColors,
      activeFonts: activeFonts,
      mergedPageStyles: mergedPageStyles,
    }),
    [
      siteTitle,
      activeBrand,
      activePages,
      activeSections,
      activeColors,
      activeFonts,
      mergedPageStyles,
    ]
  );

  // Debugging log
  useEffect(() => {
    console.log(aiBuilderElements);
  }, [aiBuilderElements]);

  useEffect(() => {
    if (
      (currentStep === 1 && activePages.length < 3) ||
      (currentStep === 2 && activeSections[currentPageId]?.length < 1)
    ) {
      setDisabledSteps(true);
    } else {
      setDisabledSteps(false);
    }
  }, [currentStep, activePages, activeSections, currentPageId]);

  const handleNext = useCallback(() => {
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
  }, [currentStep, siteTitle]);

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
            dataBrands={dataBrands}
            activeBrand={activeBrand}
            handleBrandClick={handleBrandClick}
          />
        )}
        {currentStep === 1 && (
          <PagesAi
            siteTitle={siteTitle}
            initialPageId={initialPageId}
            activePages={activePages}
            currentPageId={currentPageId}
            setCurrentPageId={setCurrentPageId}
            handleActivePage={handleActivePage}
            dataPages={dataPages}
            activeNavbar={currentPageStyles.navbar}
          />
        )}

        {currentStep === 2 && (
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
            handleActiveProducts={(value) => updatePageStyle("products", value)}
            activeServices={currentPageStyles.services}
            handleActiveServices={(value) => updatePageStyle("services", value)}
            activeAbout={currentPageStyles.about}
            handleActiveAbout={(value) => updatePageStyle("about", value)}
            activeForm={currentPageStyles.form}
            handleActiveForm={(value) => updatePageStyle("form", value)}
            activeColors={activeColors}
            activeFonts={activeFonts}
          />
        )}

        {currentStep === 3 && (
          <Colors
            activePages={activePages}
            activeSections={activeSections}
            siteTitle={siteTitle}
            dataBrands={dataBrands}
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
            dataColors={dataColors}
          />
        )}

        {currentStep === 4 && (
          <Fonts
            activePages={activePages}
            activeSections={activeSections}
            siteTitle={siteTitle}
            dataBrands={dataBrands}
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
            dataFonts={dataFonts}
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
            <button
              onClick={handleNext}
              className="next-button"
              disabled={disabledSteps}
            >
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
