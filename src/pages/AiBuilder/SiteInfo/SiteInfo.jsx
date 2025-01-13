import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import horizontalLoop from "../../../helpers/horizontalLoop";
import {
  Logo,
  Quit,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";

gsap.registerPlugin(useGSAP);

function SiteInfo({
  siteTitle,
  handleSiteTitleInput,
  maxChars,
  dataBrands,
  activeBrand,
  handleBrandClick,
}) {
  const marqueeRefs = useRef([]);
  const marqueeReverseRefs = useRef([]);

  const initializeMarquee = (refs, className, options) => {
    document.fonts.ready.then(() => {
      refs.current.forEach((ref) => {
        if (ref) horizontalLoop(`.${className}`, options);
      });
    });
  };

  useGSAP(
    () => {
      initializeMarquee(marqueeRefs, "site-info-text", {
        repeat: -1,
        speed: 0.1,
      });
    },
    { scope: marqueeRefs }
  );

  useGSAP(
    () => {
      initializeMarquee(marqueeReverseRefs, "site-info-text-reverse", {
        reversed: true,
        repeat: -1,
        speed: 0.1,
      });
    },
    { scope: marqueeReverseRefs }
  );

  return (
    <>
      <div className={`ai-builder-overview ${activeBrand?.font_class}`}>
        <Logo />
        <div className="site-info">
          {[...Array(4)].map((_, i) => (
            <div
              className="wrapper"
              ref={(el) =>
                i % 2 === 0
                  ? (marqueeRefs.current[i] = el)
                  : (marqueeReverseRefs.current[i] = el)
              }
              key={i}
            >
              {[...Array(8)].map((_, j) => (
                <span
                  className={`${
                    i % 2 === 0 ? "site-info-text" : "site-info-text-reverse"
                  } ${
                    i % 2 === 0
                      ? activeBrand?.font_class
                      : activeBrand?.font_class_reverse
                  }`}
                  key={j}
                >
                  {siteTitle ? siteTitle : "Title Your Site"}
                </span>
              ))}
            </div>
          ))}
          <div className="site-info-overlay"></div>
        </div>
      </div>
      <div className="ai-builder-content">
        <Quit />
        <div className="site-info">
          <div className="site-info-title">
            Choose a site title and brand personality
          </div>
          <div className="content">
            <div className="content-title">Site title</div>
            <div className="content-desc">
              This is the name of your site. You can change it later.
            </div>
            <div className="content-execute">
              <input
                type="text"
                value={siteTitle}
                onChange={handleSiteTitleInput}
                maxLength={maxChars}
              />
              <span>{maxChars - siteTitle.length}</span>
            </div>
          </div>
          <div className="content">
            <div className="content-title">Brand personality</div>
            <div className="content-desc">
              Every brand personality is characterized by a distinct combination
              of colors, fonts, and tone for crafting AI-generated content.
            </div>
            <div className="content-list">
              {dataBrands.map((brand) => (
                <div
                  key={brand.brand_id}
                  className={`content-list-item ${
                    activeBrand?.brand_id === brand.brand_id ? "active" : ""
                  }`}
                  onClick={() => handleBrandClick(brand.brand_id)}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteInfo;
