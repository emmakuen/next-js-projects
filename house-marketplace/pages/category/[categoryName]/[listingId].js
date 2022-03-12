import { useRouter } from "next/router";
import { routes } from "../../../lib/routes";
import { Loader } from "../../../components/Loader";
import ShareIcon from "../../../public/assets/svg/shareIcon.svg";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../../contexts/authContext";

const ListingPage = () => {
  const router = useRouter();
  const { memoizedFetchListing } = useAuthContext();
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

  return <div>ListingPage</div>;
};

export default ListingPage;
