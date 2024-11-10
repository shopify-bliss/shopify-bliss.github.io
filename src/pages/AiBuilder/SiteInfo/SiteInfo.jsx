import React, { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import horizontalLoop from "../../../helpers/horizontalLoop";
import brandPersonalities from "./fonts.json";
import {
  Logo,
  Quit,
} from "../../../components/AiBuilderSupport/AiBuilderSupport";

const defaultActivePersonality = brandPersonalities[0];

function SiteInfo() {
  const marqueeRefs = useRef([]);
  const marqueeReverseRefs = useRef([]);
  const [activePersonality, setActivePersonality] = useState(
    defaultActivePersonality
  );
  const [siteTitle, setSiteTitle] = useState("");
  const maxChars = 100;

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

  const handleInputChange = useCallback((e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setSiteTitle(inputText);
    }
  }, []);

  const handlePersonalityClick = useCallback((personality) => {
    setActivePersonality(personality);
  }, []);

  return (
    <>
      <div className={`ai-builder-overview ${activePersonality.fontClass}`}>
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
                  className={`
                    ${
                      i % 2 === 0 ? "site-info-text" : "site-info-text-reverse"
                    } ${
                    i % 2 === 0
                      ? activePersonality.fontClass
                      : activePersonality.fontClassReverse
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
                onChange={handleInputChange}
                maxLength={maxChars}
              />
              <span>{maxChars - siteTitle.length}</span>
            </div>
          </div>
          <div className="content">
            <div className="content-title">Brand personality</div>
            <div className="content-desc">
              Every brand personality is characterized by a distinct combination
              of colors, fonts, and tone for crafting AI-generated content. A
              well-defined brand personality can strengthen connections with
              customers.
            </div>
            <div className="content-list">
              {brandPersonalities.map((personality, index) => (
                <div
                  key={index}
                  className={`content-list-item ${
                    activePersonality.name === personality.name ? "active" : ""
                  }`}
                  onClick={() => handlePersonalityClick(personality)}
                >
                  {personality.name}
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
