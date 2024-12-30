import React, { useCallback, useEffect, useRef, useState } from "react";
import avatar from "../../data/avatar.json";
import axios from "axios";
import { useDashboard } from "../../components/LayoutDashboard/DashboardContext";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useAuth } from "../../helpers/AuthContext";
import { updateProfileSchema } from "../../helpers/ValidationSchema";

function Bio({ onClose }) {
  axios.defaults.withCredentials = true;

  const { user, toastPromise, toastMessage } = useDashboard();
  const { token } = useAuth();

  const [activeAvatar, setActiveAvatar] = useState(user?.avatar);
  const [showAvatar, setShowAvatar] = useState(false);
  const [data, setData] = useState({
    username: "",
    phoneNumber: "",
  });

  const listAvatar = useRef(null);

  const clickOutisde = useCallback(
    (e) => {
      if (listAvatar.current && !listAvatar.current.contains(e.target)) {
        setShowAvatar(false);
      }
    },
    [listAvatar]
  );

  useEffect(() => {
    if (showAvatar) {
      document.addEventListener("mousedown", clickOutisde);
    } else {
      document.removeEventListener("mousedown", clickOutisde);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutisde);
    };
  }, [showAvatar]);

  useEffect(() => {
    if (user) {
      setData({
        username: user.username,
        phoneNumber: user.phone_number,
      });
    }
  }, [user]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setData({
        ...data,
        [name]: value,
      });
    },
    [data]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = {
        avatar: activeAvatar,
        username: data.username,
        phoneNumber: data.phoneNumber,
      };

      updateProfileSchema
        .validate(formData, {
          abortEarly: false,
        })
        .then(() => {
          const updateProfilePromise = axios.put(urlEndpoint.userId, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          toastPromise(
            updateProfilePromise,
            {
              pending: "Updating profile data on progress, please wait..!",
              success: "Data has been successfully updated!",
              error: "Failed to update data!",
            },
            {
              autoClose: 3000,
              position: "top-center",
            },
            () => {
              onClose();
            }
          );

          console.log(response.data);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            toastMessage("error", error.message);
          });
        });
    },
    [activeAvatar, data, urlEndpoint.userId, token]
  );

  return (
    <form className="core" onSubmit={handleSubmit}>
      <div className="core-avatar">
        <div className="core-avatar-selected">
          <img src={`/avatar/${activeAvatar}`} alt="Avatar's User" />
          <span onClick={() => setShowAvatar(true)}>Select Avatar</span>
        </div>
        {showAvatar && (
          <div className="core-avatar-list" ref={listAvatar}>
            {avatar.map((avatar, index) => {
              return (
                <img
                  key={index}
                  src={`/avatar/${avatar.image}`}
                  alt="Avatar List"
                  onClick={() => setActiveAvatar(avatar.image)}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="core-role"></div>
      <div className="core-input">
        <div className="core-input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={data.username}
            onChange={handleChange}
          />
          <div className="input-border"></div>
        </div>
        <div className="core-input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            autoComplete="off"
            value={data.phoneNumber}
            onChange={handleChange}
          />
          <div className="input-border"></div>
        </div>
      </div>
      <button className="core-button" type="submit">
        Save
      </button>
    </form>
  );
}

export default Bio;
