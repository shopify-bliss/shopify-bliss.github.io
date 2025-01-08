import React, { useRef, useState, useEffect, useMemo } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import productSamples from "../../../../data/products.json";
import ProductsConfig from "./Config/ProductsConfig";
import { BgColors } from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";

function Products({
  handleActiveProducts,
  activeProducts,
  toastMessage,
  activeColor,
  activeFont,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const bg = BgColors({ activeColor });
  const type1 = FontType1({ activeFont });
  const type2 = FontType2({ activeFont });

  const typeProductsStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeProducts),
    [activeProducts]
  );

  useEffect(() => {
    if (!typeProductsStyles) {
      toastMessage("warn", "Products layout not found");
    }
  }, [typeProductsStyles, toastMessage]);

  return (
    <>
      <div className={`products ${typeProductsStyles.className} ${bg}`}>
        {typeProductsStyles.id === 1 && (
          <>
            <div className={`template-title ${type2}`}>Featured Products</div>
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
                    <div className={`template-name ${type2}`}>{data.name}</div>
                    <div className={`template-price ${type1}`}>
                      {FormatCurrencyIDR(data.price)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`template-button ${type1}`}>Shop All</div>
          </>
        )}

        {typeProductsStyles.id === 2 && (
          <>
            <div className="template-wrapper-loan">
              <div className={`template-title ${type2}`}>Featured Products</div>
              <div className={`template-desc ${type1}`}>
                Share how and where your products are made and what makes them
                special.
              </div>
              <div className={`template-button ${type1}`}>Shop All</div>
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
                      <div className={`template-name ${type2}`}>
                        {data.name}
                      </div>
                      <div className={`template-price ${type1}`}>
                        {FormatCurrencyIDR(data.price)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {typeProductsStyles.id === 3 && (
          <>
            <div className="template-wrapper">
              <div className={`template-title ${type2}`}>
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
              <div className={`template-desc ${type1}`}>
                Share how and where your products are made and what makes them
                special.
              </div>
              <div className={`template-button ${type1}`}>Shop All</div>
            </div>
          </>
        )}

        {typeProductsStyles.id === 4 && (
          <>
            <div className="template-wrapper-loan">
              <div className={`template-title ${type2}`}>Featured Products</div>
              <div className={`template-button ${type1}`}>Shop All</div>
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
                    <div className={`template-name ${type2}`}>{data.name}</div>
                    <div className={`template-price ${type1}`}>
                      {FormatCurrencyIDR(data.price)}
                    </div>
                  </div>
                );
              })}
            </div>
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
        <div ref={expandLayoutRef} className="expalot-products">
          <div div className="expalot-products-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ProductsConfig
                layoutIds={[1, 3]}
                activeProducts={activeProducts}
                handleActiveProducts={handleActiveProducts}
                sectionsElOptionLayout={sectionsElOptionLayout}
                FormatCurrencyIDR={FormatCurrencyIDR}
                productSamples={productSamples}
              />
            </div>
            <div className="wrapper-right">
              <ProductsConfig
                layoutIds={[2, 4]}
                activeProducts={activeProducts}
                handleActiveProducts={handleActiveProducts}
                sectionsElOptionLayout={sectionsElOptionLayout}
                FormatCurrencyIDR={FormatCurrencyIDR}
                productSamples={productSamples}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
