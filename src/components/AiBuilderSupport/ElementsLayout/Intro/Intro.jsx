import React, { useRef, useState, useEffect, useMemo } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import IntroConfig from "./Config/IntroConfig";
import { OtherColors } from "../../ColorsSupport";

function Intro({
  handleActiveIntro = null,
  activeIntro,
  activeNavbar,
  toastMessage,
  activeColor,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const others = OtherColors({ activeColor });

  const typeIntroStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeIntro),
    [activeIntro]
  );

  useEffect(() => {
    if (!typeIntroStyles) {
      toastMessage("warn", "Intro layout not found");
    }
  }, [typeIntroStyles, toastMessage]);

  return (
    <>
      <div
        className={`intro ${typeIntroStyles.className} ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        } ${others}`}
      >
        {typeIntroStyles.id === 1 && (
          <>
            <div className="template-brand">Your Brand Name</div>
            <div className="template-desc">
              Greet visitors to your site with a brief, engaging introduction
              that reflects your personality.
            </div>
            <div className="template-image"></div>
          </>
        )}

        {typeIntroStyles.id === 2 && (
          <>
            <div className="template-wrapper">
              <div className="template-preface">Introduce your brand</div>
              <div className="template-desc">
                Greet visitors to your site with a brief, engaging introduction
                that reflects your personality.
              </div>
              <div className="template-button">Learn More</div>
            </div>
            <div className="template-image"></div>
          </>
        )}

        {typeIntroStyles.id === 3 && (
          <>
            <div className="template-preface">Introduce your brand</div>
            <div className="template-desc">
              Greet visitors to your site with a brief, engaging introduction
              that reflects your personality.
            </div>
            <div className="template-button">Learn More</div>
          </>
        )}

        {typeIntroStyles.id === 4 && (
          <>
            <div className="template-desc">
              Greet visitors to your site with a brief, engaging introduction
              that reflects your personality.
            </div>
            <div className="template-button">Learn More</div>
            <div className="template-wrapper">
              <div className="template-brand">
                <p>Your</p>
                <p>Brand</p>
                <p>Name</p>
                <p aria-hidden="true">Your</p>
                <p aria-hidden="true">Brand</p>
                <p aria-hidden="true">Name</p>
              </div>
            </div>
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
              />
            </div>
            <div className="wrapper-right">
              <IntroConfig
                layoutIds={[2, 4]}
                activeIntro={activeIntro}
                handleActiveIntro={handleActiveIntro}
                sectionsElOptionLayout={sectionsElOptionLayout}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Intro;
