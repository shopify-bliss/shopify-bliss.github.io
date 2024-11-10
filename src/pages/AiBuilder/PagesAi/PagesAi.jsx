import React, { useState, useCallback } from "react";
import pagesData from "./pages.json";
import {
  Logo,
  Quit,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";

function PagesAi() {
  // Navbar (index 0) dan Footer (index terakhir) selalu aktif
  const [activePages, setActivePages] = useState([
    0,
    pagesData.pagesComponent.length - 1,
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(null);

  const handleActivePage = useCallback((index) => {
    setActivePages((prevActivePages) => {
      if (
        prevActivePages.includes(index) &&
        index !== 0 &&
        index !== pagesData.pagesComponent.length - 1
      ) {
        return prevActivePages.filter((i) => i !== index);
      } else {
        return [...prevActivePages, index];
      }
    });

    // Set currentPageIndex ke halaman pertama yang dipilih jika belum ada yang aktif
    if (index !== 0 && index !== pagesData.pagesComponent.length - 1) {
      setCurrentPageIndex(index);
    }
  }, []);

  const middlePages = activePages.filter(
    (i) => i !== 0 && i !== pagesData.pagesComponent.length - 1
  );

  const handleNext = () => {
    if (currentPageIndex !== null) {
      const currentIndex = middlePages.indexOf(currentPageIndex);
      if (currentIndex < middlePages.length - 1) {
        setCurrentPageIndex(middlePages[currentIndex + 1]);
      }
    }
  };

  const handlePrev = () => {
    if (currentPageIndex !== null) {
      const currentIndex = middlePages.indexOf(currentPageIndex);
      if (currentIndex > 0) {
        setCurrentPageIndex(middlePages[currentIndex - 1]);
      }
    }
  };

  return (
    <>
      <div className="ai-builder-overview">
        <Logo />
        <div className="pages-ai">
          <div className="pages-ai-core">
            <div className="prev-button" onClick={handlePrev}>
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
            </div>
            <div className="display-data">
              {/* Navbar */}
              <div className="wrapper navbar">
                <span className="material-symbols-rounded">
                  {pagesData.pagesComponent[0].icon}
                </span>
                <div className="text">{pagesData.pagesComponent[0].name}</div>
              </div>

              {/* Bagian Tengah */}
              {currentPageIndex !== null && (
                <div className="wrapper page">
                  <span className="material-symbols-rounded">
                    {pagesData.pagesComponent[currentPageIndex].icon}
                  </span>
                  <div className="text">
                    {pagesData.pagesComponent[currentPageIndex].name}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="wrapper footer">
                <span className="material-symbols-rounded">
                  {
                    pagesData.pagesComponent[
                      pagesData.pagesComponent.length - 1
                    ].icon
                  }
                </span>
                <div className="text">
                  {
                    pagesData.pagesComponent[
                      pagesData.pagesComponent.length - 1
                    ].name
                  }
                </div>
              </div>
            </div>
            <div className="next-button" onClick={handleNext}>
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
            {pagesData.pagesComponent.map((page, index) => (
              <div
                className={`content-item ${
                  activePages.includes(index) ? "active" : ""
                }`}
                key={index}
                onClick={() => handleActivePage(index)}
              >
                {activePages.includes(index) ? (
                  <span className="material-symbols-outlined">task_alt</span>
                ) : (
                  <span className="material-symbols-outlined">
                    radio_button_unchecked
                  </span>
                )}
                <div className="content-item-text">{page.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PagesAi;
