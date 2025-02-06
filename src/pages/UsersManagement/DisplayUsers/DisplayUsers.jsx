import { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDashboard } from "../../../components/LayoutDashboard/DashboardContext";
import DisplayUsersModal from "./DisplayUsersModal";
import { LoaderPages } from "../../../components/LoaderProgress/LoaderProgress";
import { useSearch } from "../../../helpers/SearchContext";
import PropTypes from "prop-types";

function DisplayView({
  isLoadingDashboard,
  users,
  user,
  setUserId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  const { search } = useSearch();

  return (
    <>
      {isLoadingDashboard && <LoaderPages />}
      {type === "grid" ? (
        <div className="display-users-grid">
          {users
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.username.toLowerCase().includes(searchLowerCase) ||
                data.email.toLowerCase().includes(searchLowerCase) ||
                data.phone_number.includes(searchLowerCase) ||
                data.roles.role_name.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data) => {
              const avatar = `/avatar/${data.avatar}`;
              const validRole =
                user.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                  ? data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                  : data.role_id === "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80" ||
                    data.role_id === "0057ae60-509f-40de-a637-b2b6fdc1569e";

              return (
                <div className="item" key={data.user_id}>
                  <img
                    className="item-avatar"
                    src={avatar}
                    alt="Avatar's User"
                  />
                  <div className="item-username">{data.username}</div>
                  <div className="item-email">{data.email}</div>
                  <div className="item-phone-number">+{data.phone_number}</div>
                  <div className="item-action">
                    <div
                      className={`item-action-role ${
                        data.roles.role_id ===
                        "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                          ? "super-admin"
                          : data.roles.role_id ===
                            "0057ae60-509f-40de-a637-b2b6fdc1569e"
                          ? "admin"
                          : data.roles.role_id ===
                            "cebccb98-7ef0-4184-95b9-7320329f21d3"
                          ? "customer"
                          : data.roles.role_id ===
                            "5279bb16-d436-45a6-a42a-8f7b09809b2a"
                          ? "developer"
                          : ""
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined item-action-role-icon ${
                          data.roles.role_id ===
                          "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                            ? "super-admin"
                            : data.roles.role_id ===
                              "0057ae60-509f-40de-a637-b2b6fdc1569e"
                            ? "admin"
                            : data.roles.role_id ===
                              "cebccb98-7ef0-4184-95b9-7320329f21d3"
                            ? "customer"
                            : data.roles.role_id ===
                              "5279bb16-d436-45a6-a42a-8f7b09809b2a"
                            ? "developer"
                            : ""
                        }`}
                      >
                        {data.roles.icon || "no_icon"}
                      </span>
                      <span
                        className={`item-action-role-text ${
                          data.roles.role_id ===
                          "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                            ? "super-admin"
                            : data.roles.role_id ===
                              "0057ae60-509f-40de-a637-b2b6fdc1569e"
                            ? "admin"
                            : data.roles.role_id ===
                              "cebccb98-7ef0-4184-95b9-7320329f21d3"
                            ? "customer"
                            : data.roles.role_id ===
                              "5279bb16-d436-45a6-a42a-8f7b09809b2a"
                            ? "developer"
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
          {users
            .filter((data) => {
              const searchLowerCase = search.toLowerCase();

              return (
                data.avatar.toLowerCase().includes(searchLowerCase) ||
                data.username.toLowerCase().includes(searchLowerCase) ||
                data.email.toLowerCase().includes(searchLowerCase) ||
                data.phone_number.includes(searchLowerCase) ||
                data.roles.role_name.toLowerCase().includes(searchLowerCase)
              );
            })
            .map((data, index) => {
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
                        data.roles.role_id ===
                        "3de65f44-6341-4b4d-8d9f-c8ca3ea80b80"
                          ? "super-admin"
                          : data.roles.role_id ===
                            "0057ae60-509f-40de-a637-b2b6fdc1569e"
                          ? "admin"
                          : data.roles.role_id ===
                            "cebccb98-7ef0-4184-95b9-7320329f21d3"
                          ? "customer"
                          : data.roles.role_id ===
                            "5279bb16-d436-45a6-a42a-8f7b09809b2a"
                          ? "developer"
                          : ""
                      }`}
                    >
                      <span className="material-symbols-rounded">
                        {data.roles.icon || "no-icon"}
                      </span>
                      <span>{data.roles.role_name || "Super Whooo"}</span>
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
  }, [token, setDashboardLoader]);

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

DisplayView.propTypes = {
  isLoadingDashboard: PropTypes.bool,
  users: PropTypes.array,
  user: PropTypes.object,
  setUserId: PropTypes.func,
  setIsUpdateModalOpen: PropTypes.func,
  setIsDeleteModalOpen: PropTypes.func,
  type: PropTypes.string,
};

export default DisplayUsers;
