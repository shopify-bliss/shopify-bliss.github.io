import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import about from "../../../../data/about.json";

function ExpalotAboutElStyles({
  layoutIds,
  activeAboutEl,
  handleActiveAboutEl,
  imageStyle2,
  imageStyle3,
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
                activeAboutEl === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveAboutEl(layout.id)}
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

function AboutEl({ toastMessage, handleActiveAboutEl, activeAboutEl }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [imageStyle2, setImageStyle2] = useState(null);
  const [imageStyle3, setImageStyle3] = useState(null);

  const typeAboutElStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeAboutEl),
    [activeAboutEl]
  );

  useEffect(() => {
    if (!typeAboutElStyles) {
      toastMessage("warn", "AboutEl layout not found");
    }
  }, [typeAboutElStyles]);

  useEffect(() => {
    const getId2 = about.filter((option) => option.id === 2);
    const getId3 = about.filter((option) => option.id === 3);

    setImageStyle2(getId2.length > 0 ? `products/${getId2[0].image_1}` : null);
    setImageStyle3(getId3.length > 0 ? `products/${getId3[0].image_1}` : null);
  }, [about]);

  return (
    <>
      <div
        className={`about-el ${typeAboutElStyles.className}`}
        style={
          typeAboutElStyles.id === 3
            ? {
                background: `url(${imageStyle3}) no-repeat center / cover`,
              }
            : {}
        }
      >
        {typeAboutElStyles.id === 1 && (
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

        {typeAboutElStyles.id === 2 && (
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
                        background: `url(${imageStyle2}) no-repeat center / cover`,
                        minHeight: "35vh",
                      }}
                    ></div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeAboutElStyles.id === 3 && (
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

        {typeAboutElStyles.id === 4 && (
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

        <ChangeLayout
          expandLayoutRef={expandLayoutRef}
          isExpandLayout={isExpandLayout}
          setIsExpandLayout={setIsExpandLayout}
          onExpand={() => setIsExpandLayout(true)}
          onCollapse={() => setIsExpandLayout(false)}
        />
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-about-el">
          <div div className="expalot-about-el-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotAboutElStyles
                layoutIds={[1, 3]}
                activeAboutEl={activeAboutEl}
                handleActiveAboutEl={handleActiveAboutEl}
                imageStyle2={imageStyle2}
                imageStyle3={imageStyle3}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotAboutElStyles
                layoutIds={[2, 4]}
                activeAboutEl={activeAboutEl}
                handleActiveAboutEl={handleActiveAboutEl}
                imageStyle2={imageStyle2}
                imageStyle3={imageStyle3}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutEl;
