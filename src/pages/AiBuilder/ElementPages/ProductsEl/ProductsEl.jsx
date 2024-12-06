import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  ChangeLayout,
  useHandleActiveEl,
} from "../../../../components/AiBuilderSupport/AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import productSamples from "../../../../data/products.json";

function ExpalotProductsElStyles({
  layoutIds,
  activeProductsEl,
  handleActiveProductsEl,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => (
          <div
            key={layout.id}
            className={`${layout.className} ${
              activeProductsEl === layout.id ? "active" : ""
            }`}
            onClick={() => handleActiveProductsEl(layout.id)}
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

function ProductsEl({ toastMessage }) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const [activeProductsEl, setActiveProductsEl] = useState(1);
  const expandLayoutRef = useRef(null);

  const handleActiveProductsEl = useHandleActiveEl({
    setActiveEl: setActiveProductsEl,
  });

  const typeProductsElStyles = useMemo(
    () =>
      sectionsElOptionLayout.find((option) => option.id === activeProductsEl),
    [activeProductsEl]
  );

  useEffect(() => {
    if (!typeProductsElStyles) {
      toastMessage("warn", "ProductsEl layout not found");
    }
  }, [typeProductsElStyles]);

  return (
    <>
      <div className={`products-el ${typeProductsElStyles.className}`}>
        {typeProductsElStyles.id === 1 && (
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
        {typeProductsElStyles.id === 2 && (
          <>
            <div className="template-wrapper-loan">
              <div className="template-title">Featured Products</div>
              <div className="template-desc">
                Share how and where your products are made and what makes them
                special.
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
        {typeProductsElStyles.id === 3 && (
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
                Share how and where your products are made and what makes them
                special.
              </div>
              <div className="template-button">Shop All</div>
            </div>
          </>
        )}
        {typeProductsElStyles.id === 4 && (
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

        <ChangeLayout
          expandLayoutRef={expandLayoutRef}
          isExpandLayout={isExpandLayout}
          setIsExpandLayout={setIsExpandLayout}
          onExpand={() => setIsExpandLayout(true)}
          onCollapse={() => setIsExpandLayout(false)}
        />
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-products-el">
          <div div className="expalot-products-el-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotProductsElStyles
                layoutIds={[1, 3]}
                activeProductsEl={activeProductsEl}
                handleActiveProductsEl={handleActiveProductsEl}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotProductsElStyles
                layoutIds={[2, 4]}
                activeProductsEl={activeProductsEl}
                handleActiveProductsEl={handleActiveProductsEl}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsEl;
