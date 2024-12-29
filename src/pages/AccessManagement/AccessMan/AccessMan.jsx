import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import roles from "../../../data/roles.json";
import AccessManModal from "./AccessManModal";

function DisplayView({
  isLoadingAccessMan,
  accessMenus,
  setAccessId,
  setIsDeleteModalOpen,
  type,
  menus,
  activeRole,
  handleActiveRole,
}) {
  return (
    <>
      {isLoadingAccessMan && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      <div className="access-man-wrapper">
        <div className="access-man-roles">
          {roles.map((role) => (
            <div
              className={`role ${activeRole === role.role ? "active" : ""}`}
              key={role.role_id}
              onClick={() => handleActiveRole(role.role)}
            >
              {role.role}
            </div>
          ))}
        </div>
        {type === "grid" ? (
          <div className="access-man-grid">
            {menus.map((menu) => {
              const matchedAccess = accessMenus.find(
                (access) =>
                  access.menu_id === menu.menu_id && access.role === activeRole
              );

              const hasAccess = !!matchedAccess;

              return (
                <div className="item" key={menu.menu_id}>
                  <div className="item-name">{menu.name}</div>
                  <span className="material-symbols-outlined item-check">
                    {hasAccess ? "task_alt" : "circle"}
                  </span>
                  <div className="item-action">
                    {hasAccess && (
                      <span
                        className="material-symbols-rounded item-action-delete"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setAccessId(matchedAccess.access_id);
                        }}
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="access-man-list">
            <div className="head">
              <div className="head-col">No</div>
              <div className="head-col">Menu</div>
              <div className="head-col">Access</div>
              <div className="head-col">Action</div>
            </div>
            {menus.map((menu, index) => {
              const matchedAccess = accessMenus.find(
                (access) =>
                  access.menu_id === menu.menu_id && access.role === activeRole
              );

              const hasAccess = !!matchedAccess;

              return (
                <div className="body" key={menu.menu_id}>
                  <div className="body-col">{index + 1}</div>
                  <div className="body-col">{menu.name}</div>
                  <div className="body-col material-symbols-outlined">
                    {hasAccess ? "task_alt" : "circle"}
                  </div>
                  <div className="body-col">
                    {hasAccess && (
                      <span
                        className="material-symbols-rounded delete"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setAccessId(matchedAccess.access_id);
                        }}
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function AccessMan() {
  axios.defaults.withCredentials = true;

  const [activeDisplay, setActiveDisplay] = useState("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accessId, setAccessId] = useState(null);
  const [activeRole, setActiveRole] = useState("admin");

  const { accessMenus, fetchDashboardData, isLoading, menus } = useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const handleActiveRole = useCallback((role) => {
    setActiveRole(role);
  }, []);

  return (
    <>
      <div className="access-man">
        <Header
          className="access-man"
          title="Menu Management — Access Menu"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingAccessMan={isLoading}
            accessMenus={accessMenus}
            setAccessId={setAccessId}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
            menus={menus}
            activeRole={activeRole}
            handleActiveRole={handleActiveRole}
          />
        ) : (
          <DisplayView
            isLoadingAccessMan={isLoading}
            accessMenus={accessMenus}
            setAccessId={setAccessId}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
            menus={menus}
            activeRole={activeRole}
            handleActiveRole={handleActiveRole}
          />
        )}
        <AccessManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
        />
        <AccessManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          accessId={accessId}
        />
      </div>
    </>
  );
}

export default AccessMan;
