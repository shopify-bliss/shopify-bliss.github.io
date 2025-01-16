import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import { FormatCurrencyIDR } from "../../../../helpers/FormatCurrencyIDR";
import productSamples from "../../../../data/products.json";
import ProductsConfig from "./Config/ProductsConfig";
import { BgColors, SpecialColors, FontColors } from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";

function Products({
  handleActiveProducts,
  activeNavbar,
  activeProducts,
  toastMessage,
  activeColors,
  activeFonts,
  firstProduct,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const font = FontColors({ activeColors });
  const bg = BgColors({ activeColors });
  const special = SpecialColors({ activeColors });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

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
      <div
        className={`products ${typeProductsStyles.className} ${bg} ${
          firstProduct ? "first-product" : ""
        } ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        }`}
      >
        {typeProductsStyles.id === 1 && (
          <>
            {productSamples
              .filter((product) => product.id === 1)
              .map((product) => {
                const borderedFont = font.replace(/^color-font-/i, "");

                return (
                  <Fragment key={product.id}>
                    <div className={`template-title ${type2} ${font}`}>
                      {product.title}
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
                            <div
                              className={`template-name ${type2} ${font}`}
                              style={{
                                "--border-font-color": `#${borderedFont}`,
                              }}
                            >
                              {data.name}
                            </div>
                            <div className={`template-price ${type1}`}>
                              {FormatCurrencyIDR(data.price)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={`template-button ${type1} ${special}`}>
                      {product.button}
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}
        {typeProductsStyles.id === 2 && (
          <>
            {productSamples
              .filter((product) => product.id === 2)
              .map((product) => {
                const borderedFont = font.replace(/^color-font-/i, "");

                return (
                  <Fragment key={product.id}>
                    <div className="template-wrapper-loan">
                      <div className={`template-title ${type2} ${font}`}>
                        {product.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {product.desc}
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {product.button}
                      </div>
                    </div>
                    <div className="template-wrapper">
                      {product.products
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
                              <div
                                className={`template-name ${type2} ${font}`}
                                style={{
                                  "--border-font-color": `#${borderedFont}`,
                                }}
                              >
                                {data.name}
                              </div>
                              <div className={`template-price ${type1}`}>
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
        {typeProductsStyles.id === 3 && (
          <>
            {productSamples
              .filter((product) => product.id === 3)
              .map((product) => {
                return (
                  <Fragment key={product.id}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2} ${font}`}>
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
                      <div className={`template-desc ${type1}`}>
                        {product.desc}
                      </div>
                      <div className={`template-button ${type1} ${special}`}>
                        {product.button}
                      </div>
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}
        {typeProductsStyles.id === 4 && (
          <>
            {productSamples
              .filter((product) => product.id === 4)
              .map((product) => {
                const borderedSpecial = special.replace(/^color-special-/i, "");
                const borderedFont = font.replace(/^color-font-/i, "");

                return (
                  <Fragment key={product.id}>
                    <div className="template-wrapper-loan">
                      <div className={`template-title ${type2} ${font}`}>
                        {product.title}
                      </div>
                      <div
                        className={`template-button ${type1} ${font}`}
                        style={{
                          "--border-special-color": `#${borderedSpecial}`,
                        }}
                      >
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
                            <div
                              className={`template-name ${type2} ${font}`}
                              style={{
                                "--border-font-color": `#${borderedFont}`,
                              }}
                            >
                              {data.name}
                            </div>
                            <div className={`template-price ${type1}`}>
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
