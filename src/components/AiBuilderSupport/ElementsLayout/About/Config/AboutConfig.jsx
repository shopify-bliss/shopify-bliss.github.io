import React, { Fragment } from "react";

function AboutConfig({
  layoutIds,
  activeAbout,
  handleActiveAbout,
  imageStyle2,
  imageStyle3,
  about,
  sectionsElOptionLayout,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => {
          return (
            <div
              key={layout.id}
              className={`${layout.className} ${
                activeAbout === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveAbout(layout.id)}
              style={
                layout.id === 3
                  ? {
                      background: `url(${imageStyle3}) no-repeat
                        center / cover`,
                    }
                  : {}
              }
            >
              {layout.id === 1 && (
                <>
                  {about
                    .filter((item) => item.id === 1)
                    .map((data, index) => {
                      const image_1 = `products/${data.image_1}`;
                      const image_2 = `products/${data.image_2}`;

                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc_1}</div>
                            <div className="template-button">{data.button}</div>
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

              {layout.id === 2 && (
                <>
                  {about
                    .filter((item) => item.id === 2)
                    .map((data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc_1}</div>
                            <div className="template-desc">{data.desc_2}</div>
                          </div>
                          <div
                            className="template-image"
                            style={{
                              background: `url(${imageStyle2}) no-repeat center 40% / cover`,
                            }}
                          ></div>
                        </Fragment>
                      );
                    })}
                </>
              )}

              {layout.id === 3 && (
                <>
                  {about
                    .filter((item) => item.id === 3)
                    .map((data, index) => {
                      return (
                        <>
                          <div className="template-wrapper" key={index}>
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">
                              {data.desc_1 + data.desc_2}
                            </div>
                            <div className="template-button">{data.button}</div>
                          </div>
                        </>
                      );
                    })}
                </>
              )}

              {layout.id === 4 && (
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
                            <div className="template-title">{data.title}</div>
                            <div className="template-loan">
                              <div className="template-desc">{data.desc_1}</div>
                              <div className="template-desc">{data.desc_2}</div>
                            </div>
                            <div className="template-button">{data.button}</div>
                          </div>
                        </Fragment>
                      );
                    })}
                </>
              )}
            </div>
          );
        })}
    </>
  );
}

export default AboutConfig;
