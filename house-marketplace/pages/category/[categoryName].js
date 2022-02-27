import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/authContext";
import Loader from "../../components/Loader";
import { routes } from "../../lib/routes";
import Error from "next/error";
import ListingItem from "../../components/ListingItem";

const Category = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = router.query;
  const categoryName = params.categoryName;
  const isValidCategory = Object.keys(routes.categories).includes(categoryName);
  const { memoizedFetchListings } = useAuthContext();

  const renderListings = () => {
    return listings && listings.length > 0 ? (
      <>
        <main>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </ul>
        </main>
      </>
    ) : (
      <p>No listings for {categoryName}</p>
    );
  };

  useEffect(() => {
    if (!isValidCategory) return;
    const fetchData = async () => {
      const listingsData = await memoizedFetchListings(categoryName);
      setListings(listingsData);
      setLoading(false);
      console.log("listing data", listingsData);
    };
    fetchData();
  }, [isValidCategory, categoryName, memoizedFetchListings]);

  if (!isValidCategory) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {categoryName === "rent" ? "Places for rent" : "Places for sale"}
        </p>
      </header>
      {loading ? <Loader /> : <div>{renderListings()}</div>}
    </div>
  );
};

export default Category;
