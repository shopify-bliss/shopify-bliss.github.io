import { useState, Fragment, useCallback, useEffect, useMemo } from "react";
import SiteInfo from "./SiteInfo/SiteInfo";
import PagesAi from "./PagesAi/PagesAi";
import ElementPages from "./ElementPages/ElementPages";
import Colors from "./Colors/Colors";
import Fonts from "./Fonts/Fonts";
import steps from "../../data/steps.json";
import axios from "axios";
import { useAiBuilder } from "../../components/AiBuilderSupport/AiBuilderContext";
import SiteInfoLogics from "./SiteInfo/SiteInfoLogics";
import PagesAiLogics from "./PagesAi/PagesAiLogics";
import ElementPagesLogics from "./ElementPages/ElementPagesLogics";
import ColorsAiLogics from "./Colors/ColorsAiLogics";
import FontsAiLogics from "./Fonts/FontsAiLogics";
import urlEndpoint from "../../helpers/urlEndpoint";
import { ToastContainer } from "react-toastify";
import { toastMessage } from "../../helpers/AlertMessage";
import { LoaderProgress } from "../../components/LoaderProgress/LoaderProgress";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  // const aiBuilderElements = useMemo(
  //   () => ({
  //     siteTitle: siteTitle,
  //     Brand: activeBrand.brand_id,
  //     Color: activeColors,
  //     Font: activeFonts,
  //     Styles: mergedPageStyles,
  //   }),
  //   [
  //     siteTitle,
  //     activeBrand,
  //     activeColors,
  //     activeFonts,
  //     mergedPageStyles,
  //   ]
  // );

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

        // Promise untuk AI Builder utama
        const aiBuilderPromise = axios.post(urlEndpoint.aiBuilder, {
          siteTitle: siteTitle || "Title Your Site",
          brandID: activeBrand.brand_id,
          fontID: activeFonts,
          colorID: activeColors,
          userID: user.user_id,
        });

        const slug = siteTitle.toLowerCase().replace(/ /g, "-");

        // Tunggu hasil AI Builder utama
        const aiBuilderResponse = await aiBuilderPromise;
        const aiBuilderId = aiBuilderResponse.data.data[0].ai_builder_id;

        // Promise untuk sections
        const aiBuilderSectionsPromise = Object.entries(
          mergedPageStyles
        ).flatMap(([pageId, sections]) =>
          Object.entries(sections)
            .filter(
              ([sectionId]) =>
                sectionId !== "2bff7888-e861-4341-869b-189af29ad3f8"
            )
            .map(([sectionId, style]) =>
              axios
                .post(urlEndpoint.aiBuilderSections, {
                  aiBuilderID: aiBuilderId,
                  pageID: pageId,
                  styleDesign: style,
                  sectionID: sectionId,
                })
                .catch((error) => {
                  console.error(
                    "Error applying style to section:",
                    sectionId,
                    error
                  );
                  return null; // Jangan hentikan Promise.all
                })
            )
        );

        // Promise untuk support (hanya satu yang sesuai filter)
        const supportStyles = Object.entries(mergedPageStyles).flatMap(
          ([pageId, sections]) =>
            Object.entries(sections)
              .filter(
                ([supportId]) =>
                  supportId === "2bff7888-e861-4341-869b-189af29ad3f8"
              )
              .map(([supportId, style]) => ({
                pageID: pageId,
                styleDesign: style,
                supportID: supportId,
              }))
        );

        const aiBuilderSupportsPromise = supportStyles.length
          ? axios
              .post(urlEndpoint.aiBuilderSupports, {
                aiBuilderID: aiBuilderId,
                styleDesign: supportStyles[0].styleDesign,
                supportID: supportStyles[0].supportID,
              })
              .catch((error) => {
                console.error("Error applying style to support:", error);
                return null; // Jangan hentikan Promise.all
              })
          : Promise.resolve();

        // Gabungkan semua promise dan tunggu
        await Promise.all([
          aiBuilderPromise,
          aiBuilderSectionsPromise,
          aiBuilderSupportsPromise,
        ])
          .then(() => {
            navigate(`/preview/${slug}`, {
              state: {
                aiBuilderId: aiBuilderId,
                messageAiBuilder:
                  "Website generation complete! Explore it now.",
              },
            });
            toastMessage(
              "success",
              "Website generation complete! Explore it now."
            );
          })
          .catch(() => {
            toastMessage(
              "error",
              "One or more processes failed. Check logs for details."
            );
          });
      } catch (error) {
        console.error("Unexpected error during AI Builder process:", error);
        toastMessage("error", "An unexpected error occurred.");
      } finally {
        setLoadingBuilder(false);
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [
    currentStep,
    siteTitle,
    activeBrand.brand_id,
    activeColors,
    activeFonts,
    mergedPageStyles,
    user,
    navigate,
  ]);

  // useEffect(() => {
  //   console.log(activeSections[currentPageId]);
  // }, [activeSections, currentPageId]);

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      {loadingBuilder ? (
        <LoaderProgress isAi={true} />
      ) : (
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
      )}
      <ToastContainer />
    </>
  );
}

export default AiBuilder;
