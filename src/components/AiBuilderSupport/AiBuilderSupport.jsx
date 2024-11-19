import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

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
  return (
    <div className="display-data-navbar">
      <div className="template">
        <span className="material-symbols-rounded">
          {
            dataPages.find(
              (page) =>
                page.type_template_id === "2bff7888-e861-4341-869b-189af29ad3f8"
            )?.icon
          }
        </span>
        <div className="title">
          {siteTitle === "" || siteTitle === null
            ? "Title Your Site"
            : siteTitle}
        </div>
      </div>
      <div className="list">
        {activePages
          .filter(
            (id) =>
              id !== "2bff7888-e861-4341-869b-189af29ad3f8" &&
              id !== "40229892-a523-4e1f-a936-a3051e9d30bb"
          )
          .map((id) => {
            const page = dataPages.find((page) => page.type_template_id === id);
            const isActive = currentPageId === id;

            return (
              <div className={`text ${isActive ? "active" : ""}`} key={id}>
                {page?.type.replace(/ page$/i, "")}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function DefaultFooter({ dataPages }) {
  return (
    <div className="display-data-footer">
      <div className="template">
        <span className="material-symbols-rounded">
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
