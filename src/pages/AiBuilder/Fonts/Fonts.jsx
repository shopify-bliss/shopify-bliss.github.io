import React, {
  useEffect,
  Fragment,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  Quit,
  Logo,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";
import { ControllingOverviews } from "../../../components/AiBuilderSupport/AiBuilderSupport";
import Navbar from "../../../components/AiBuilderSupport/NavbarLayout/NavbarLayout";
import Intro from "../../../components/AiBuilderSupport/ElementsLayout/Intro/Intro";
import Products from "../../../components/AiBuilderSupport/ElementsLayout/Products/Products";
import Services from "../../../components/AiBuilderSupport/ElementsLayout/Services/Services";
import About from "../../../components/AiBuilderSupport/ElementsLayout/About/About";
import Form from "../../../components/AiBuilderSupport/ElementsLayout/Form/Form";
import fonts from "../../../data/fonts.json";
import brands from "../../../data/brands.json";
import {
  AllFontType1,
  AllFontType2,
} from "../../../components/AiBuilderSupport/FontsSupport";

function Fonts({
  activePages,
  activeSections,
  siteTitle,
  dataPages,
  currentPageId,
  setCurrentPageId,
  toastMessage,
  dataElements,
  activeNavbar,
  activeIntro,
  activeProducts,
  activeServices,
  activeAbout,
  activeForm,
  activeColor,
  activeFont,
  handleActiveFont,
}) {
  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
  });

  return (
    <>
      <div className="ai-builder-overview">
        <Logo />
        <div className="fonts">
          <div className="fonts-core">
            <div
              className={`prev-button ${activePages.length < 4 ? "none" : ""}`}
            >
              <span className="material-symbols-outlined" onClick={handlePrev}>
                arrow_back_ios_new
              </span>
            </div>

            <div className="display-data">
              <Navbar
                activePages={activePages}
                dataPages={dataPages}
                siteTitle={siteTitle}
                currentPageId={currentPageId}
                activeNavbar={activeNavbar}
                activeIntro={activeIntro}
                toastMessage={toastMessage}
                activeColor={activeColor}
                activeFont={activeFont}
              />
              {currentPageId !== null && (
                <div className="display-data-font">
                  {dataElements
                    .filter((section) =>
                      activeSections[currentPageId]?.includes(
                        section.section_id
                      )
                    )
                    .map((section) => (
                      <Fragment key={section.section_id}>
                        {section.section_id ===
                        "798f1ce0-b732-45a6-838e-f28e137243f7" ? (
                          <Intro
                            activeIntro={activeIntro}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                          />
                        ) : section.section_id ===
                          "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                          <Products
                            activeProducts={activeProducts}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                          />
                        ) : section.section_id ===
                          "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                          <Services
                            activeServices={activeServices}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                          />
                        ) : section.section_id ===
                          "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                          <About
                            activeAbout={activeAbout}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                          />
                        ) : section.section_id ===
                          "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e" ? (
                          <Form
                            activeForm={activeForm}
                            toastMessage={toastMessage}
                            activeColor={activeColor}
                            activeFont={activeFont}
                          />
                        ) : (
                          <div className="no-element">{section.name}</div>
                        )}
                      </Fragment>
                    ))}
                </div>
              )}
              {/* <DefaultFooter dataPages={dataPages} /> */}
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
        <div className="fonts">
          <div className="fonts-title">Select a set of fonts</div>
          <div className="fonts-desc">
            Our designers have crafted these custom palettes, and you can adjust
            the fonts anytime.
          </div>
          <div className="content">
            {brands.map((brand) => {
              return (
                <div className={`content-item`} key={brand.id}>
                  <div className="content-item-title">{brand.name}</div>
                  <div className="content-item-list">
                    {fonts
                      .filter((font) => font.brand === brand.name)
                      .map((font) => {
                        const getBrand = font.brand;
                        const getGroup = font.group;

                        console.log(getBrand, getGroup);

                        const allType1 = AllFontType1({
                          brand: getBrand,
                          group: getGroup,
                        });
                        const allType2 = AllFontType2({
                          brand: getBrand,
                          group: getGroup,
                        });

                        return (
                          <div
                            className={`content-item-list-font ${
                              activeFont === font.id ? "active" : ""
                            }`}
                            key={font.id}
                            onClick={() => handleActiveFont(font.id)}
                          >
                            <span className={`${allType1}`}>
                              {font.fontType1}
                            </span>
                            <span className={`${allType2}`}>
                              {font.fontType2}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Fonts;
