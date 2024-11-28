import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  ChangeLayout,
  useHandleActiveEl,
} from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import introElOptionLayout from "../../../../data/introElOptionLayout.json";

function ExpalotIntroElStyles({
  layoutIds,
  activeIntroEl,
  handleActiveIntroEl,
}) {
  return (
    <>
      {introElOptionLayout
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
                  <div className="template-brand">Your Brand Name</div>
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
}

function IntroEl({ handleActiveIntroEl, activeIntroEl }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const typeIntroElStyles = useMemo(
    () => introElOptionLayout.find((option) => option.id === activeIntroEl),
    [activeIntroEl]
  );

  useEffect(() => {
    if (!typeIntroElStyles) {
      toastMessage("warn", "IntroEl layout not found");
    }
  }, [typeIntroElStyles]);

  return (
    <>
      <div className={`intro-el ${typeIntroElStyles.className}`}>
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
              <div className="template-brand">Your Brand Name</div>
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
