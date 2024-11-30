import React, { useRef, useState, useEffect, useMemo } from "react";
import { ChangeLayout } from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";

function ExpalotIntroElStyles({
  layoutIds,
  activeIntroEl,
  handleActiveIntroEl,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => (
          <div
            key={layout.id}
            className={`${layout.className} ${
              activeIntroEl === layout.id ? "active" : ""
            }`}
            onClick={() => handleActiveIntroEl(layout.id)}
          >
            {layout.id === 1 && (
              <>
                <div className="template-brand">Your Brand Name</div>
                <div className="template-desc">
                  Greet visitors to your site with a brief, engaging
                  introduction that reflects your personality.
                </div>
                <div className="template-image"></div>
              </>
            )}

            {layout.id === 2 && (
              <>
                <div className="template-wrapper">
                  <div className="template-preface">Introduce your brand</div>
                  <div className="template-desc">
                    Greet visitors to your site with a brief, engaging
                    introduction that reflects your personality.
                  </div>
                  <div className="template-button">Learn More</div>
                </div>
                <div className="template-image"></div>
              </>
            )}

            {layout.id === 3 && (
              <>
                <div className="template-preface">Introduce your brand</div>
                <div className="template-desc">
                  Greet visitors to your site with a brief, engaging
                  introduction that reflects your personality.
                </div>
                <div className="template-button">Learn More</div>
              </>
            )}

            {layout.id === 4 && (
              <>
                <div className="template-desc">
                  Greet visitors to your site with a brief, engaging
                  introduction that reflects your personality.
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
          </div>
        ))}
    </>
  );
}

function IntroEl({ handleActiveIntroEl, activeIntroEl, activeNavbar }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const typeIntroElStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeIntroEl),
    [activeIntroEl]
  );

  useEffect(() => {
    if (!typeIntroElStyles) {
      toastMessage("warn", "IntroEl layout not found");
    }
  }, [typeIntroElStyles]);

  return (
    <>
      <div
        className={`intro-el ${typeIntroElStyles.className} ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        }`}
      >
        {typeIntroElStyles.id === 1 && (
          <>
            <div className="template-brand">Your Brand Name</div>
            <div className="template-desc">
              Greet visitors to your site with a brief, engaging introduction
              that reflects your personality.
            </div>
            <div className="template-image"></div>
          </>
        )}

        {typeIntroElStyles.id === 2 && (
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

        {typeIntroElStyles.id === 3 && (
          <>
            <div className="template-preface">Introduce your brand</div>
            <div className="template-desc">
              Greet visitors to your site with a brief, engaging introduction
              that reflects your personality.
            </div>
            <div className="template-button">Learn More</div>
          </>
        )}

        {typeIntroElStyles.id === 4 && (
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

        <ChangeLayout
          expandLayoutRef={expandLayoutRef}
          isExpandLayout={isExpandLayout}
          setIsExpandLayout={setIsExpandLayout}
          onExpand={() => setIsExpandLayout(true)}
          onCollapse={() => setIsExpandLayout(false)}
        />
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-intro-el">
          <div div className="expalot-intro-el-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotIntroElStyles
                layoutIds={[1, 3]}
                activeIntroEl={activeIntroEl}
                handleActiveIntroEl={handleActiveIntroEl}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotIntroElStyles
                layoutIds={[2, 4]}
                activeIntroEl={activeIntroEl}
                handleActiveIntroEl={handleActiveIntroEl}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IntroEl;
