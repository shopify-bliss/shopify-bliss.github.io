import { Fragment } from "react";
import PropTypes from "prop-types";

function IntroConfig({
  layoutIds,
  activeIntro,
  handleActiveIntro,
  sectionsElOptionLayout,
  introSample,
  imageStyle3,
  imageStyle4,
  imageIntro,
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
            style={
              layout.id === 3
                ? { background: `url(${imageStyle3}) no-repeat center / cover` }
                : layout.id === 4
                ? {
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageStyle4}) no-repeat center / cover`,
                  }
                : {}
            }
          >
            {layout.id === 1 && (
              <>
                {introSample
                  .filter((intro) => intro.id === 1)
                  .map((intro) => {
                    return (
                      <Fragment key={intro.id}>
                        <div className="template-brand">{intro.brand}</div>
                        <div className="template-desc">{intro.desc}</div>
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

            {layout.id === 2 && (
              <>
                {introSample
                  .filter((intro) => intro.id === 2)
                  .map((intro) => {
                    return (
                      <Fragment key={intro.id}>
                        <div className="template-wrapper">
                          <div className="template-preface">
                            {intro.preface}
                          </div>
                          <div className="template-desc">{intro.desc}</div>
                          <div className="template-button">{intro.button}</div>
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

            {layout.id === 3 && (
              <>
                {introSample
                  .filter((intro) => intro.id === 3)
                  .map((intro) => {
                    return (
                      <Fragment key={intro.id}>
                        <div className="template-preface">{intro.preface}</div>
                        <div className="template-desc">{intro.desc}</div>
                        <div className="template-button">{intro.button}</div>
                      </Fragment>
                    );
                  })}
              </>
            )}

            {layout.id === 4 && (
              <>
                {introSample
                  .filter((intro) => intro.id === 4)
                  .map((intro) => {
                    return (
                      <Fragment key={intro.id}>
                        <div className="template-desc">{intro.desc}</div>
                        <div className="template-button">{intro.button}</div>
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
                      </Fragment>
                    );
                  })}
              </>
            )}
          </div>
        ))}
    </>
  );
}

IntroConfig.propTypes = {
  layoutIds: PropTypes.array,
  activeIntro: PropTypes.number,
  handleActiveIntro: PropTypes.func,
  sectionsElOptionLayout: PropTypes.array,
  introSample: PropTypes.array,
  imageStyle3: PropTypes.string,
  imageStyle4: PropTypes.string,
  imageIntro: PropTypes.func,
};

export default IntroConfig;
