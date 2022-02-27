import React, { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import useToggle from "../hooks/useToggle";
import { routes, withProtected } from "../lib/routes";
import ArrowRight from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Home from "../public/assets/svg/homeIcon.svg";
import Link from "next/link";

const Profile = () => {
  const { user, logout, update } = useAuthContext();
  const [changeDetails, toggleChangeDetails] = useToggle(false);
  const [formData, setFormData] = useState({
    name: user?.displayName,
    email: user?.email,
  });

  const { name, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitChange = async () => {
    changeDetails && (await update(name, email));
    toggleChangeDetails();
  };

  if (!user) return <h1>Not logged in</h1>;
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={submitChange}>
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="profileEmail"
              id="email"
              disabled
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>

      <Link href={routes.createListing} passHref>
        <a className="createListing">
          <Home alt="home" />
          <p>Sell or rent your home</p>
          <ArrowRight alt="arrow right" />
        </a>
      </Link>
    </div>
  );
};

export default withProtected(Profile);
