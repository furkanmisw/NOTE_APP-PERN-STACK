import React, { useEffect, useState } from "react";
import api from "../api";

const Header = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    _getProfile(setProfile);
  }, []);

  return (
    <div className="header">
      <p>{profile?.username}</p>
      <button onClick={_logout}>
        <img src="/icons/logout.svg" alt="logout-icon" />
      </button>
    </div>
  );
};

export default Header;

const _getProfile = (setProfile) =>
  api("/profile").then((res) => res.status === 200 && setProfile(res.data));

const _logout = () => api("/auth/logout", "POST");
