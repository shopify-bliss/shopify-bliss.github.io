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
import colors from "../../../data/colors.json";
import brands from "../../../data/brands.json";

function Colors({
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
  handleActiveColor,
  activeFont,
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
        <div className="colors">
          <div className="colors-core">
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
                <div className="display-data-color">
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
        <div className="colors">
          <div className="colors-title">Select a set of colors</div>
          <div className="colors-desc">
            Our designers have crafted these custom palettes, and you can adjust
            the colors anytime.
          </div>
          <div className="content">
            {brands.map((brand) => {
              return (
                <div className={`content-item`} key={brand.id}>
                  <div className="content-item-title">{brand.name}</div>
                  <div className="content-item-list">
                    {colors
                      .filter((color) => color.brand === brand.name)
                      .map((color) => {
                        return (
                          <div
                            className={`content-item-list-color ${
                              activeColor === color.id ? "active" : ""
                            }`}
                            key={color.id}
                            onClick={() => handleActiveColor(color.id)}
                          >
                            <span
                              className={`color-special-${color.color1}`}
                            ></span>
                            <span
                              className={`color-other-${color.color2}`}
                            ></span>
                            <span className={`color-bg-${color.color3}`}></span>
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

export default Colors;
