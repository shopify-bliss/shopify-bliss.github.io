import { useState, useCallback } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import MenuManModal from "./MenuManModal";
import { Link } from "react-router-dom";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";

function DisplayView({
  isLoadingDashboard,
  menus,
  setMenuId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="menu-man-grid">
          {menus
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.name.toLowerCase().includes(searchLowerCase) ||
                data.url.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data) => (
              <div className="item" key={data.menu_id}>
                <div className="item-name">{data.name}</div>
                <Link to={`/${data.url}`} className="item-url">
                  {data.url}
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
                  <span
                    className="material-symbols-rounded item-action-edit"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setMenuId(data.menu_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setMenuId(data.menu_id);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="menu-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Url</div>
            <div className="head-col">Develope</div>
            <div className="head-col">Action</div>
          </div>
          {menus
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.name.toLowerCase().includes(searchLowerCase) ||
                data.url.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data, index) => (
              <div className="body" key={data.menu_id}>
                <div className="body-col">{index + 1}</div>
                <div className="body-col">{data.name}</div>
                <Link to={`/${data.url}`} className="body-col">
                  {data.url}
                </Link>
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
                      setMenuId(data.menu_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setMenuId(data.menu_id);
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

function MenuMan() {
  axios.defaults.withCredentials = true;
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuId, setMenuId] = useState(null);

  const { menus, fetchDashboardData, isLoadingDashboard } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  return (
    <>
      <div className="menu-man">
        <Header
          className="menu-man"
          title="Menu Management — Menus"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            menus={menus}
            setMenuId={setMenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            menus={menus}
            setMenuId={setMenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <MenuManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
        />
        <MenuManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchDashboardData}
          menuId={menuId}
        />
        <MenuManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          menuId={menuId}
        />
      </div>
    </>
  );
}

DisplayView.propTypes = {
  type: PropTypes.string,
  menus: PropTypes.array,
  setMenuId: PropTypes.func,
  isLoadingDashboard: PropTypes.bool,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
};

export default MenuMan;
