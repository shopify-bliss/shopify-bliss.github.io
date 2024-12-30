import React from "react";

export function Header({
  className,
  title,
  activeDisplay,
  handleDisplayChange,
  setIsCreateModalOpen,
}) {
  return (
    <div className={`${className}-header`}>
      <div className="title">{title}</div>
      <div className="header-wrapper">
        <div className="new-data" onClick={() => setIsCreateModalOpen(true)}>
          Add new data
        </div>
        <div className="header-wrapper-loan">
          <span
            className={`material-symbols-outlined ${
              activeDisplay === "list" ? "active" : ""
            }`}
            onClick={() => handleDisplayChange("list")}
          >
            lists
          </span>
          <span
            className={`material-symbols-outlined ${
              activeDisplay === "grid" ? "active" : ""
            }`}
            onClick={() => handleDisplayChange("grid")}
          >
            grid_view
          </span>
        </div>
      </div>
    </div>
  );
}
