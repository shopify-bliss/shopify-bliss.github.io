import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import about from "../../../../data/about.json";
import AboutConfig from "./Config/AboutConfig";
import {
  BgColors,
  SpecialColors,
  FontColors,
  OtherColors,
} from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";

function About({
  toastMessage,
  handleActiveAbout,
  activeNavbar,
  activeAbout,
  activeColors,
  activeFonts,
  firstAbout,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [imageStyle2, setImageStyle2] = useState(null);
  const [imageStyle3, setImageStyle3] = useState(null);

  const bg = BgColors({ activeColors });
  const special = SpecialColors({ activeColors });
  const others = OtherColors({ activeColors });
  const font = FontColors({ activeColors });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

  const typeAboutStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeAbout),
    [activeAbout]
  );

  useEffect(() => {
    if (!typeAboutStyles) {
      toastMessage("warn", "About layout not found");
    }
  }, [typeAboutStyles]);

  useEffect(() => {
    const getId2 = about.filter((option) => option.id === 2);
    const getId3 = about.filter((option) => option.id === 3);

    setImageStyle2(getId2.length > 0 ? `products/${getId2[0].image_1}` : null);
    setImageStyle3(getId3.length > 0 ? `products/${getId3[0].image_1}` : null);
  }, [about]);

  return (
    <>
      <div
        className={`about ${typeAboutStyles.className} ${
          activeAbout === 2 ? others : bg
        } ${firstAbout ? "first-about" : ""} ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        }`}
        style={
          typeAboutStyles.id === 3
            ? {
                background: `url(${imageStyle3}) no-repeat center / cover`,
              }
            : {}
        }
      >
        {typeAboutStyles.id === 1 && (
          <>
            {about
              .filter((item) => item.id === 1)
              .map((data, index) => {
                const image_1 = `products/${data.image_1}`;
                const image_2 = `products/${data.image_2}`;

                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2} ${font}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc_1}
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {data.button}
                      </div>
                      <img
                        className="template-image-1"
                        src={image_1}
                        alt="about section's image"
                      />
                    </div>
                    <img
                      className="template-image-2"
                      src={image_2}
                      alt="about section's image"
                    />
                  </Fragment>
                );
              })}
          </>
        )}

        {typeAboutStyles.id === 2 && (
          <>
            {about
              .filter((item) => item.id === 2)
              .map((data, index) => {
                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2} ${font}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc_1}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc_2}
                      </div>
                    </div>
                    <div
                      className="template-image"
                      style={{
                        background: `url(${imageStyle2}) no-repeat center / cover`,
                        minHeight: "35vh",
                      }}
                    ></div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeAboutStyles.id === 3 && (
          <>
            {about
              .filter((item) => item.id === 3)
              .map((data, index) => {
                return (
                  <>
                    <div className={`template-wrapper ${bg}`} key={index}>
                      <div className={`template-title ${type2} ${font}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc_1 + data.desc_2}
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {data.button}
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        )}

        {typeAboutStyles.id === 4 && (
          <>
            {about
              .filter((item) => item.id === 4)
              .map((data, index) => {
                const image_1 = `products/${data.image_1}`;

                return (
                  <Fragment key={index}>
                    <img
                      className="template-image"
                      src={image_1}
                      alt="about section's image"
                    />
                    <div className="template-wrapper">
                      <div className={`template-title ${type2} ${font}`}>
                        {data.title}
                      </div>
                      <div className="template-loan">
                        <div className={`template-desc ${type1}`}>
                          {data.desc_1}
                        </div>
                        <div className={`template-desc ${type1}`}>
                          {data.desc_2}
                        </div>
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {data.button}
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
        <div ref={expandLayoutRef} className="expalot-about">
          <div div className="expalot-about-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <AboutConfig
                layoutIds={[1, 3]}
                activeAbout={activeAbout}
                handleActiveAbout={handleActiveAbout}
                imageStyle2={imageStyle2}
                imageStyle3={imageStyle3}
                about={about}
                sectionsElOptionLayout={sectionsElOptionLayout}
              />
            </div>
            <div className="wrapper-right">
              <AboutConfig
                layoutIds={[2, 4]}
                activeAbout={activeAbout}
                handleActiveAbout={handleActiveAbout}
                imageStyle2={imageStyle2}
                imageStyle3={imageStyle3}
                about={about}
                sectionsElOptionLayout={sectionsElOptionLayout}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default About;
