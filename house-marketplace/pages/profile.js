import React from "react";
import { useAuthContext } from "../contexts/authContext";

const Profile = () => {
  const { user, logout } = useAuthContext();
  console.log(user);
  if (!user) return <h1>Not logged in</h1>;
  return (
    <div>
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={logout}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default Profile;
