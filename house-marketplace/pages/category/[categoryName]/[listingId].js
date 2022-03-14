import { useRouter } from "next/router";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useEffect, useState, useRef } from "react";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useAuthContext } from "../../../contexts/authContext";
import { formatPrice } from "../../../lib/helpers";
import { routes } from "../../../lib/routes";
import Loader from "../../../components/Loader";
import ShareIcon from "../../../public/assets/svg/shareIcon.svg";

const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ListingPage = () => {
  const router = useRouter();
  const { user, memoizedFetchListing } = useAuthContext();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headLink, setHeadLink] = useState(null);
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
    if (window) {
      navigator.clipboard.writeText(window.location.href);
    }
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
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <main>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.imgUrls.map((url, index) => (
            <SwiperSlide key={url}>
              <div
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""
        />
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

            <Map listing={listing} />
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
    </>
  );
};

export default ListingPage;
