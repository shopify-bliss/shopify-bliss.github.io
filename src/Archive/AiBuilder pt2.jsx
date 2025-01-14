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

function AiBuilder() {
  axios.defaults.withCredentials = true;

  const [currentStep, setCurrentStep] = useState(0);
  const [siteTitle, setSiteTitle] = useState("");
  const maxChars = 60;

  const initialPageId = 99;
  const [activePages, setActivePages] = useState([
    "2bff7888-e861-4341-869b-189af29ad3f8",
    "40229892-a523-4e1f-a936-a3051e9d30bb",
  ]);
  const [currentPageId, setCurrentPageId] = useState(initialPageId);
  const [activeSections, setActiveSections] = useState({});

  const [dataPages, setDataPages] = useState([]);
  const [dataElements, setDataElements] = useState([]);
  const [isLoadingPagesAi, setIsLoadingPagesAi] = useState(false);
  const [isLoadingElementPages, setIsLoadingElementPages] = useState(false);

  const [activeColor, setActiveColor] = useState(1);
  const [activeFont, setActiveFont] = useState(7);
  const [pageStyles, setPageStyles] = useState({});
  const [mergedPageStyles, setMergedPageStyles] = useState({});

  const handleSiteTitleInput = useCallback((e) => {
    const inputSiteTitle = e.target.value;
    if (inputSiteTitle.length <= maxChars) {
      setSiteTitle(inputSiteTitle);
    }
  }, []);

  const handleActivePage = useCallback(
    (pageId) => {
      if (
        pageId === "2bff7888-e861-4341-869b-189af29ad3f8" ||
        pageId === "40229892-a523-4e1f-a936-a3051e9d30bb"
      ) {
        return;
      }

      setActivePages((prevActivePages) => {
        let updatedPages;

        if (prevActivePages.includes(pageId)) {
          // Hapus halaman berdasarkan id
          updatedPages = prevActivePages.filter((id) => id !== pageId);

          if (currentPageId === pageId) {
            // Tentukan halaman baru jika halaman yang aktif dinonaktifkan
            const newPageId =
              updatedPages.find(
                (id) =>
                  id !== "2bff7888-e861-4341-869b-189af29ad3f8" &&
                  id !== "40229892-a523-4e1f-a936-a3051e9d30bb"
              ) ?? initialPageId;

            const onlyNavbarAndFooterActive =
              updatedPages.length === 2 &&
              updatedPages.includes("2bff7888-e861-4341-869b-189af29ad3f8") &&
              updatedPages.includes("40229892-a523-4e1f-a936-a3051e9d30bb");

            setCurrentPageId(
              onlyNavbarAndFooterActive ? initialPageId : newPageId
            );
          }
        } else {
          // Tambahkan halaman berdasarkan id
          updatedPages = [...prevActivePages, pageId];
          setCurrentPageId(pageId);
        }

        return updatedPages.sort((a, b) => a - b);
      });
    },
    [currentPageId]
  );

  const handleActiveSection = useCallback(
    (sectionId) => {
      setActiveSections((prevActiveSections) => {
        const currentSections = prevActiveSections[currentPageId] || [];
        let updatedSections;

        if (currentSections.includes(sectionId)) {
          // Hapus section
          updatedSections = currentSections.filter((id) => id !== sectionId);
        } else {
          // Tambahkan section
          updatedSections = [...currentSections, sectionId];
        }

        return {
          ...prevActiveSections,
          [currentPageId]: updatedSections,
        };
      });
    },
    [currentPageId]
  );

  useEffect(() => {
    if (currentPageId !== initialPageId) {
      setActiveSections((prev) => ({
        ...prev,
        [currentPageId]: prev[currentPageId] || [],
      }));
    }
  }, [currentPageId, initialPageId]);

  const fetchDataPages = useCallback(async () => {
    setIsLoadingPagesAi(true);
    try {
      const res = await axios.get(urlEndpoint.pagesAi);
      setDataPages(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingPagesAi(false);
    }
  }, []);

  const fetchDataElements = useCallback(async () => {
    setIsLoadingElementPages(true);
    try {
      const res = await axios.get(urlEndpoint.elementsAi);
      setDataElements(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingElementPages(false);
    }
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      fetchDataPages();
    } else if (currentStep === 2) {
      fetchDataElements();
    }
  }, [currentStep, fetchDataPages, fetchDataElements]);

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

  useEffect(() => {
    if (!currentPageId || pageStyles[currentPageId]) return;

    setPageStyles((prevStyles) => ({
      ...prevStyles,
      [currentPageId]: { ...activeStylesTemplate },
    }));
  }, [currentPageId, activeStylesTemplate, pageStyles]);

  const updatePageStyle = (section, value) => {
    setPageStyles((prevStyles) => ({
      ...prevStyles,
      [currentPageId]: {
        ...prevStyles[currentPageId],
        [section]: value,
      },
    }));
  };

  const currentPageStyles = useMemo(
    () => pageStyles[currentPageId] || activeStylesTemplate,
    [pageStyles, currentPageId, activeStylesTemplate]
  );

  useEffect(() => {
    setMergedPageStyles((prevMergedStyles) => {
      const filteredStyles = Object.keys(pageStyles)
        .filter((pageId) => pageId !== "99") // Filter out pageId "99"
        .reduce((acc, pageId) => {
          acc[pageId] = pageStyles[pageId];
          return acc;
        }, {});

      return {
        ...prevMergedStyles,
        ...filteredStyles,
      };
    });
  }, [pageStyles]);

  // useEffect(() => {
  //   console.log(activeSections);

  //   console.log("Current Page Styles:", pageStyles[currentPageId]);
  //   console.log("Merged Page Styles:", mergedPageStyles);
  // }, [activeSections, pageStyles, currentPageId, mergedPageStyles]);

  const handleActiveColor = useCallback(
    (color) => {
      setActiveColor(color);
    },
    [setActiveColor]
  );

  const handleActiveFont = useCallback(
    (font) => {
      setActiveFont(font);
    },
    [setActiveFont]
  );

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
                activeColor={activeColor}
                activeFont={activeFont}
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
            activeColor={activeColor}
            handleActiveColor={handleActiveColor}
            activeFont={activeFont}
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
            activeColor={activeColor}
            activeFont={activeFont}
            handleActiveFont={handleActiveFont}
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
