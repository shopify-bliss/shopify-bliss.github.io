import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import serviceSamples from "../../../../data/services.json";
import image from "/products/pexels-anna-nekrashevich-8516697.jpg";
import ServicesConfig from "./Config/ServicesConfig";
import { BgColors } from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";

function Services({
  handleActiveServices,
  activeServices,
  activeNavbar,
  toastMessage,
  activeColors,
  activeFonts,
  firstService,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [activeDescIds3, setActiveDescIds3] = useState([1]);
  const [activeDescIds4, setActiveDescIds4] = useState([1]);

  const bg = BgColors({ activeColors });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

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
      <div
        className={`services ${typeServicesElStyles.className} ${bg} ${
          firstService ? "first-service" : ""
        } ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        }`}
      >
        {typeServicesElStyles.id === 1 && (
          <>
            {serviceSamples
              .filter((service) => service.id === 1)
              .map((service) => {
                return (
                  <Fragment key={service.id}>
                    <div className={`template-title ${type2}`}>
                      {service.title}
                    </div>
                    <div className="template-wrapper">
                      {service.services.map((data) => {
                        const image = `products/${data.image}`;

                        return (
                          <>
                            <div className="container-item" key={data.id}>
                              <img className="template-image" src={image} />
                              <div className={`template-name ${type2}`}>
                                {data.name} Service
                              </div>
                              <div className={`template-price ${type1}`}>
                                {FormatCurrencyIDR(data.price)}
                              </div>
                              <div className={`template-desc ${type1}`}>
                                {data.desc}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeServicesElStyles.id === 2 && (
          <>
            {serviceSamples
              .filter((service) => service.id === 2)
              .map((service) => {
                return (
                  <Fragment key={service.id}>
                    <div className={`template-title ${type2}`}>
                      {service.title}
                    </div>
                    <div className="template-wrapper">
                      {service.services.map((data) => {
                        return (
                          <div className="container-item" key={data.id}>
                            <div className={`template-name ${type2}`}>
                              {data.name}
                            </div>
                            <div className={`template-desc ${type1}`}>
                              {data.desc}
                            </div>
                            <div className={`template-button ${type1}`}>
                              {service.button}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}
        {typeServicesElStyles.id === 3 && (
          <>
            {serviceSamples
              .filter((service) => service.id === 3)
              .map((service) => {
                return (
                  <Fragment key={service.id}>
                    <div className={`template-title ${type2}`}>
                      {service.title}
                    </div>
                    <div className="template-wrapper">
                      {service.services.map((data) => (
                        <div
                          className={`container-item ${
                            activeDescIds3.includes(data.id) ? "active" : ""
                          }`}
                          key={data.id}
                          onClick={() => handleOpenDesc3(data.id)}
                        >
                          <span className="material-symbols-outlined">
                            {activeDescIds3.includes(data.id)
                              ? "remove"
                              : "add"}
                          </span>
                          <div className={`template-name ${type2}`}>
                            {data.name}
                          </div>
                          {activeDescIds3.includes(data.id) && (
                            <div
                              className={`template-desc ${type1}`}
                              key={data.id}
                            >
                              {data.desc}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}
        {typeServicesElStyles.id === 4 && (
          <>
            {serviceSamples
              .filter((service) => service.id === 4)
              .map((service) => {
                return (
                  <Fragment key={service.id}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2}`}>
                        {service.title}
                      </div>
                      <div className={`template-preface ${type2}`}>
                        {service.preface}
                      </div>
                      {service.services.map((data) => {
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
                                {activeDescIds4.includes(data.id)
                                  ? "remove"
                                  : "add"}
                              </span>
                              <div className={`template-name ${type2}`}>
                                {data.name}
                              </div>
                              {activeDescIds4.includes(data.id) && (
                                <div
                                  className={`template-desc ${type1}`}
                                  key={data.id}
                                >
                                  {data.desc}
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })}
                      <div className={`template-button ${type1}`}>
                        {service.button}
                      </div>
                    </div>
                    <img className="template-image" src={image} alt="image" />
                  </Fragment>
                );
              })}
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
                serviceSamples={serviceSamples}
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
                serviceSamples={serviceSamples}
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
