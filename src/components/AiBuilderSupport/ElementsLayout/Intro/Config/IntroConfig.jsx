import React from "react";

function IntroConfig({
  layoutIds,
  activeIntro,
  handleActiveIntro,
  sectionsElOptionLayout,
  activeColor,
  activeFont,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => (
          <div
            key={layout.id}
            className={`${layout.className} ${
              activeIntro === layout.id ? "active" : ""
            }`}
            onClick={() => handleActiveIntro(layout.id)}
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

export default IntroConfig;
