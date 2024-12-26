import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import MenuManModal from "./MenuManModal";
import { Link } from "react-router-dom";

function DisplayView({
  isLoadingMenuMan,
  menus,
  setMenuId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingMenuMan && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="menu-man-grid">
          {menus.map((data) => (
            <div className="item" key={data.menu_id}>
              <div className="item-name">{data.name}</div>
              <div className="item-url">
                Link:{" "}
                <Link to={`/${data.url}`} className="item-url-link">
                  {data.url}
                </Link>
              </div>
              <div className="item-action">
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
            <div className="head-col">Action</div>
          </div>
          {menus.map((data, index) => (
            <div className="body" key={data.menu_id}>
              <dic className="body-col">{index + 1}</dic>
              <div className="body-col">{data.name}</div>
              <Link to={`/${data.url}`} className="body-col">
                {data.url}
              </Link>
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
  const [menus, setMenus] = useState([]);
  const [isLoadingMenuMan, setIsLoadingMenuMan] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuId, setMenuId] = useState(null);

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchMenuMan = useCallback(async () => {
    setIsLoadingMenuMan(true);

    try {
      const response = await axios.get(urlEndpoint.menus);

      setMenus(response.data.data);
      setIsLoadingMenuMan(false);
    } catch (error) {
      console.error(error);
      setIsLoadingMenuMan(false);
    } finally {
      setIsLoadingMenuMan(false);
    }
  }, [urlEndpoint]);

  useEffect(() => {
    fetchMenuMan();
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
            isLoadingMenuMan={isLoadingMenuMan}
            menus={menus}
            setMenuId={setMenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingMenuMan={isLoadingMenuMan}
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
          refreshData={fetchMenuMan}
        />
        <MenuManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchMenuMan}
          menuId={menuId}
        />
        <MenuManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchMenuMan}
          menuId={menuId}
        />
      </div>
    </>
  );
}

export default MenuMan;
