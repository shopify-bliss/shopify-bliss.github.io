import { Link } from "react-router-dom";

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
