import React, { useState, useEffect } from "react";
import {
  Logo,
  Quit,
  DefaultFooter,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import {
  ControllingOverviews,
  useHandleActiveEl,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import NavbarLayout from "../../../components/AiBuilderSupport/NavbarLayout/NavbarLayout";

function PagesAi({
  siteTitle,
  activePages,
  currentPageId,
  setCurrentPageId,
  initialPageId,
  handleActivePage,
  dataPages,
}) {
  const [activeNavbar, setActiveNavbar] = useState(1);

  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
  });

  const handleActiveNavbar = useHandleActiveEl({
    setActiveEl: setActiveNavbar,
  });

  return (
    <>
      <div className="ai-builder-overview">
        <Logo />
        <div className="pages-ai">
          <div className="pages-ai-core">
            <div
              className={`prev-button ${
                currentPageId === initialPageId || activePages.length < 4
                  ? "none"
                  : ""
              }`}
              onClick={handlePrev}
            >
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
            </div>
            <div className="display-data">
              {currentPageId === initialPageId && (
                <div className="display-data-initial">
                  <span className="material-symbols-rounded">
                    emoji_objects
                  </span>
                  <span className="title">
                    Add components and pages to create your site.
                  </span>
                  <span className="text">
                    Your site will highlight its purpose and the services or
                    products you offer.
                  </span>
                </div>
              )}

              {currentPageId !== initialPageId && (
                <>
                  <NavbarLayout
                    activePages={activePages}
                    dataPages={dataPages}
                    siteTitle={siteTitle}
                    currentPageId={currentPageId}
                    activeNavbar={activeNavbar}
                    handleActiveNavbar={handleActiveNavbar}
                  />
                  <div className="display-data-page">
                    <span className="material-symbols-rounded">
                      {
                        dataPages.find(
                          (page) => page.type_template_id === currentPageId
                        )?.icon
                      }
                    </span>
                    <div className="text">
                      {
                        dataPages.find(
                          (page) => page.type_template_id === currentPageId
                        )?.type
                      }
                    </div>
                  </div>
                  <DefaultFooter dataPages={dataPages} />
                </>
              )}
            </div>
            <div
              className={`next-button ${
                currentPageId === initialPageId || activePages.length < 4
                  ? "none"
                  : ""
              }`}
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
        <div className="pages-ai">
          <div className="pages-ai-title">
            Add components and pages to your site
          </div>
          <div className="pages-ai-desc">
            We suggest beginning with these pages, but you can always adjust by
            adding or removing them as needed.
          </div>
          <div className="content">
            {dataPages.map((page) => (
              <div
                className={`content-item ${
                  activePages.includes(page.type_template_id) ? "active" : ""
                }`}
                key={page.type_template_id}
                onClick={() => handleActivePage(page.type_template_id)}
              >
                {activePages.includes(page.type_template_id) ? (
                  <span className="material-symbols-outlined">task_alt</span>
                ) : (
                  <span className="material-symbols-outlined">
                    radio_button_unchecked
                  </span>
                )}
                <div className="content-item-text">{page.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PagesAi;
