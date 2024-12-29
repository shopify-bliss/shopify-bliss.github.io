import React, { useCallback, useEffect, useRef, useState } from "react";
import avatar from "../../data/avatar.json";
import axios from "axios";
import urlEndpoint from "../../helpers/urlEndpoint";
import { useDataToken } from "../../helpers/DataToken";

function Bio() {
  axios.defaults.withCredentials = true;

  const [activeAvatar, setActiveAvatar] = useState("bear.png");
  const [showAvatar, setShowAvatar] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    phoneNumber: "",
  });

  const listAvatar = useRef(null);

  const { token, decoded } = useDataToken();

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

  // useEffect(() => {
  //   axios
  //     .get(urlEndpoint.userId, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    console.log(decoded);
  }, [decoded]);

  return (
    <form className="core">
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={decoded?.email}
          />
          <div className="input-border"></div>
        </div>
        <div className="core-input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={decoded?.username}
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
