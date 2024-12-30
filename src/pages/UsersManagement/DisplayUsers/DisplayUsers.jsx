import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useAuth } from "../../../helpers/AuthContext";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import DisplayUsersModal from "./DisplayUsersModal";

function DisplayView({
  isLoading,
  users,
  setUserId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoading && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="display-users-grid">
          {users.map((data) => {
            const avatar = `/avatar/${data.avatar}`;

            return (
              <div className="item" key={data.user_id}>
                <img className="item-avatar" src={avatar} alt="Avatar's User" />
                <div className="item-username">{data.username}</div>
                <div className="item-email">{data.email}</div>
                <div className="item-phone-number">+{data.phone_number}</div>
                <div className="item-action">
                  <div
                    className={`item-action-role ${
                      data.role === "admin" ? "" : "customer"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined item-action-role-icon ${
                        data.role === "admin" ? "" : "customer"
                      }`}
                    >
                      {data.role === "admin" ? "manage_accounts" : "person"}
                    </span>
                    <span
                      className={`item-action-role-text ${
                        data.role === "admin" ? "" : "customer"
                      }`}
                    >
                      {data.role || "Super Whooo"}
                    </span>
                  </div>
                  <span
                    className="material-symbols-rounded item-action-edit"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setUserId(data.user_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded item-action-delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setUserId(data.user_id);
                    }}
                  >
                    delete
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
                      data.role === "admin" ? "" : "customer"
                    }`}
                  >
                    {data.role || "Super Whooo"}
                  </div>
                </div>
                <div className="body-col">
                  <span
                    className="material-symbols-rounded edit"
                    onClick={() => {
                      setIsUpdateModalOpen(true);
                      setUserId(data.user_id);
                    }}
                  >
                    edit_square
                  </span>
                  <span
                    className="material-symbols-rounded delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setUserId(data.user_id);
                    }}
                  >
                    delete
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
  const [isLoading, setIsLoading] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const { token } = useAuth();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  }, [token, urlEndpoint.allusers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
            isLoading={isLoading}
            users={users}
            setUserId={setUserId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoading={isLoading}
            users={users}
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
