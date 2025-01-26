import { Fragment } from "react";
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
import {
  AllFontType1,
  AllFontType2,
} from "../../../components/AiBuilderSupport/FontsSupport";
import FirstComponent from "../../../components/AiBuilderSupport/FirstComponent";
import { BgColors } from "../../../components/AiBuilderSupport/ColorsSupport";
import PropTypes from "prop-types";

function Fonts({
  activePages,
  activeSections,
  siteTitle,
  dataBrands,
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
  activeColors,
  activeFonts,
  handleactiveFonts,
  dataFonts,
}) {
  const { handleNext, handlePrev } = ControllingOverviews({
    activePages: activePages,
    currentPageId: currentPageId,
    setCurrentPageId: setCurrentPageId,
  });

  const { firstProduct, firstService, firstAbout, firstForm } = FirstComponent({
    activeSections: activeSections,
    currentPageId: currentPageId,
  });

  const bg = BgColors({ activeColors });

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

            <div className={`display-data ${bg}`}>
              <Navbar
                siteTitle={siteTitle}
                activePages={activePages}
                dataPages={dataPages}
                currentPageId={currentPageId}
                activeSections={activeSections}
                activeNavbar={activeNavbar}
                activeIntro={activeIntro}
                toastMessage={toastMessage}
                activeColors={activeColors}
                activeFonts={activeFonts}
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
                            currentPageId={currentPageId}
                            activeIntro={activeIntro}
                            activeNavbar={activeNavbar}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            activeSections={activeSections}
                          />
                        ) : section.section_id ===
                          "b42d4d56-d411-4aa8-ae01-52f0c406328a" ? (
                          <Products
                            activeProducts={activeProducts}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            activeNavbar={activeNavbar}
                            firstProduct={firstProduct}
                          />
                        ) : section.section_id ===
                          "4fd1e0cc-06f3-4554-9f79-ce8e02db03c8" ? (
                          <Services
                            activeServices={activeServices}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            activeNavbar={activeNavbar}
                            firstService={firstService}
                          />
                        ) : section.section_id ===
                          "1a988ed7-6ddb-44c1-8a9e-2dca26ebb0ed" ? (
                          <About
                            activeAbout={activeAbout}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            activeNavbar={activeNavbar}
                            firstAbout={firstAbout}
                          />
                        ) : section.section_id ===
                          "2089ce88-93a7-4555-8d0d-7f88f1dc3a7e" ? (
                          <Form
                            activeForm={activeForm}
                            toastMessage={toastMessage}
                            activeColors={activeColors}
                            activeFonts={activeFonts}
                            activeNavbar={activeNavbar}
                            firstForm={firstForm}
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
          <div className="fonts-title">Select a combination of fonts</div>
          <div className="fonts-desc">
            Our designers have created these custom pairings, but you can
            explore other font options later.
          </div>
          <div className="content">
            {dataBrands.map((brand) => {
              return (
                <div className={`content-item`} key={brand.brand_id}>
                  <div className="content-item-title">{brand.name}</div>
                  <div className="content-item-list">
                    {dataFonts
                      .filter(
                        (font) =>
                          font.brand_id === brand.brand_id &&
                          font.is_develope === false
                      )
                      .map((font) => {
                        const getBrand = font.brand_id;
                        const getGroup = font.group;

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
                              activeFonts === font.font_designs_id
                                ? "active"
                                : ""
                            }`}
                            key={font.font_designs_id}
                            onClick={() =>
                              handleactiveFonts(font.font_designs_id)
                            }
                          >
                            <span className={`${allType1}`}>
                              {font.font1.name}
                            </span>
                            <span className={`${allType2}`}>
                              {font.font2.name}
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

Fonts.propTypes = {
  dataFonts: PropTypes.array,
  activeFonts: PropTypes.string,
  handleactiveFonts: PropTypes.func,
  activeColors: PropTypes.string,
  activePages: PropTypes.array,
  activeSections: PropTypes.object,
  siteTitle: PropTypes.string,
  dataBrands: PropTypes.array,
  dataPages: PropTypes.array,
  currentPageId: PropTypes.string,
  setCurrentPageId: PropTypes.func,
  toastMessage: PropTypes.func,
  dataElements: PropTypes.array,
  activeNavbar: PropTypes.string,
  activeIntro: PropTypes.string,
  activeProducts: PropTypes.string,
  activeServices: PropTypes.string,
  activeAbout: PropTypes.string,
  activeForm: PropTypes.string,
};

export default Fonts;
