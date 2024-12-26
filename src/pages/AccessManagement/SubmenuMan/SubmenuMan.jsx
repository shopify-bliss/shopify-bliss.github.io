import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import SubmenuManModal from "./SubmenuManModal";
import { useDataToken } from "../../../helpers/DataToken";

function DisplayView({
  isLoadingSubmenuMan,
  submenus,
  setSubmenuId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingSubmenuMan && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="submenu-man-grid">
          {submenus.map((data) => (
            <div className="item" key={data.sub_menu_id}>
              <div className="item-name">{data.name}</div>

              <div className="item-action">
                {data.default === true ? (
                  <>
                    <div className="item-action-default">
                      <span className="material-symbols-outlined item-action-default-icon">
                        settings
                      </span>
                      <span className="item-action-default-text">Default</span>
                    </div>
                  </>
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
            <div className="head-col">Action</div>
          </div>
          {submenus.map((data, index) => (
            <div className="body" key={data.sub_menu_id}>
              <dic className="body-col">{index + 1}</dic>
              <div className="body-col">{data.name}</div>
              <div className="body-col">{data.menus.name}</div>
              <div className="body-col">
                {data.default === true ? (
                  <span className="default">Default</span>
                ) : (
                  <span className="nope">Nope</span>
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
  const [submenus, setSubmenus] = useState([]);
  const [isLoadingSubmenuMan, setIsLoadingSubmenuMan] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submenuId, setSubmenuId] = useState(null);

  const { token } = useDataToken();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchSubmenuMan = useCallback(async () => {
    setIsLoadingSubmenuMan(true);

    try {
      const response = await axios.get(urlEndpoint.submenus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmenus(response.data.data);
      setIsLoadingSubmenuMan(false);
    } catch (error) {
      console.error(error);
      setIsLoadingSubmenuMan(false);
    } finally {
      setIsLoadingSubmenuMan(false);
    }
  }, [token, urlEndpoint.submenus]);

  useEffect(() => {
    fetchSubmenuMan();
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
            isLoadingSubmenuMan={isLoadingSubmenuMan}
            submenus={submenus}
            setSubmenuId={setSubmenuId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingSubmenuMan={isLoadingSubmenuMan}
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
          refreshData={fetchSubmenuMan}
        />
        <SubmenuManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchSubmenuMan}
          submenuId={submenuId}
        />
        <SubmenuManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchSubmenuMan}
          submenuId={submenuId}
        />
      </div>
    </>
  );
}

export default SubmenuMan;
