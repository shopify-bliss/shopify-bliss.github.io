import { Fragment } from "react";
import PropTypes from "prop-types";

function ServicesConfig({
  layoutIds,
  activeServices,
  handleActiveServices,
  activeDescIds4,
  activeDescIds3,
  serviceSamples,
  sectionsElOptionLayout,
  FormatCurrencyIDR,
  image,
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
                activeServices === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveServices(layout.id)}
            >
              {layout.id === 1 && (
                <>
                  {serviceSamples
                    .filter((service) => service.id === 1)
                    .map((service) => {
                      return (
                        <Fragment key={service.id}>
                          <div className="template-title">{service.title}</div>
                          <div className="template-wrapper">
                            {service.services.map((data) => {
                              const image = `products/${data.image}`;

                              return (
                                <>
                                  <div className="container-item" key={data.id}>
                                    <img
                                      className="template-image"
                                      src={image}
                                    />
                                    <div className="template-name">
                                      {data.name} Service
                                    </div>
                                    <div className="template-price">
                                      {FormatCurrencyIDR(data.price)}
                                    </div>
                                    <div className="template-desc">
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

              {layout.id === 2 && (
                <>
                  {serviceSamples
                    .filter((service) => service.id === 2)
                    .map((service) => {
                      return (
                        <Fragment key={service.id}>
                          <div className="template-title">{service.title}</div>
                          <div className="template-wrapper">
                            {service.services.map((data) => {
                              return (
                                <div className="container-item" key={data.id}>
                                  <div className="template-name">
                                    {data.name}
                                  </div>
                                  <div className="template-desc">
                                    {data.desc}
                                  </div>
                                  <div className="template-button">
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

              {layout.id === 3 && (
                <>
                  {serviceSamples
                    .filter((service) => service.id === 3)
                    .map((service) => {
                      return (
                        <Fragment key={service.id}>
                          <div className="template-title">{service.title}</div>
                          <div className="template-wrapper">
                            {service.services.map((data) => (
                              <div
                                className={`container-item ${
                                  activeDescIds3.includes(data.id)
                                    ? "active"
                                    : ""
                                }`}
                                key={data.id}
                              >
                                <span className="material-symbols-outlined">
                                  {activeDescIds3.includes(data.id)
                                    ? "remove"
                                    : "add"}
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
                        </Fragment>
                      );
                    })}
                </>
              )}

              {layout.id === 4 && (
                <>
                  {serviceSamples
                    .filter((service) => service.id === 4)
                    .map((service) => {
                      return (
                        <Fragment key={service.id}>
                          <div className="template-wrapper">
                            <div className="template-title">
                              {service.title}
                            </div>
                            <div className="template-preface">
                              {service.preface}
                            </div>
                            {service.services.map((data) => {
                              return (
                                <>
                                  <div
                                    className={`container-item ${
                                      activeDescIds4.includes(data.id)
                                        ? "active"
                                        : ""
                                    }`}
                                    key={data.id}
                                  >
                                    <span className="material-symbols-outlined">
                                      {activeDescIds4.includes(data.id)
                                        ? "remove"
                                        : "add"}
                                    </span>
                                    <div className="template-name">
                                      {data.name}
                                    </div>
                                    {activeDescIds4.includes(data.id) && (
                                      <div
                                        className="template-desc"
                                        key={data.id}
                                      >
                                        {data.desc}
                                      </div>
                                    )}
                                  </div>
                                </>
                              );
                            })}
                            <div className="template-button">
                              {service.button}
                            </div>
                          </div>
                          <img
                            className="template-image"
                            src={image}
                            alt="image"
                          />
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

ServicesConfig.propTypes = {
  layoutIds: PropTypes.array,
  activeServices: PropTypes.number,
  handleActiveServices: PropTypes.func,
  activeDescIds4: PropTypes.array,
  activeDescIds3: PropTypes.array,
  serviceSamples: PropTypes.array,
  sectionsElOptionLayout: PropTypes.array,
  FormatCurrencyIDR: PropTypes.func,
  image: PropTypes.string,
};

export default ServicesConfig;
