import { withProtected } from "../lib/routes";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import Loader from "../components/Loader";
import ListingItem from "../components/ListingItem";
import { useRouter } from "next/router";

const Offers = () => {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { memoizedFetchOffers } = useAuthContext();

  const renderOffers = () => {
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
      <p>There are no current offers</p>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await memoizedFetchOffers();
      setListings(offersData);
      setLoading(false);
    };
    fetchData();
  }, [memoizedFetchOffers]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? <Loader /> : <div>{renderOffers()}</div>}
    </div>
  );
};

export default withProtected(Offers);
