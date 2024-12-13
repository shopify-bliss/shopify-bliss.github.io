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
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import servicesSample from "../../../../data/services.json";
import image from "/products/pexels-anna-nekrashevich-8516697.jpg";

function ExpalotServicesElStyles({
  layoutIds,
  activeServicesEl,
  handleActiveServicesEl,
  activeDescIds4,
  activeDescIds3,
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
                activeServicesEl === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveServicesEl(layout.id)}
            >
              {layout.id === 1 && (
                <>
                  <div className="template-title">Our Services</div>
                  <div className="template-wrapper">
                    {servicesSample.map((data) => {
                      const image = `products/${data.image}`;

                      return (
                        <>
                          <div className="container-item" key={data.id}>
                            <img className="template-image" src={image} />
                            <div className="template-name">
                              {data.name} Service
                            </div>
                            <div className="template-price">
                              {FormatCurrencyIDR(data.price)}
                            </div>
                            <div className="template-desc">{data.desc}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}

              {layout.id === 2 && (
                <>
                  <div className="template-title">Our Services</div>
                  <div className="template-wrapper">
                    {servicesSample.map((data) => {
                      return (
                        <div className="container-item" key={data.id}>
                          <div className="template-name">{data.name}</div>
                          <div className="template-desc">{data.desc}</div>
                          <div className="template-button">Learn more</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {layout.id === 3 && (
                <>
                  <div className="template-title">Our Services</div>
                  <div className="template-wrapper">
                    {servicesSample.map((data) => (
                      <div
                        className={`container-item ${
                          activeDescIds3.includes(data.id) ? "active" : ""
                        }`}
                        key={data.id}
                      >
                        <span className="material-symbols-outlined">
                          {activeDescIds3.includes(data.id) ? "remove" : "add"}
                        </span>
                        <div className="template-name">{data.name}</div>
                        {activeDescIds3.includes(data.id) && (
                          <div className="template-desc" key={data.id}>
                            {data.desc}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {layout.id === 4 && (
                <>
                  <div className="template-wrapper">
                    <div className="template-title">Our Services</div>
                    <div className="template-preface">
                      Use this section to explain what you provide. What key
                      information should people know about your services, and
                      what makes them stand out?
                    </div>
                    {servicesSample.map((data) => {
                      return (
                        <>
                          <div
                            className={`container-item ${
                              activeDescIds4.includes(data.id) ? "active" : ""
                            }`}
                            key={data.id}
                          >
                            <span className="material-symbols-outlined">
                              {activeDescIds4.includes(data.id)
                                ? "remove"
                                : "add"}
                            </span>
                            <div className="template-name">{data.name}</div>
                            {activeDescIds4.includes(data.id) && (
                              <div className="template-desc" key={data.id}>
                                {data.desc}
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                    <div className="template-button">Learn more</div>
                  </div>
                  <img className="template-image" src={image} alt="image" />
                </>
              )}
            </div>
          );
        })}
    </>
  );
}

function ServicesEl({
  handleActiveServicesEl,
  activeServicesEl,
  toastMessage,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [activeDescIds3, setActiveDescIds3] = useState([1]);
  const [activeDescIds4, setActiveDescIds4] = useState([1]);

  const typeServicesElStyles = useMemo(
    () =>
      sectionsElOptionLayout.find((option) => option.id === activeServicesEl),
    [activeServicesEl]
  );

  useEffect(() => {
    if (!typeServicesElStyles) {
      toastMessage("warn", "ServicesEl layout not found");
    }
  }, [typeServicesElStyles]);

  const handleOpenDesc3 = useCallback((id) => {
    setActiveDescIds3((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleOpenDesc4 = useCallback((id) => {
    setActiveDescIds4((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  return (
    <>
      <div className={`services-el ${typeServicesElStyles.className}`}>
        {typeServicesElStyles.id === 1 && (
          <>
            <div className="template-title">Our Services</div>
            <div className="template-wrapper">
              {servicesSample.map((data) => {
                const image = `products/${data.image}`;

                return (
                  <>
                    <div className="container-item" key={data.id}>
                      <img className="template-image" src={image} />
                      <div className="template-name">{data.name} Service</div>
                      <div className="template-price">
                        {FormatCurrencyIDR(data.price)}
                      </div>
                      <div className="template-desc">{data.desc}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        {typeServicesElStyles.id === 2 && (
          <>
            <div className="template-title">Our Services</div>
            <div className="template-wrapper">
              {servicesSample.map((data) => {
                return (
                  <div className="container-item" key={data.id}>
                    <div className="template-name">{data.name}</div>
                    <div className="template-desc">{data.desc}</div>
                    <div className="template-button">Learn more</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {typeServicesElStyles.id === 3 && (
          <>
            <div className="template-title">Our Services</div>
            <div className="template-wrapper">
              {servicesSample.map((data) => (
                <div
                  className={`container-item ${
                    activeDescIds3.includes(data.id) ? "active" : ""
                  }`}
                  key={data.id}
                  onClick={() => handleOpenDesc3(data.id)}
                >
                  <span className="material-symbols-outlined">
                    {activeDescIds3.includes(data.id) ? "remove" : "add"}
                  </span>
                  <div className="template-name">{data.name}</div>
                  {activeDescIds3.includes(data.id) && (
                    <div className="template-desc" key={data.id}>
                      {data.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {typeServicesElStyles.id === 4 && (
          <>
            <div className="template-wrapper">
              <div className="template-title">Our Services</div>
              <div className="template-preface">
                Use this section to explain what you provide. What key
                information should people know about your services, and what
                makes them stand out?
              </div>
              {servicesSample.map((data) => {
                return (
                  <>
                    <div
                      className={`container-item ${
                        activeDescIds4.includes(data.id) ? "active" : ""
                      }`}
                      key={data.id}
                      onClick={() => handleOpenDesc4(data.id)}
                    >
                      <span className="material-symbols-outlined">
                        {activeDescIds4.includes(data.id) ? "remove" : "add"}
                      </span>
                      <div className="template-name">{data.name}</div>
                      {activeDescIds4.includes(data.id) && (
                        <div className="template-desc" key={data.id}>
                          {data.desc}
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
              <div className="template-button">Learn more</div>
            </div>
            <img className="template-image" src={image} alt="image" />
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
        <div ref={expandLayoutRef} className="expalot-services-el">
          <div div className="expalot-services-el-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotServicesElStyles
                layoutIds={[1, 3]}
                activeServicesEl={activeServicesEl}
                handleActiveServicesEl={handleActiveServicesEl}
                activeDescIds3={activeDescIds3}
                activeDescIds4={activeDescIds4}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotServicesElStyles
                layoutIds={[2, 4]}
                activeServicesEl={activeServicesEl}
                handleActiveServicesEl={handleActiveServicesEl}
                activeDescIds3={activeDescIds3}
                activeDescIds4={activeDescIds4}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicesEl;
