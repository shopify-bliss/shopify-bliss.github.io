import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import IntroConfig from "./Config/IntroConfig";
import {
  OtherColors,
  SpecialColors,
  IntroColorsWhite,
} from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";
import introSample from "../../../../data/intro.json";

function Intro({
  handleActiveIntro = null,
  activeSections,
  currentPageId,
  activeIntro,
  activeNavbar,
  toastMessage,
  activeColors,
  activeFonts,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const [imageStyle3, setImageStyle3] = useState(null);
  const [imageStyle4, setImageStyle4] = useState(null);
  const expandLayoutRef = useRef(null);

  const others = OtherColors({ activeColors });
  const colorStyle = IntroColorsWhite({
    others,
    activeSections: activeSections[currentPageId],
  });
  const special = SpecialColors({ activeColors });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

  const typeIntroStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeIntro),
    [activeIntro]
  );

  useEffect(() => {
    if (!typeIntroStyles) {
      toastMessage("warn", "Intro layout not found");
    }
  }, [typeIntroStyles, toastMessage]);

  useEffect(() => {
    const getId3 = introSample.filter((intro) => intro.id === 3);
    const getId4 = introSample.filter((intro) => intro.id === 4);

    setImageStyle3(getId3.length > 0 ? `intro/${getId3[0].image}` : null);
    setImageStyle4(getId4.length > 0 ? `intro/${getId4[0].image}` : null);
  }, []);

  const imageIntro = (intro) =>
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(intro/${intro.image}) no-repeat center / cover`;

  const styleParent = () => {
    const backgroundStyle =
      typeIntroStyles.id === 3
        ? { background: `url(${imageStyle3}) no-repeat center / cover` }
        : typeIntroStyles.id === 4
        ? {
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageStyle4}) no-repeat center / cover`,
          }
        : {};

    return { ...backgroundStyle, ...colorStyle };
  };

  return (
    <>
      <div
        className={`intro ${typeIntroStyles.className} ${
          activeNavbar === 1
            ? "navbar-1"
            : activeNavbar === 2
            ? "navbar-2"
            : activeNavbar === 3
            ? "navbar-3"
            : activeNavbar === 4
            ? "navbar-4"
            : ""
        } ${others}`}
        style={styleParent()}
      >
        {typeIntroStyles.id === 1 && (
          <>
            {introSample
              .filter((intro) => intro.id === 1)
              .map((intro) => {
                return (
                  <Fragment key={intro.id}>
                    <div className={`template-brand ${type2}`}>
                      {intro.brand}
                    </div>
                    <div className={`template-desc ${type1}`}>{intro.desc}</div>
                    <div
                      className="template-image"
                      style={
                        intro.image !== null
                          ? { background: imageIntro(intro) }
                          : {}
                      }
                    ></div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeIntroStyles.id === 2 && (
          <>
            {introSample
              .filter((intro) => intro.id === 2)
              .map((intro) => {
                return (
                  <Fragment key={intro.id}>
                    <div className="template-wrapper">
                      <div className={`template-preface ${type2}`}>
                        {intro.preface}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {intro.desc}
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {intro.button}
                      </div>
                    </div>
                    <div
                      className="template-image"
                      style={
                        intro.image !== null
                          ? { background: imageIntro(intro) }
                          : {}
                      }
                    ></div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeIntroStyles.id === 3 && (
          <>
            {introSample
              .filter((intro) => intro.id === 3)
              .map((intro) => {
                return (
                  <Fragment key={intro.id}>
                    <div className={`template-preface ${type2}`}>
                      {intro.preface}
                    </div>
                    <div className={`template-desc ${type1}`}>{intro.desc}</div>
                    <div className={`template-button ${type1} ${special}`}>
                      {intro.button}
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeIntroStyles.id === 4 && (
          <>
            {introSample
              .filter((intro) => intro.id === 4)
              .map((intro) => {
                return (
                  <Fragment key={intro.id}>
                    <div className={`template-desc ${type1}`}>{intro.desc}</div>
                    <div className={`template-button ${type1} ${special}`}>
                      {intro.button}
                    </div>
                    <div className="template-wrapper">
                      <div className={`template-brand ${type2}`}>
                        <p>Your</p>
                        <p>Brand</p>
                        <p>Name</p>
                        <p aria-hidden="true">Your</p>
                        <p aria-hidden="true">Brand</p>
                        <p aria-hidden="true">Name</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeMain === "element" && (
          <ChangeLayout
            expandLayoutRef={expandLayoutRef}
            isExpandLayout={isExpandLayout}
            setIsExpandLayout={setIsExpandLayout}
            onExpand={() => setIsExpandLayout(true)}
            onCollapse={() => setIsExpandLayout(false)}
          />
        )}
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-intro">
          <div div className="expalot-intro-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <IntroConfig
                layoutIds={[1, 3]}
                activeIntro={activeIntro}
                handleActiveIntro={handleActiveIntro}
                sectionsElOptionLayout={sectionsElOptionLayout}
                introSample={introSample}
                imageStyle3={imageStyle3}
                imageStyle4={imageStyle4}
                imageIntro={imageIntro}
              />
            </div>
            <div className="wrapper-right">
              <IntroConfig
                layoutIds={[2, 4]}
                activeIntro={activeIntro}
                handleActiveIntro={handleActiveIntro}
                sectionsElOptionLayout={sectionsElOptionLayout}
                introSample={introSample}
                imageStyle3={imageStyle3}
                imageStyle4={imageStyle4}
                imageIntro={imageIntro}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Intro;
