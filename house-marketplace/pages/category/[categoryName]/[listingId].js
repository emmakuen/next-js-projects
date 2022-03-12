import { useRouter } from "next/router";
import { routes } from "../../../lib/routes";
import Loader from "../../../components/Loader";
import ShareIcon from "../../../public/assets/svg/shareIcon.svg";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../../contexts/authContext";
import { formatPrice } from "../../../lib/helpers";
import Link from "next/link";

const ListingPage = () => {
  const router = useRouter();
  const { user, memoizedFetchListing } = useAuthContext();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const params = router.query;
  const listingId = params.listingId;

  useEffect(() => {
    isMounted.current = true;
    const fetchData = async () => {
      const listingData = await memoizedFetchListing(listingId);
      console.log(listingData);
      setListing(listingData);
      setLoading(false);
    };

    fetchData();

    return () => (isMounted.current = false);
  }, [memoizedFetchListing, listingId]);

  const onShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  const price = listing?.offer
    ? listing?.discountedPrice
    : listing?.regularPrice;

  const listingType = listing?.type === "rent" ? "Rent" : "Sale";
  return loading ? (
    <Loader />
  ) : (
    <main>
      {/* Slider */}
      <div className="shareIconDiv" onClick={onShareClick}>
        <ShareIcon />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
      <div className="listingDetails">
        <p className="listingName">
          {listing?.name} - {formatPrice("$", price)}
        </p>
        <p className="listingLocation">{listing?.location}</p>
        <p className="listingType">For {listingType}</p>
        {listing?.offer && (
          <p className="discountPrice">
            {formatPrice("$", listing.regularPrice - listing.discountedPrice)}
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing?.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : `${listing.bedrooms} Bedroom`}
          </li>
          <li>
            {listing?.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : `${listing.bathrooms} Bathroom`}
          </li>
          <li>{listing?.parking && "Parking Spot"}</li>
          <li>{listing?.furnished && "Furnished"}</li>
          <p className="listingLocationTitle">Location</p>
          {/* Map */}
          {user?.uid !== listing.userRef && (
            <Link
              href={`${routes.contact}/${listing?.userRef}?listingName=${listing?.name}`}
              passHref
            >
              <a className="primaryButton">Contact Landlord</a>
            </Link>
          )}
        </ul>
      </div>
    </main>
  );
};

export default ListingPage;
