import { useState, useCallback } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import SubmenuManModal from "./SubmenuManModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { Link } from "react-router-dom";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";

function DisplayView({
  isLoadingDashboard,
  submenus,
  setSubmenuId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="submenu-man-grid">
          {submenus
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.name.toLowerCase().includes(searchLowerCase) ||
                data.menus.url.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data) => (
              <div className="item" key={data.sub_menu_id}>
                <div className="item-name">{data.name}</div>
                <Link className="item-menu" to={`/${data.menus.url}`}>
                  {data.menus.url}
                </Link>
                <div className="item-action">
                  {data.is_develope === true ? (
                    <span className="item-action-progress">
                      <span className="material-symbols-outlined item-action-icon">
                        sync
                      </span>
                      <div className="text">Progress</div>
                    </span>
                  ) : null}
                  {data.default === true ? (
                    <div className="item-action-default">
                      <span className="material-symbols-outlined item-action-icon">
                        settings
                      </span>
                      <span className="text">Default</span>
                    </div>
                  ) : null}
                  <span
                    className="material-symbols-rounded item-action-edit"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setSubmenuId(data.sub_menu_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSubmenuId(data.sub_menu_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="submenu-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Menu</div>
            <div className="head-col">Default</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {submenus
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.name.toLowerCase().includes(searchLowerCase) ||
                data.menus.url.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data, index) => (
              <div className="body" key={data.sub_menu_id}>
                <div className="body-col">{index + 1}</div>
                <div className="body-col">{data.name}</div>
                <div className="body-col">{data.menus.name}</div>
                <div className="body-col">
                  {data.default === true ? (
                    <span className="default">Default</span>
                  ) : (
                    <span className="nope">-</span>
                  )}
                </div>
                <div className="body-col">
                  {data.is_develope === true ? (
                    <span className="progress">Progress</span>
                  ) : (
                    <span className="done">Done</span>
                  )}
                </div>
                <div className="body-col">
                  <span
                    className="material-symbols-rounded edit"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setSubmenuId(data.sub_menu_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSubmenuId(data.sub_menu_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

function SubmenuMan() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submenuId, setSubmenuId] = useState(null);

  const { submenus, fetchDashboardData, isLoadingDashboard } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  return (
    <>
      <div className="submenu-man">
        <Header
          className="submenu-man"
          title="Menu Management — Submenus"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            submenus={submenus}
            setSubmenuId={setSubmenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            submenus={submenus}
            setSubmenuId={setSubmenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <SubmenuManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
        />
        <SubmenuManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchDashboardData}
          submenuId={submenuId}
        />
        <SubmenuManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          submenuId={submenuId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  isLoadingDashboard: PropTypes.bool,
  submenus: PropTypes.array,
  setSubmenuId: PropTypes.func,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
  type: PropTypes.string,
};

export default SubmenuMan;
