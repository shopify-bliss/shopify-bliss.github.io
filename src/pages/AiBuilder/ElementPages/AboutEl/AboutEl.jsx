import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  ChangeLayout,
  useHandleActiveEl,
} from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import about from "../../../../data/about.json";

function ExpalotAboutElStyles({
  layoutIds,
  activeAboutEl,
  handleActiveAboutEl,
  imageStyle3 = null,
  imageStyle2 = null,
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
                    .map((data) => {
                      const image_1 = `products/${data.image_1}`;
                      const image2 = `products/${data.image_2}`;

                      return (
                        <>
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
                            src={image2}
                            alt="about section's image"
                          />
                        </>
                      );
                    })}
                </>
              )}

              {layout.id === 2 && (
                <>
                  {about
                    .filter((item) => item.id === 2)
                    .map((data) => {
                      return (
                        <>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc_1}</div>
                            <div className="template-desc">{data.desc_1}</div>
                          </div>
                          <div
                            className="template-image"
                            style={{
                              background: `url(${imageStyle2}) no-repeat
                              cover`,
                            }}
                          ></div>
                        </>
                      );
                    })}
                </>
              )}

              {layout.id === 3 && (
                <>
                  {about
                    .filter((item) => item.id === 3)
                    .map((data) => {
                      return (
                        <>
                          <div className="template-wrapper">
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
                    .map((data) => {
                      const image_1 = `products/${data.image_1}`;

                      return (
                        <>
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
                        </>
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

function AboutEl({ toastMessage }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const [activeAboutEl, setActiveAboutEl] = useState(1);
  const expandLayoutRef = useRef(null);
  const [imageStyle2, setImageStyle2] = useState(null);
  const [imageStyle3, setImageStyle3] = useState(null);

  useEffect(() => {
    const getId2 = about.filter((option) => option.id === 2);
    const getId3 = about.filter((option) => option.id === 3);

    setImageStyle2(
      getId2.map((item) => {
        return {
          image_1: `products/${item.image_1}`,
        };
      })[0].image_1
    );

    setImageStyle3(
      getId3.map((item) => {
        return {
          image_1: `products/${item.image_1}`,
        };
      })[0].image_1
    );
  }, [about]);

  useEffect(() => {
    console.log(imageStyle2);
  }, [imageStyle2]);

  const handleActiveAboutEl = useHandleActiveEl({
    setActiveEl: setActiveAboutEl,
  });

  const typeAboutElStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeAboutEl),
    [activeAboutEl]
  );

  useEffect(() => {
    if (!typeAboutElStyles) {
      toastMessage("warn", "AboutEl layout not found");
    }
  }, [typeAboutElStyles]);

  return (
    <>
      <div className={`about-el ${typeAboutElStyles.className}`}>
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
                imageStyle3={imageStyle3}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotAboutElStyles
                layoutIds={[2, 4]}
                activeAboutEl={activeAboutEl}
                handleActiveAboutEl={handleActiveAboutEl}
                imageStyle2={imageStyle2}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutEl;
