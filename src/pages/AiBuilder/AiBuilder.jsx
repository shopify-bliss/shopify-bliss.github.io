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
import { siteTitleSchema } from "../../helpers/ValidationSchema";
import { toastMessage } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import LoaderProgress from "../../components/LoaderProgress/LoaderProgress";
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
  const [activeStyles, setActiveStyles] = useState({
    navbar: 1,
    intro: 1,
    products: 1,
    services: 1,
    about: 1,
    form: 1,
  });

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
    if (!currentPageId) return;

    const currentActiveSections = activeSections[currentPageId] || [];
    const updatedStyles = { ...activeStylesTemplate };

    currentActiveSections.forEach((sectionId) => {
      switch (sectionId) {
        case "798f1ce0-b732-45a6-838e-f28e137243f7":
          updatedStyles.intro = 1;
          break;
        case "b42d4d56-d411-4aa8-ae01-52f0c406328a":
          updatedStyles.products = 1;
          break;
        case "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8":
          updatedStyles.services = 1;
          break;
        case "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed":
          updatedStyles.about = 1;
          break;
        case "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e":
          updatedStyles.form = 1;
          break;
        default:
          break;
      }
    });

    if (activePages.includes("2bff7888-e861-4341-869b-189af29ad3f8")) {
      updatedStyles.navbar = 1;
    }

    setActiveStyles((prevStyles) => {
      const hasChanges = Object.keys(updatedStyles).some(
        (key) => prevStyles[key] !== updatedStyles[key]
      );
      return hasChanges ? updatedStyles : prevStyles;
    });
  }, [currentPageId, activeSections, activePages, activeStylesTemplate]);

  const updateActiveStyle = useCallback(
    (section, value) => {
      setActiveStyles((prevStyles) => ({
        ...prevStyles,
        [section]: value,
      }));
    },
    [setActiveStyles]
  );

  const handleActiveNavbar = (value) => updateActiveStyle("navbar", value);
  const handleActiveIntro = (value) => updateActiveStyle("intro", value);
  const handleActiveProducts = (value) => updateActiveStyle("products", value);
  const handleActiveServices = (value) => updateActiveStyle("services", value);
  const handleActiveAbout = (value) => updateActiveStyle("about", value);
  const handleActiveForm = (value) => updateActiveStyle("form", value);

  const handleActiveColor = useCallback(
    (color) => {
      setActiveColor(color);
    },
    [setActiveColor]
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
                activeNavbar={activeStyles.navbar}
                handleActiveNavbar={handleActiveNavbar}
                activeIntro={activeStyles.intro}
                handleActiveIntro={handleActiveIntro}
                activeProducts={activeStyles.products}
                handleActiveProducts={handleActiveProducts}
                activeServices={activeStyles.services}
                handleActiveServices={handleActiveServices}
                activeAbout={activeStyles.about}
                handleActiveAbout={handleActiveAbout}
                activeForm={activeStyles.form}
                handleActiveForm={handleActiveForm}
                activeColor={activeColor}
              />
            )}
          </>
        )}
        {currentStep === 3 && (
          <Colors
            activePages={activePages}
            activeSections={activeSections}
            handleActiveSection={handleActiveSection}
            siteTitle={siteTitle}
            dataPages={dataPages}
            currentPageId={currentPageId}
            setCurrentPageId={setCurrentPageId}
            dataElements={dataElements}
            toastMessage={toastMessage}
            activeColor={activeColor}
            handleActiveColor={handleActiveColor}
            activeNavbar={activeStyles.navbar}
            activeIntro={activeStyles.intro}
            activeProducts={activeStyles.products}
            activeServices={activeStyles.services}
            activeAbout={activeStyles.about}
            activeForm={activeStyles.form}
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
