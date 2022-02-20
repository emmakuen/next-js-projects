import React from "react";
import { useAuthContext } from "../contexts/authContext";

const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);
  if (!user) return <h1>Not logged in</h1>;
  return <div>{user.displayName}</div>;
};

export default Profile;
