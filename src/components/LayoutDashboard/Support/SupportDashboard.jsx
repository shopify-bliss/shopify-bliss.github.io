import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";

export function Header({
  className,
  title,
  activeDisplay,
  handleDisplayChange,
  setIsCreateModalOpen,
}) {
  const { setSearch } = useSearch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={`${className}-header`}>
      <div className="title">{title}</div>
      <div className="header-wrapper">
        <div className="header-wrapper-search">
          <div className="search-loan">
            <input
              type="text"
              placeholder="Search keywords..."
              onChange={handleSearchChange}
            />
          </div>
        </div>
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

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  activeDisplay: PropTypes.string,
  handleDisplayChange: PropTypes.func,
  setIsCreateModalOpen: PropTypes.func,
};
