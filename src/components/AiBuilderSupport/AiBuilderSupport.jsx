import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import {
  ExpalotNavbarStyles,
  ExpalotNavbarFeatures,
  useDisplaySiteTitle,
  useDisplayLogo,
  useDisplayActivePages,
  useHandleActiveNavbar,
  useHandleActiveFeatures,
  useDisplayActiveFeatures,
} from "./NavbarLayoutConfig";
import navbarFeatures from "../../helpers/Data/navbarFeature.json";
import navbarOptionLayout from "../../helpers/Data/navbarOptionLayout.json";
import { toastMessage } from "../../helpers/AlertMessage";

export function Logo() {
  return (
    <Link to="/" className="ai-builder-logo">
      <span className="material-symbols-outlined icon">local_mall</span>
      <span className="text">Shopify Bliss</span>
    </Link>
  );
}

export function Quit() {
  return (
    <div className="ai-builder-quit">
      <span className="material-symbols-outlined">close</span>
    </div>
  );
}

export function DefaultNavbar({
  dataPages,
  siteTitle,
  activePages,
  currentPageId,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [activeNavbar, setActiveNavbar] = useState(1);
  const expandLayoutRef = useRef(null);

  const displaySiteTitle = useDisplaySiteTitle({ siteTitle });
  const displayLogo = useDisplayLogo({ dataPages, displaySiteTitle });
  const displayActivePages = useDisplayActivePages({
    activePages,
    dataPages,
    currentPageId,
  });
  const handleActiveNavbar = useHandleActiveNavbar({ setActiveNavbar });
  const handleActiveFeatures = useHandleActiveFeatures({ setActiveFeatures });
  const displayActiveFeatures = useDisplayActiveFeatures({
    activeFeatures,
    navbarFeatures,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        expandLayoutRef.current &&
        !expandLayoutRef.current.contains(e.target)
      ) {
        setIsExpandLayout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className={`display-data-navbar ${typeNavbarStyles.className}`}>
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

        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsExpandLayout(true);
          }}
          className={`change-layout ${isExpandLayout ? "expand" : ""}`}
        >
          <span className="material-symbols-outlined">space_dashboard</span>
          <div className="text">Change Layout</div>
        </div>
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

export function DefaultFooter({ dataPages }) {
  return (
    <div className="display-data-footer">
      <div className="template">
        <span className="material-symbols-outlined">
          {
            dataPages.find(
              (page) =>
                page.type_template_id === "40229892-a523-4e1f-a936-a3051e9d30bb"
            )?.icon
          }
        </span>
        <div className="text">
          {
            dataPages.find(
              (page) =>
                page.type_template_id === "40229892-a523-4e1f-a936-a3051e9d30bb"
            )?.type
          }
        </div>
      </div>
      <div className="social">
        <SocialIcon network="x" style={{ width: 15, height: 15 }} />
        <SocialIcon network="facebook" style={{ width: 15, height: 15 }} />
        <SocialIcon network="instagram" style={{ width: 15, height: 15 }} />
        <SocialIcon network="tiktok" style={{ width: 15, height: 15 }} />
        <SocialIcon network="telegram" style={{ width: 15, height: 15 }} />
        <SocialIcon network="youtube" style={{ width: 15, height: 15 }} />
        <SocialIcon network="whatsapp" style={{ width: 15, height: 15 }} />
        <SocialIcon network="linkedin" style={{ width: 15, height: 15 }} />
        <SocialIcon network="google" style={{ width: 15, height: 15 }} />
      </div>
    </div>
  );
}
