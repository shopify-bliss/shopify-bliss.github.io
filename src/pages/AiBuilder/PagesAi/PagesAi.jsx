import React, { useState, useCallback, useEffect } from "react";
import pagesData from "./pages.json";
import {
  Logo,
  Quit,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";

function PagesAi({ siteTitle }) {
  const [activePages, setActivePages] = useState([
    0,
    pagesData.pagesComponent.length - 1,
  ]);
  const initialPageIndex = 99;
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);

  const handleActivePage = useCallback(
    (index) => {
      if (index === 0 || index === pagesData.pagesComponent.length - 1) {
        return;
      }

      setActivePages((prevActivePages) => {
        let updatedPages;

        if (prevActivePages.includes(index)) {
          // Hapus index dari activePages saat dinonaktifkan
          updatedPages = prevActivePages.filter((i) => i !== index);

          if (currentPageIndex === index) {
            // Tentukan newPageIndex berdasarkan posisi halaman
            const newPageIndex =
              updatedPages.find(
                (i) => i > 0 && i < pagesData.pagesComponent.length - 1
              ) ?? 99;

            // Memeriksa apakah hanya Navbar dan Footer yang aktif
            const onlyNavbarAndFooterActive =
              updatedPages.length === 2 &&
              updatedPages.includes(0) &&
              updatedPages.includes(pagesData.pagesComponent.length - 1);
            setCurrentPageIndex(onlyNavbarAndFooterActive ? 99 : newPageIndex);
          }
        } else {
          // Tambahkan index ke activePages saat diaktifkan
          updatedPages = [...prevActivePages, index];
          setCurrentPageIndex(index); // Atur currentPageIndex langsung ke halaman yang dipilih
        }

        // Urutkan activePages setelah perubahan
        return updatedPages.sort((a, b) => a - b);
      });
    },
    [currentPageIndex]
  );

  const middlePages = activePages.filter(
    (i) => i !== 0 && i !== pagesData.pagesComponent.length - 1
  );

  const handleNext = () => {
    if (currentPageIndex !== null) {
      const currentIndex = middlePages.indexOf(currentPageIndex);
      const nextIndex = (currentIndex + 1) % middlePages.length; // Loop to start
      setCurrentPageIndex(middlePages[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex !== null) {
      const currentIndex = middlePages.indexOf(currentPageIndex);
      const prevIndex =
        (currentIndex - 1 + middlePages.length) % middlePages.length; // Loop to end
      setCurrentPageIndex(middlePages[prevIndex]);
    }
  };

  return (
    <>
      <div className="ai-builder-overview">
        <Logo />
        <div className="pages-ai">
          <div className="pages-ai-core">
            <div
              className={`prev-button ${currentPageIndex === 99 ? "none" : ""}`}
              onClick={handlePrev}
            >
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
            </div>
            <div className="display-data">
              {currentPageIndex === 99 && (
                <div className="wrapper initial">
                  <span className="material-symbols-rounded">
                    emoji_objects
                  </span>
                  <div className="text">Initial Page</div>
                </div>
              )}

              {currentPageIndex !== 99 && (
                <div className="wrapper navbar">
                  <div className="template">
                    <span className="material-symbols-rounded">
                      {pagesData.pagesComponent[0].icon}
                    </span>
                    <div className="title">
                      {siteTitle === "" || siteTitle === null
                        ? "Title Your Site"
                        : siteTitle}
                    </div>
                  </div>
                  <div className="list">
                    {activePages
                      .filter(
                        (i) =>
                          i !== 0 && i !== pagesData.pagesComponent.length - 1
                      )
                      .map((index) => {
                        const pageName = pagesData.pagesComponent[
                          index
                        ].name.replace(/ page$/i, ""); // Hilangkan kata "page"
                        return (
                          <div className="text" key={index}>
                            {pageName}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
              {currentPageIndex !== initialPageIndex && (
                <div className="wrapper page">
                  <span className="material-symbols-rounded">
                    {pagesData.pagesComponent[currentPageIndex].icon}
                  </span>
                  <div className="text">
                    {pagesData.pagesComponent[currentPageIndex].name}
                  </div>
                </div>
              )}
              {currentPageIndex !== 99 && (
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
              )}
            </div>
            <div
              className={`next-button ${currentPageIndex === 99 ? "none" : ""}`}
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
