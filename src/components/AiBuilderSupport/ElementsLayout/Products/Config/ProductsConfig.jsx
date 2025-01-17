import { Fragment } from "react";
import PropTypes from "prop-types";

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
                {productSamples
                  .filter((product) => product.id === 1)
                  .map((product) => {
                    return (
                      <Fragment key={product.id}>
                        <div className="template-title">{product.title}</div>
                        <div className="template-wrapper">
                          {product.products.map((data) => {
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
                        <div className="template-button">{product.button}</div>
                      </Fragment>
                    );
                  })}
              </>
            )}

            {layout.id === 2 && (
              <>
                {productSamples
                  .filter((product) => product.id === 2)
                  .map((product) => {
                    return (
                      <Fragment key={product.id}>
                        <div className="template-wrapper-loan">
                          <div className="template-title">{product.title}</div>
                          <div className="template-desc">{product.desc}</div>
                          <div className="template-button">
                            {product.button}
                          </div>
                        </div>
                        <div className="template-wrapper">
                          {product.products
                            .filter((item) => [2, 3].includes(item.id))
                            .map((data) => {
                              const image = `/products/${data.image}`;

                              return (
                                <div
                                  className="container-product"
                                  key={data.id}
                                >
                                  <img
                                    className="template-image"
                                    src={image}
                                    alt="products"
                                  />
                                  <div className="template-name">
                                    {data.name}
                                  </div>
                                  <div className="template-price">
                                    {FormatCurrencyIDR(data.price)}
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
                {productSamples
                  .filter((product) => product.id === 3)
                  .map((product) => {
                    return (
                      <Fragment key={product.id}>
                        <div className="template-wrapper">
                          <div className="template-title">
                            <p>Featured</p>
                            <p>Products</p>
                            <p aria-hidden="true">Featured</p>
                            <p aria-hidden="true">Products</p>
                          </div>
                        </div>
                        {product.products
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
                          <div className="template-desc">{product.desc}</div>
                          <div className="template-button">
                            {product.button}
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
              </>
            )}

            {layout.id === 4 && (
              <>
                {productSamples
                  .filter((product) => product.id === 4)
                  .map((product) => {
                    return (
                      <Fragment key={product.id}>
                        <div className="template-wrapper-loan">
                          <div className="template-title">{product.title}</div>
                          <div className="template-button">
                            {product.button}
                          </div>
                        </div>
                        <div className="template-wrapper">
                          {product.products.map((data) => {
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
                      </Fragment>
                    );
                  })}
              </>
            )}
          </div>
        ))}
    </>
  );
}

ProductsConfig.propTypes = {
  layoutIds: PropTypes.array,
  activeProducts: PropTypes.number,
  handleActiveProducts: PropTypes.func,
  sectionsElOptionLayout: PropTypes.array,
  FormatCurrencyIDR: PropTypes.func,
  productSamples: PropTypes.array,
};

export default ProductsConfig;
