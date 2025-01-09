import { useState, useEffect, useRef, useMemo } from "react";
import {
  ExpalotNavbarStyles,
  ExpalotNavbarFeatures,
  useDisplaySiteTitle,
  useDisplayLogo,
  useDisplayActivePages,
  useHandleActiveFeatures,
  useDisplayActiveFeatures,
} from "./Config/NavbarLayoutConfig";
import navbarFeatures from "../../../data/navbarFeature.json";
import navbarOptionLayout from "../../../data/navbarOptionLayout.json";
import { ChangeLayout } from "../AiBuilderSupport";
import { OtherColors, OtherColorsWhite } from "../ColorsSupport";
import { FontType1, FontType2 } from "../FontsSupport";

function NavbarLayout({
  dataPages,
  siteTitle,
  activePages,
  currentPageId,
  activeSections,
  activeIntro,
  activeNavbar,
  handleActiveNavbar = null,
  toastMessage,
  typeMain = null,
  activeColors,
  activeFonts,
}) {
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

  const others = OtherColors({ activeColors });
  const colorStyle =
    typeMain === "page"
      ? null
      : OtherColorsWhite({
          others,
          activeSections: activeSections[currentPageId],
        });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

  const displaySiteTitle = useDisplaySiteTitle({ siteTitle });
  const displayLogo = useDisplayLogo({ dataPages, displaySiteTitle });
  const displayActivePages = useDisplayActivePages({
    activePages,
    dataPages,
    currentPageId,
  });

  const handleActiveFeatures = useHandleActiveFeatures({ setActiveFeatures });
  const displayActiveFeatures = useDisplayActiveFeatures({
    activeFeatures,
    navbarFeatures,
  });

  const typeNavbarStyles = useMemo(
    () => navbarOptionLayout.find((option) => option.id === activeNavbar),
    [activeNavbar]
  );

  useEffect(() => {
    if (!typeNavbarStyles) {
      toastMessage("warn", "Navbar layout not found");
    }
  }, [typeNavbarStyles]);

  return (
    <>
      <div
        className={`display-data-navbar ${typeNavbarStyles.className} ${
          activeIntro === 1
            ? "intro-1"
            : activeIntro === 2
            ? "intro-2"
            : activeIntro === 3
            ? "intro-3"
            : activeIntro === 4
            ? "intro-4"
            : ""
        } ${others}`}
        style={{ ...colorStyle }}
      >
        <div className={`template-logo ${type2}`}>{displayLogo}</div>

        {typeNavbarStyles.id === 3 ? (
          <div className="template-wrapper">
            <div
              className={`template-search ${
                activeFeatures.includes(1) ? "active" : ""
              } ${type1}`}
            >
              {displayActiveFeatures("just-1")}
            </div>
            <div className={`template-links ${type1}`}>
              {displayActivePages}
            </div>
          </div>
        ) : (
          <div className={`template-links ${type1}`}>{displayActivePages}</div>
        )}

        {typeNavbarStyles.features && (
          <div className={`template-features ${type1}`}>
            {displayActiveFeatures(typeNavbarStyles.features)}
          </div>
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
        <div ref={expandLayoutRef} className="expalot-navbar">
          <div className="expalot-navbar-features">
            <div className="title">Choose navbar features</div>
            <div className="wrapper">
              <ExpalotNavbarFeatures
                navbarFeatures={navbarFeatures}
                activeFeatures={activeFeatures}
                handleActiveFeatures={handleActiveFeatures}
              />
            </div>
          </div>
          <div div className="expalot-navbar-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <ExpalotNavbarStyles
                layoutIds={[1, 3]}
                navbarOptionLayout={navbarOptionLayout}
                activeNavbar={activeNavbar}
                handleActiveNavbar={handleActiveNavbar}
                displayLogo={displayLogo}
                displayActivePages={displayActivePages}
                displayActiveFeatures={displayActiveFeatures}
                activeFeatures={activeFeatures}
              />
            </div>
            <div className="wrapper-right">
              <ExpalotNavbarStyles
                layoutIds={[2, 4]}
                navbarOptionLayout={navbarOptionLayout}
                activeNavbar={activeNavbar}
                handleActiveNavbar={handleActiveNavbar}
                displayLogo={displayLogo}
                displayActivePages={displayActivePages}
                displayActiveFeatures={displayActiveFeatures}
                activeFeatures={activeFeatures}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarLayout;
