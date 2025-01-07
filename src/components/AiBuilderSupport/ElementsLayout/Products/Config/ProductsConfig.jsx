import React from "react";

function ProductsConfig({
  layoutIds,
  activeProducts,
  handleActiveProducts,
  sectionsElOptionLayout,
  FormatCurrencyIDR,
  productSamples,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => (
          <div
            key={layout.id}
            className={`${layout.className} ${
              activeProducts === layout.id ? "active" : ""
            }`}
            onClick={() => handleActiveProducts(layout.id)}
          >
            {layout.id === 1 && (
              <>
                <div className="template-title">Featured Products</div>
                <div className="template-wrapper">
                  {productSamples.map((data) => {
                    const image = `/products/${data.image}`;

                    return (
                      <div className="container-product" key={data.id}>
                        <img
                          className="template-image"
                          src={image}
                          alt="products"
                        />
                        <div className="template-name">{data.name}</div>
                        <div className="template-price">
                          {FormatCurrencyIDR(data.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="template-button">Shop All</div>
              </>
            )}
            {layout.id === 2 && (
              <>
                <div className="template-wrapper-loan">
                  <div className="template-title">Featured Products</div>
                  <div className="template-desc">
                    Share how and where your products are made and what makes
                    them special.
                  </div>
                  <div className="template-button">Shop All</div>
                </div>
                <div className="template-wrapper">
                  {productSamples
                    .filter((item) => [2, 3].includes(item.id))
                    .map((data) => {
                      const image = `/products/${data.image}`;

                      return (
                        <div className="container-product" key={data.id}>
                          <img
                            className="template-image"
                            src={image}
                            alt="products"
                          />
                          <div className="template-name">{data.name}</div>
                          <div className="template-price">
                            {FormatCurrencyIDR(data.price)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
            {layout.id === 3 && (
              <>
                <div className="template-wrapper">
                  <div className="template-title">
                    <p>Featured</p>
                    <p>Products</p>
                    <p aria-hidden="true">Featured</p>
                    <p aria-hidden="true">Products</p>
                  </div>
                </div>
                {productSamples
                  .filter((item) => item.id === 1)
                  .map((data) => {
                    const image = `/products/${data.image}`;

                    return (
                      <div className="container-product" key={data.id}>
                        <img
                          className="template-image"
                          src={image}
                          alt="products"
                        />
                      </div>
                    );
                  })}
                <div className="template-wrapper-loan">
                  <div className="template-desc">
                    Share how and where your products are made and what makes
                    them special.
                  </div>
                  <div className="template-button">Shop All</div>
                </div>
              </>
            )}
            {layout.id === 4 && (
              <>
                <div className="template-wrapper-loan">
                  <div className="template-title">Featured Products</div>
                  <div className="template-button">Shop All</div>
                </div>
                <div className="template-wrapper">
                  {productSamples.map((data) => {
                    const image = `/products/${data.image}`;

                    return (
                      <div className="container-product" key={data.id}>
                        <img
                          className="template-image"
                          src={image}
                          alt="products"
                        />
                        <div className="template-name">{data.name}</div>
                        <div className="template-price">
                          {FormatCurrencyIDR(data.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default ProductsConfig;
