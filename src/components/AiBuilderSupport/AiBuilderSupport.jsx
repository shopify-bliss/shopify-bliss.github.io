import { useEffect, useMemo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import logo from "../../assets/logo/black-logo.png";
import PropTypes from "prop-types";
import Modal from "../LayoutDashboard/Modal/Modal";

export function Logo() {
  return (
    <Link to="/" className="ai-builder-logo">
      <span className="text">shopify bliss</span>
      <img src={logo} alt="Shopify Bliss Logo" />
    </Link>
  );
}

export function Quit() {
  const [openQuit, setOpenQuit] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="ai-builder-quit" onClick={() => setOpenQuit(true)}>
        <span className="material-symbols-outlined">close</span>
      </div>

      <Modal
        onClose={() => setOpenQuit(false)}
        onOpen={openQuit}
        type="confirm"
        titleModal={"Are you sure you want to leave this page?"}
        descModal={
          "You will lose the components you have selected and will be redirected to the dashboard account."
        }
      >
        <div className="confirm-dashboard-action">
          <div className="cancel" onClick={() => setOpenQuit(false)}>
            cancel
          </div>
          <div className="confirm" onClick={() => navigate("/my-websites")}>
            leave
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ControllingOverviews({
  activePages,
  currentPageId,
  setCurrentPageId,
}) {
  const middlePages = activePages.filter(
    (id) =>
      id !== "2bff7888-e861-4341-869b-189af29ad3f8" &&
      id !== "40229892-a523-4e1f-a936-a3051e9d30bb"
  );

  const handleNext = () => {
    if (currentPageId !== null) {
      const currentIndex = middlePages.indexOf(currentPageId);
      const nextIndex = (currentIndex + 1) % middlePages.length; // Loop kembali ke awal
      setCurrentPageId(middlePages[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (currentPageId !== null) {
      const currentIndex = middlePages.indexOf(currentPageId);
      const prevIndex =
        (currentIndex - 1 + middlePages.length) % middlePages.length; // Loop ke akhir
      setCurrentPageId(middlePages[prevIndex]);
    }
  };

  return {
    handleNext,
    handlePrev,
  };
}

ControllingOverviews.propTypes = {
  activePages: PropTypes.array,
  currentPageId: PropTypes.string,
  setCurrentPageId: PropTypes.func,
};

export function ChangeLayout({
  isExpandLayout,
  setIsExpandLayout,
  expandLayoutRef,
  onCollapse,
  onExpand,
}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        expandLayoutRef.current &&
        !expandLayoutRef.current.contains(e.target)
      ) {
        setIsExpandLayout(false);
        if (onCollapse) onCollapse();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCollapse, expandLayoutRef, setIsExpandLayout]);

  const handleExpand = useCallback(
    (e) => {
      e.stopPropagation();
      setIsExpandLayout(true);
      if (onExpand) onExpand();
    },
    [setIsExpandLayout, onExpand]
  );

  return (
    <div
      onClick={handleExpand}
      ref={expandLayoutRef}
      className={`change-layout ${isExpandLayout ? "expand" : ""}`}
    >
      <span className="material-symbols-outlined">space_dashboard</span>
      <div className="text">Change Layout</div>
    </div>
  );
}

ChangeLayout.propTypes = {
  isExpandLayout: PropTypes.bool,
  setIsExpandLayout: PropTypes.func,
  expandLayoutRef: PropTypes.object,
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
};

export function DefaultFooter({ dataPages = null, isPreview = false }) {
  const icon = useMemo(
    () =>
      dataPages.find(
        (page) =>
          page?.type_template_id === "40229892-a523-4e1f-a936-a3051e9d30bb"
      )?.icon,
    [dataPages]
  );

  const name = useMemo(
    () =>
      dataPages.find(
        (page) =>
          page?.type_template_id === "40229892-a523-4e1f-a936-a3051e9d30bb"
      )?.type,
    [dataPages]
  );

  return (
    <div
      className={`${isPreview ? "aibuilder-preview" : "display-data"}-footer`}
    >
      <div className="template">
        <span className="material-symbols-outlined">{icon}</span>
        <div className="text">{name}</div>
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

DefaultFooter.propTypes = {
  dataPages: PropTypes.array,
  isPreview: PropTypes.bool,
};
