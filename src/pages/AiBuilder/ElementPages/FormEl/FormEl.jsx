import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import form from "../../../../data/form.json";

function ExpalotFormElStyles({ layoutIds, activeFormEl, handleActiveFormEl }) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => {
          return (
            <div
              key={layout.id}
              className={`${layout.className} ${
                activeFormEl === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveFormEl(layout.id)}
            >
              {layout.id === 1 && (
                <>
                  {form
                    .filter((item) => item.id === 1)
                    .map((data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="template-title">{data.title}</div>
                          <div className="template-desc">{data.desc}</div>
                          <form className="template-form">
                            {data.email === true && (
                              <>
                                <div className="template-form-group">
                                  <label htmlFor="email"></label>
                                  <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                  />
                                </div>
                              </>
                            )}

                            {data.phone === true && (
                              <>
                                <div className="template-form-group">
                                  <label htmlFor="phone"></label>
                                  <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    placeholder="Phone number"
                                  />
                                </div>
                              </>
                            )}

                            {data.message === true && (
                              <textarea name="message" id="message">
                                Message
                              </textarea>
                            )}

                            <button type="submit" className="template-button">
                              {data.button}
                            </button>
                          </form>
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

function FormEl({ toastMessage, activeFormEl, handleActiveFormEl }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const typeFormElStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeFormEl),
    [activeFormEl]
  );

  useEffect(() => {
    if (!typeFormElStyles) {
      toastMessage("warn", "FormEl layout not found");
    }
  }, [typeFormElStyles]);

  return (
    <>
      <div className={`form-el ${typeFormElStyles.className}`}>
        <ChangeLayout
          expandLayoutRef={expandLayoutRef}
          isExpandLayout={isExpandLayout}
          setIsExpandLayout={setIsExpandLayout}
          onExpand={() => setIsExpandLayout(true)}
          onCollapse={() => setIsExpandLayout(false)}
        />
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-form-el">
          <div div className="expalot-form-el-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotFormElStyles
                layoutIds={[1, 3]}
                activeFormEl={activeFormEl}
                handleActiveFormEl={handleActiveFormEl}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotFormElStyles
                layoutIds={[2, 4]}
                activeFormEl={activeFormEl}
                handleActiveFormEl={handleActiveFormEl}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FormEl;
