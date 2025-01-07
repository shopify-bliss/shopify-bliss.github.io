import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import DisplayUsersModal from "./DisplayUsersModal";

function DisplayView({
  isLoadingDashboard,
  users,
  user,
  setUserId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingDashboard && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="display-users-grid">
          {users.map((data) => {
            const avatar = `/avatar/${data.avatar}`;
            const validRole =
              user.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                ? data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                : data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80" ||
                  data.role_id === "0057ae60-509f-40de-a637-b2b6fdc1569e";

            return (
              <div className="item" key={data.user_id}>
                <img className="item-avatar" src={avatar} alt="Avatar's User" />
                <div className="item-username">{data.username}</div>
                <div className="item-email">{data.email}</div>
                <div className="item-phone-number">+{data.phone_number}</div>
                <div className="item-action">
                  <div
                    className={`item-action-role ${
                      data.roles.role_name === "super admin"
                        ? "super-admin"
                        : data.roles.role_name === "admin"
                        ? "admin"
                        : data.roles.role_name === "customer"
                        ? "customer"
                        : ""
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined item-action-role-icon ${
                        data.roles.role_name === "super admin"
                          ? "super-admin"
                          : data.roles.role_name === "admin"
                          ? "admin"
                          : data.roles.role_name === "customer"
                          ? "customer"
                          : ""
                      }`}
                    >
                      {data.roles.role_name === "super admin"
                        ? "admin_panel_settings"
                        : data.roles.role_name === "admin"
                        ? "manage_accounts"
                        : data.roles.role_name === "customer"
                        ? "person"
                        : "deployed_code_account"}
                    </span>
                    <span
                      className={`item-action-role-text ${
                        data.roles.role_name === "super admin"
                          ? "super-admin"
                          : data.roles.role_name === "admin"
                          ? "admin"
                          : data.roles.role_name === "customer"
                          ? "customer"
                          : ""
                      }`}
                    >
                      {data.roles.role_name || "Super Whooo"}
                    </span>
                  </div>
                  <span
                    className="material-symbols-rounded item-action-edit"
                    onClick={
                      validRole
                        ? null
                        : () => {
                            setIsUpdateModalOpen(true);
                            setUserId(data.user_id);
                          }
                    }
                  >
                    {validRole ? "block" : "edit_square"}
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={
                      validRole
                        ? null
                        : () => {
                            setIsDeleteModalOpen(true);
                            setUserId(data.user_id);
                          }
                    }
                  >
                    {validRole ? "block" : "delete"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="display-users-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">General Info</div>
            <div className="head-col">Phone Number</div>
            <div className="head-col">Role</div>
            <div className="head-col">Action</div>
          </div>
          {users.map((data, index) => {
            const avatar = `/avatar/${data.avatar}`;
            const validRole =
              user.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                ? data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                : data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80" ||
                  data.role_id === "0057ae60-509f-40de-a637-b2b6fdc1569e";

            return (
              <div className="body" key={data.user_id}>
                <div className="body-col">{index + 1}</div>
                <div className="body-col">
                  <img className="avatar" src={avatar} alt="Avatar's User" />
                  <div className="info">
                    <div className="info-username">{data.username}</div>
                    <div className="info-email">{data.email}</div>
                  </div>
                </div>
                <div className="body-col">+{data.phone_number}</div>
                <div className="body-col">
                  <div
                    className={`body-col-role ${
                      data.roles.role_name === "super admin"
                        ? "super-admin"
                        : data.roles.role_name === "admin"
                        ? "admin"
                        : data.roles.role_name === "customer"
                        ? "customer"
                        : ""
                    }`}
                  >
                    {data.roles.role_name || "Super Whooo"}
                  </div>
                </div>
                <div className="body-col">
                  <span
                    className="material-symbols-rounded edit"
                    onClick={
                      validRole
                        ? null
                        : () => {
                            setIsUpdateModalOpen(true);
                            setUserId(data.user_id);
                          }
                    }
                  >
                    {validRole ? "block" : "edit_square"}
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={
                      validRole
                        ? null
                        : () => {
                            setIsDeleteModalOpen(true);
                            setUserId(data.user_id);
                          }
                    }
                  >
                    {validRole ? "block" : "delete"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function DisplayUsers() {
  axios.defaults.withCredentials = true;
  const [users, setUsers] = useState([]);
  const [activeDisplay, setActiveDisplay] = useState("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { token, user, isLoadingDashboard, setDashboardLoader } =
    useDashboard();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchUsers = useCallback(async () => {
    setDashboardLoader(true);

    try {
      const response = await axios.get(urlEndpoint.allusers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardLoader(false);
    }
  }, [urlEndpoint.allusers, token]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="display-users">
        <Header
          className="display-users"
          title="Users Management — Display Data"
          activeDisplay={activeDisplay}
          handleDisplayChange={handleDisplayChange}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
        {activeDisplay === "grid" ? (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            users={users}
            user={user}
            setUserId={setUserId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDashboard={isLoadingDashboard}
            users={users}
            user={user}
            setUserId={setUserId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        <DisplayUsersModal
          type="create"
          onOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          refreshData={fetchUsers}
        />
        <DisplayUsersModal
          type="update"
          onOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          refreshData={fetchUsers}
          userId={userId}
        />
        <DisplayUsersModal
          type="delete"
          onOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          refreshData={fetchUsers}
          userId={userId}
        />
      </div>
    </>
  );
}

export default DisplayUsers;
