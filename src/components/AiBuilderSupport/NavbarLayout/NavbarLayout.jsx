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

function NavbarLayout({
  dataPages,
  siteTitle,
  activePages,
  currentPageId,
  activeIntroEl,
  activeNavbar,
  handleActiveNavbar,
  toastMessage,
}) {
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);

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
          activeIntroEl === 1
            ? "intro-el-1"
            : activeIntroEl === 2
            ? "intro-el-2"
            : activeIntroEl === 3
            ? "intro-el-3"
            : activeIntroEl === 4
            ? "intro-el-4"
            : ""
        }`}
      >
        <div className="template-logo">{displayLogo}</div>

        {typeNavbarStyles.id === 3 ? (
          <div className="template-wrapper">
            <div
              className={`template-search ${
                activeFeatures.includes(1) ? "active" : ""
              }`}
            >
              {displayActiveFeatures("just-1")}
            </div>
            <div className="template-links">{displayActivePages}</div>
          </div>
        ) : (
          <div className="template-links">{displayActivePages}</div>
        )}

        {typeNavbarStyles.features && (
          <div className="template-features">
            {displayActiveFeatures(typeNavbarStyles.features)}
          </div>
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
