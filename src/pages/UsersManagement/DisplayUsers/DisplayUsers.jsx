import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../../../components/LayoutDashboard/Support/SupportDashboard";
import axios from "axios";
import urlEndpoint from "../../../helpers/urlEndpoint";
import { useDataToken } from "../../../helpers/DataToken";
// import DisplayUsersModal from "./DisplayUsersModal";

function DisplayView({
  isLoadingDisplayUsers,
  users,
  setUserId,
  setIsUpdateModalOpen,
  setIsDeleteModalOpen,
  type,
}) {
  return (
    <>
      {isLoadingDisplayUsers && (
        <div className="loader-pages">
          <div className="loader-pages-item"></div>
        </div>
      )}
      {type === "grid" ? (
        <div className="display-users-grid">
          {users.map((data) => (
            <div className="item" key={data.user_id}>
              <div className="item-name">{data.username}</div>
              <div className="item-name">{data.email}</div>
              <div className="item-name">{data.phone_number}</div>
              <div className="item-name">{data.role}</div>
              <div className="item-action">
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
          ))}
        </div>
      ) : (
        <div className="display-users-list">
          <div className="head">
            <div className="head-col">No</div>
            <div className="head-col">Email</div>
            <div className="head-col">Username</div>
            <div className="head-col">Phone Number</div>
            <div className="head-col">Role</div>
            <div className="head-col">Action</div>
          </div>
          {users.map((data, index) => (
            <div className="body" key={data.user_id}>
              <dic className="body-col">{index + 1}</dic>
              <div className="body-col">{data.email}</div>
              <div className="body-col">{data.username}</div>
              <div className="body-col">{data.phone_number}</div>
              <div className="body-col">{data.role}</div>
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
          ))}
        </div>
      )}
    </>
  );
}

function DisplayUsers() {
  axios.defaults.withCredentials = true;
  const [users, setUsers] = useState([]);
  const [isLoadingDisplayUsers, setIsLoadingDisplayUsers] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const { token } = useDataToken();

  const handleDisplayChange = useCallback((display) => {
    setActiveDisplay(display);
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoadingDisplayUsers(true);

    try {
      const response = await axios.get(urlEndpoint.allusers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data);
      setIsLoadingDisplayUsers(false);
    } catch (error) {
      console.error(error);
      setIsLoadingDisplayUsers(false);
    } finally {
      setIsLoadingDisplayUsers(false);
    }
  }, [token]);

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
            isLoadingDisplayUsers={isLoadingDisplayUsers}
            users={users}
            setUserId={setUserId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="grid"
          />
        ) : (
          <DisplayView
            isLoadingDisplayUsers={isLoadingDisplayUsers}
            users={users}
            setUserId={setUserId}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            type="list"
          />
        )}
        {/* <DisplayUsersModal
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
        /> */}
      </div>
    </>
  );
}

export default DisplayUsers;
