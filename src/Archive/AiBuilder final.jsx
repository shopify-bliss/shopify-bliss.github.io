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
import urlEndpoint from "../../helpers/urlEndpoint";

function AiBuilder() {
  axios.defaults.withCredentials = true;

  const [currentStep, setCurrentStep] = useState(0);
  const [disabledSteps, setDisabledSteps] = useState(false);
  const [loadingBuilder, setLoadingBuilder] = useState(false);

  const {
    user,
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

  // Template untuk gaya aktif menggunakan ID
  const activeStylesTemplate = useMemo(
    () => ({
      "798f1ce0-b732-45a6-838e-f28e137243f7": 1, // Intro
      "b42d4d56-d411-4aa8-ae01-52f0c406328a": 1, // Products
      "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8": 1, // Services
      "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed": 1, // About
      "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e": 1, // Form
      "2bff7888-e861-4341-869b-189af29ad3f8": 1, // Navbar
    }),
    []
  );

  const [navbarStyle, setNavbarStyle] = useState(
    activeStylesTemplate["2bff7888-e861-4341-869b-189af29ad3f8"]
  );
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
  const updatePageStyle = (sectionId, value) => {
    setPageStyles((prevStyles) => {
      const updatedPageStyles = {
        ...prevStyles,
        [currentPageId]: {
          ...prevStyles[currentPageId],
          [sectionId]: value,
        },
      };

      // Jika ID adalah navbar, sinkronkan gaya ke semua halaman
      if (sectionId === "2bff7888-e861-4341-869b-189af29ad3f8") {
        setNavbarStyle(value);
        Object.keys(updatedPageStyles).forEach((pageId) => {
          updatedPageStyles[pageId] = {
            ...updatedPageStyles[pageId],
            [sectionId]: value,
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
      .filter(([id]) => activeSectionsForPage.includes(id))
      .reduce((acc, [id, styleValue]) => {
        acc[id] = styleValue;
        return acc;
      }, {});

    return {
      "2bff7888-e861-4341-869b-189af29ad3f8": navbarStyle, // Navbar
      ...filteredStyles,
      ...(pageStyles[currentPageId] || {}),
    };
  }, [
    pageStyles,
    currentPageId,
    activeStylesTemplate,
    activeSections,
    navbarStyle,
  ]);

  // Perbarui gaya gabungan untuk semua halaman
  useEffect(() => {
    setMergedPageStyles(() => {
      const filteredStyles = Object.keys(pageStyles)
        .filter((pageId) => pageId !== "99")
        .reduce((acc, pageId) => {
          const activeSectionsForPage = activeSections[pageId] || [];

          acc[pageId] = Object.entries(pageStyles[pageId] || {})
            .filter(
              ([id]) =>
                id === "2bff7888-e861-4341-869b-189af29ad3f8" || // Navbar selalu ada
                activeSectionsForPage.includes(id)
            )
            .reduce((styleAcc, [id, value]) => {
              styleAcc[id] = value;
              return styleAcc;
            }, {});

          return acc;
        }, {});

      return filteredStyles;
    });
  }, [pageStyles, activeSections]);

  const aiBuilderElements = useMemo(
    () => ({
      siteTitle: siteTitle,
      Brand: activeBrand.brand_id,
      Color: activeColors,
      Font: activeFonts,
      Styles: mergedPageStyles,
    }),
    [
      siteTitle,
      activeBrand,
      activePages,
      activeColors,
      activeFonts,
      mergedPageStyles,
    ]
  );

  // Debugging log
  // useEffect(() => {
  //   console.log(aiBuilderElements);
  // }, [aiBuilderElements]);

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

  const handleNext = useCallback(async () => {
    if (currentStep === 4) {
      try {
        setLoadingBuilder(true);

        // Step 1: Create AI Builder
        const aiBuilderResponse = await axios.post(urlEndpoint.aiBuilder, {
          siteTitle: siteTitle || "Title Your Site",
          brandID: activeBrand.brand_id,
          fontID: activeFonts,
          colorID: activeColors,
          userID: user.user_id,
        });

        const aiBuilderID = aiBuilderResponse.data.data[0].ai_builder_id;

        // Helper function for processing sections
        const processSections = async (sections, isSupport = false) => {
          const sectionPromises = Object.entries(sections).flatMap(
            ([pageId, sectionData]) =>
              Object.entries(sectionData)
                .filter(([sectionId]) =>
                  isSupport
                    ? sectionId === "2bff7888-e861-4341-869b-189af29ad3f8"
                    : sectionId !== "2bff7888-e861-4341-869b-189af29ad3f8"
                )
                .map(([sectionId, style]) =>
                  axios.post(
                    isSupport
                      ? urlEndpoint.aiBuilderSupports
                      : urlEndpoint.aiBuilderSections,
                    {
                      aiBuilderID,
                      pageID: pageId,
                      styleDesign: style,
                      [isSupport ? "supportID" : "sectionID"]: sectionId,
                    }
                  )
                )
          );

          const responses = await Promise.all(sectionPromises)
            .then(() => {
              toastMessage("success", "AI builder process completed.");
            })
            .catch((error) => {
              toastMessage("error", error.response.data.message);
              console.error("Error applying styles to sections:", error);
              throw error; // Rethrow to exit on critical failures
            });

          return responses;
        };

        // Step 2: Process Section Styles
        await processSections(mergedPageStyles, false);

        // Step 3: Process Support Styles
        await processSections(mergedPageStyles, true);
      } catch (error) {
        console.error("Error creating all AI builder process:", error);
        toastMessage("error", "An unexpected error occurred.");
      } finally {
        setLoadingBuilder(false);
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [currentStep, siteTitle]);

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      {loadingBuilder && (
        <>
          <div
            style={{
              width: "100%",
              height: "0",
              paddingBottom: "100%",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/sYqYDxyiVJCa5oQsK8"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
          <p>
            <a href="https://giphy.com/gifs/trippy-abstract-pi-slices-sYqYDxyiVJCa5oQsK8">
              via GIPHY
            </a>
          </p>
        </>
      )}
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
            activeNavbar={
              currentPageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
            }
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
            toastMessage="Toast message example"
            activeNavbar={
              currentPageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
            }
            handleActiveNavbar={(value) =>
              updatePageStyle("2bff7888-e861-4341-869b-189af29ad3f8", value)
            }
            activeIntro={
              currentPageStyles["798f1ce0-b732-45a6-838e-f28e137243f7"]
            }
            handleActiveIntro={(value) =>
              updatePageStyle("798f1ce0-b732-45a6-838e-f28e137243f7", value)
            }
            activeProducts={
              currentPageStyles["b42d4d56-d411-4aa8-ae01-52f0c406328a"]
            }
            handleActiveProducts={(value) =>
              updatePageStyle("b42d4d56-d411-4aa8-ae01-52f0c406328a", value)
            }
            activeServices={
              currentPageStyles["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"]
            }
            handleActiveServices={(value) =>
              updatePageStyle("4fd1e0cc-06f3-4554-9f79-ce8e02db03c8", value)
            }
            activeAbout={
              currentPageStyles["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"]
            }
            handleActiveAbout={(value) =>
              updatePageStyle("1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed", value)
            }
            activeForm={
              currentPageStyles["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"]
            }
            handleActiveForm={(value) =>
              updatePageStyle("2089ce88-93a7-4555-8d0d-7f88f1dc3a7e", value)
            }
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
            activeNavbar={
              currentPageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
            }
            activeIntro={
              currentPageStyles["798f1ce0-b732-45a6-838e-f28e137243f7"]
            }
            activeProducts={
              currentPageStyles["b42d4d56-d411-4aa8-ae01-52f0c406328a"]
            }
            activeServices={
              currentPageStyles["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"]
            }
            activeAbout={
              currentPageStyles["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"]
            }
            activeForm={
              currentPageStyles["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"]
            }
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
            activeNavbar={
              currentPageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
            }
            activeIntro={
              currentPageStyles["798f1ce0-b732-45a6-838e-f28e137243f7"]
            }
            activeProducts={
              currentPageStyles["b42d4d56-d411-4aa8-ae01-52f0c406328a"]
            }
            activeServices={
              currentPageStyles["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"]
            }
            activeAbout={
              currentPageStyles["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"]
            }
            activeForm={
              currentPageStyles["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"]
            }
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
