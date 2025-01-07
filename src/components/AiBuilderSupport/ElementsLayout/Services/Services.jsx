import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import servicesSample from "../../../../data/services.json";
import image from "/products/pexels-anna-nekrashevich-8516697.jpg";
import ServicesConfig from "./Config/ServicesConfig";
import { BgColors } from "../../ColorsSupport";

function Services({
  handleActiveServices,
  activeServices,
  toastMessage,
  activeColor,
  activeFont,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [activeDescIds3, setActiveDescIds3] = useState([1]);
  const [activeDescIds4, setActiveDescIds4] = useState([1]);

  const bg = BgColors({ activeColor });

  const typeServicesElStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeServices),
    [activeServices]
  );

  useEffect(() => {
    if (!typeServicesElStyles) {
      toastMessage("warn", "Services layout not found");
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
      <div className={`services ${typeServicesElStyles.className} ${bg}`}>
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
        <div ref={expandLayoutRef} className="expalot-services">
          <div div className="expalot-services-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ServicesConfig
                layoutIds={[1, 3]}
                activeServices={activeServices}
                handleActiveServices={handleActiveServices}
                activeDescIds3={activeDescIds3}
                activeDescIds4={activeDescIds4}
                sectionsElOptionLayout={sectionsElOptionLayout}
                servicesSample={servicesSample}
                FormatCurrencyIDR={FormatCurrencyIDR}
                image={image}
              />
            </div>
            <div className="wrapper-right">
              <ServicesConfig
                layoutIds={[2, 4]}
                activeServices={activeServices}
                handleActiveServices={handleActiveServices}
                activeDescIds3={activeDescIds3}
                activeDescIds4={activeDescIds4}
                sectionsElOptionLayout={sectionsElOptionLayout}
                servicesSample={servicesSample}
                FormatCurrencyIDR={FormatCurrencyIDR}
                image={image}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
