import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import RoleManModal from "./RoleManModal";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";

function DisplayView({
  isLoadingDashboard,
  roles,
  setRoleId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="role-man-grid">
          {roles.map((data) => (
            <div className="item" key={data.role_id}>
              <div className="item-name">{data.role_name}</div>
              <div className="item-action">
                <span
                  className="material-symbols-rounded item-action-edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setRoleId(data.role_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded item-action-delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setRoleId(data.role_id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="role-man-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Name</div>
            <div className="head-col">Action</div>
          </div>
          {roles.map((data, index) => (
            <div className="body" key={data.role_id}>
              <div className="body-col">{index + 1}</div>
              <div className="body-col">{data.role_name}</div>
              <div className="body-col">
                <span
                  className="material-symbols-rounded edit"
                  onClick={() => {
                    setIsUpdateModalOpen(true);
                    setRoleId(data.role_id);
                  }}
                >
                  edit_square
                </span>
                <span
                  className="material-symbols-rounded delete"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setRoleId(data.role_id);
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

function RoleMan() {
  axios.defaults.withCredentials = true;
  const [roles, setRoles] = useState([]);
  const [activeDisplay, setActiveDisplay] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleId, setRoleId] = useState(null);

  const { fetchDashboardData, token, isLoadingDashboard, setDashboardLoader } =
    useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchRoles = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.role, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setDashboardLoader(false);
    }
  }, [token, urlEndpoint]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <>
      <div className="role-man">
        <Header
          className="role-man"
          title="Role Management — Roles"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            roles={roles}
            setRoleId={setRoleId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            roles={roles}
            setRoleId={setRoleId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <RoleManModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchDashboardData}
        />
        <RoleManModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchDashboardData}
          roleId={roleId}
        />
        <RoleManModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchDashboardData}
          roleId={roleId}
        />
      </div>
    </>
  );
}

export default RoleMan;
