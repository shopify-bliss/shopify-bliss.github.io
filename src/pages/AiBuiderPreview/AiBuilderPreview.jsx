import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useMemo,
} from "react";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useAiBuilder } from "../../components/AiBuilderSupport/AiBuilderContext";
import {
  Quit,
  Logo,
  DefaultFooter,
} from "../../components/AiBuilderSupport/AiBuilderSupport";
import NavbarLayout from "../../components/AiBuilderSupport/NavbarLayout/NavbarLayout";
import Intro from "../../components/AiBuilderSupport/ElementsLayout/Intro/Intro";
import Products from "../../components/AiBuilderSupport/ElementsLayout/Products/Products";
import Services from "../../components/AiBuilderSupport/ElementsLayout/Services/Services";
import About from "../../components/AiBuilderSupport/ElementsLayout/About/About";
import Form from "../../components/AiBuilderSupport/ElementsLayout/Form/Form";
import { BgColors } from "../../components/AiBuilderSupport/ColorsSupport";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../../helpers/AlertMessage";
import { ToastContainer } from "react-toastify";
import { LoaderProgress } from "../../components/LoaderProgress/LoaderProgress";

function AiBuilderPreview() {
  axios.defaults.withCredentials = true;

  const [siteTitle, setSiteTitle] = useState(null);
  const [truePages, setTruePages] = useState([]);
  const [currentPageId, setCurrentPageId] = useState(null);
  const [activeSections, setActiveSections] = useState({});
  const [styles, setStyles] = useState({});
  const [color, setColor] = useState(null);
  const [font, setFont] = useState(null);

  const {
    token,
    setAiBuilderLoader,
    isLoadingAiBuilder,
    dataElements,
    dataPages,
  } = useAiBuilder();

  const bg = BgColors({ activeColors: color });
  const navigate = useNavigate();

  const fetchAiBuilder = useCallback(async () => {
    try {
      setAiBuilderLoader(true);

      const aiBuilderPromise = await axios.get(urlEndpoint.aiBuilderId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const aiBuilderId = aiBuilderPromise.data.data[0].ai_builder_id;

      const [aiBuilderSectionsPromise, aiBuilderSupportsPromise] =
        await Promise.all([
          axios.get(`${urlEndpoint.aiBuilderSectionsId}?id=${aiBuilderId}`),
          axios.get(`${urlEndpoint.aiBuilderSupportsId}?id=${aiBuilderId}`),
        ]);

      const aiBuilderData = aiBuilderPromise.data.data[0];
      const aiBuilderSectionsData = aiBuilderSectionsPromise.data.data;
      const aiBuilderSupportsData = aiBuilderSupportsPromise.data.data;
      const aiBuilderNavbarData = aiBuilderSupportsData.filter(
        (navbar) => navbar.support_id === "2bff7888-e861-4341-869b-189af29ad3f8"
      );

      setSiteTitle(aiBuilderData.site_title);
      setColor(aiBuilderData.color_id);
      setFont(aiBuilderData.font_id);

      setTruePages([
        ...new Set(aiBuilderSectionsData.map((data) => data.page_id)),
      ]);

      const sectionPerPages = aiBuilderSectionsData.reduce((acc, item) => {
        const { page_id, section_id } = item;

        if (!acc[page_id]) {
          acc[page_id] = [];
        }

        if (!acc[page_id].includes(section_id)) {
          acc[page_id].push(section_id);
        }

        return acc;
      }, {});

      setActiveSections(sectionPerPages);

      const mergedStyles = aiBuilderSectionsData.reduce((acc, item) => {
        const { page_id, section_id, style_design } = item;

        if (!acc[page_id]) {
          acc[page_id] = {};
        }

        acc[page_id][section_id] = style_design;
        return acc;
      }, {});

      Object.keys(mergedStyles).forEach((pageId) => {
        mergedStyles[pageId][aiBuilderNavbarData[0].support_id] =
          aiBuilderNavbarData[0].style_design;
      });

      setStyles(mergedStyles);

      // console.log(aiBuilderPromise.data.data[0]);
      // console.log(aiBuilderSectionsPromise.data.data);
      // console.log(aiBuilderSupportsPromise.data.data[0]);
    } catch (error) {
      console.error(error);
      navigate("/login", {
        replace: true,
        state: {
          messageSessionExpired: "Session expired, Please login again.",
        },
      });
    } finally {
      setAiBuilderLoader(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAiBuilder();
    }
  }, [token, fetchAiBuilder, navigate]);

  useEffect(() => {
    setCurrentPageId(truePages[0]);
  }, [truePages]);

  const pageStyles = useMemo(() => {
    return styles[currentPageId] || {};
  }, [styles, currentPageId]);

  useEffect(() => {
    console.log(activeSections);
    console.log(styles);

    console.log(activeSections[currentPageId]);
  }, [currentPageId, activeSections, styles]);

  return (
    <>
      {isLoadingAiBuilder && <LoaderProgress />}
      <div className={`aibuilder-preview`}>
        <NavbarLayout
          activePages={truePages}
          dataPages={dataPages}
          activeSections={activeSections}
          siteTitle={siteTitle}
          currentPageId={currentPageId}
          setCurrentPageId={setCurrentPageId}
          activeNavbar={pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]}
          activeIntro={pageStyles["798f1ce0-b732-45a6-838e-f28e137243f7"]}
          toastMessage={toastMessage}
          activeFonts={font}
          activeColors={color}
          isPreview={true}
        />
        {currentPageId !== null && (
          <div className="aibuilder-preview-section">
            {dataElements
              .filter((section) =>
                activeSections[currentPageId]?.includes(section.section_id)
              )
              .map((section) => (
                <Fragment key={section.section_id}>
                  {section.section_id ===
                  "798f1ce0-b732-45a6-838e-f28e137243f7" ? (
                    <Intro
                      activeSections={activeSections}
                      currentPageId={currentPageId}
                      activeIntro={
                        pageStyles["798f1ce0-b732-45a6-838e-f28e137243f7"]
                      }
                      activeNavbar={
                        pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
                      }
                      toastMessage={toastMessage}
                      activeColors={color}
                      activeFonts={font}
                    />
                  ) : section.section_id ===
                    "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                    <Products
                      activeProducts={
                        pageStyles["b42d4d56-d411-4aa8-ae01-52f0c406328a"]
                      }
                      activeNavbar={
                        pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
                      }
                      toastMessage={toastMessage}
                      activeColors={color}
                      activeFonts={font}
                    />
                  ) : section.section_id ===
                    "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                    <Services
                      activeServices={
                        pageStyles["4fd1e0cc-06f3-4554-9f79-ce8e02db03c8"]
                      }
                      activeNavbar={
                        pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
                      }
                      toastMessage={toastMessage}
                      activeColors={color}
                      activeFonts={font}
                    />
                  ) : section.section_id ===
                    "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                    <About
                      activeAbout={
                        pageStyles["1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed"]
                      }
                      activeNavbar={
                        pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
                      }
                      toastMessage={toastMessage}
                      activeColors={color}
                      activeFonts={font}
                    />
                  ) : section.section_id ===
                    "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e" ? (
                    <Form
                      activeForm={
                        pageStyles["2089ce88-93a7-4555-8d0d-7f88f1dc3a7e"]
                      }
                      activeNavbar={
                        pageStyles["2bff7888-e861-4341-869b-189af29ad3f8"]
                      }
                      toastMessage={toastMessage}
                      activeColors={color}
                      activeFonts={font}
                    />
                  ) : (
                    <div className="no-element">{section.name}</div>
                  )}
                </Fragment>
              ))}
          </div>
        )}
        <DefaultFooter dataPages={dataPages} isPreview={true} />
      </div>
      <ToastContainer />
    </>
  );
}

export default AiBuilderPreview;
