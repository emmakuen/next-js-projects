import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import useToggle from "../hooks/useToggle";
import { routes, withProtected } from "../lib/routes";
import ArrowRight from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Home from "../public/assets/svg/homeIcon.svg";
import Link from "next/link";
import Loader from "../components/Loader";
import ListingItem from "../components/ListingItem";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { user, logout, update, memoizedFetchUserListings, deleteListing } =
    useAuthContext();
  const [changeDetails, toggleChangeDetails] = useToggle(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.displayName,
    email: user?.email,
  });

  const { name, email } = formData;

  const onDelete = async (listingId) => {
    if (window && window.confirm("Are you sure you want to delete?")) {
      await deleteListing(listingId);
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
    }
  };

  const onEdit = (listingId) => {
    router.push(routes.editListing + `/${listingId}`);
  };

  const renderListings = () =>
    listings?.length > 0 && (
      <>
        <p className="listingText">Your Listings</p>
        <ul className="categoryListings">
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      </>
    );

  useEffect(() => {
    const fetchListings = async () => {
      const listingsData = await memoizedFetchUserListings();
      console.log(listingsData);
      setListings(listingsData);
      setLoading(false);
    };

    fetchListings();
    return () => {
      setListings(null);
      setFormData({
        name: user?.displayName,
        email: user?.email,
      });
    };
  }, [memoizedFetchUserListings, user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitChange = async () => {
    changeDetails && (await update(name, email));
    toggleChangeDetails();
  };

  if (!user) return <h1>You are not logged in</h1>;
  if (loading) return <Loader />;
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
      {renderListings()}
    </div>
  );
};

export default withProtected(Profile);
