import React, { useEffect, Fragment } from "react";
import {
  Quit,
  Logo,
  DefaultFooter,
  DefaultNavbar,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsData from "../../../helpers/Data/sections.json";

function ElementPages({
  activePages,
  activeSections,
  handleActiveSection,
  siteTitle,
  dataPages,
  currentPageId,
  setCurrentPageId,
}) {
  // useEffect(() => {
  //   console.log("test" + activeSections);
  //   console.log("test pages" + activePages);

  //   console.log("noew" + currentPageId);
  // }, [activeSections, activePages]);

  const middlePages = activePages.filter(
    (id) =>
      id !== "2bff7888-e861-4341-869b-189af29ad3f8" &&
      id !== "40229892-a523-4e1f-a936-a3051e9d30bb"
  );

  const handleNext = () => {
    if (currentPageId !== null) {
      const currentIndex = middlePages.indexOf(currentPageId);
      const nextIndex = (currentIndex + 1) % middlePages.length; // Loop kembali ke awal
      setCurrentPageId(middlePages[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (currentPageId !== null) {
      const currentIndex = middlePages.indexOf(currentPageId);
      const prevIndex =
        (currentIndex - 1 + middlePages.length) % middlePages.length; // Loop ke akhir
      setCurrentPageId(middlePages[prevIndex]);
    }
  };

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
              <DefaultNavbar
                activePages={activePages}
                dataPages={dataPages}
                siteTitle={siteTitle}
                currentPageId={currentPageId}
              />

              {currentPageId !== null && (
                <div className="display-data-section">
                  {sectionsData
                    .filter((section) =>
                      activeSections[currentPageId]?.includes(section.id)
                    )
                    .map((section) => (
                      <Fragment key={section.id}>
                        <div className="text">{section.name}</div>
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
            {sectionsData.map((section) => (
              <div
                className={`content-item ${
                  activeSections[currentPageId]?.includes(section.id)
                    ? "active"
                    : ""
                }`}
                key={section.id}
                onClick={() => handleActiveSection(section.id)}
              >
                {activeSections[currentPageId]?.includes(section.id) ? (
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
