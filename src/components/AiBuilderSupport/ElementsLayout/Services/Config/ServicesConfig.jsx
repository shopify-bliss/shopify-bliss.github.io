import React from "react";

function ServicesConfig({
  layoutIds,
  activeServices,
  handleActiveServices,
  activeDescIds4,
  activeDescIds3,
  servicesSample,
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

export default ServicesConfig;
