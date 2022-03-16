import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loader from "./Loader";
import { useAuthContext } from "../contexts/authContext";
import { routes } from "../lib/routes";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const { memoizedFetchListings } = useAuthContext();

  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const fetchListings = async () => {
      const listingsData = await memoizedFetchListings();
      setListings(listingsData);
      setLoading(false);
    };

    fetchListings();

    return () => {
      isMounted.current = false;
      setListings(null);
    };
  }, [memoizedFetchListings]);

  if (loading) return <Loader />;

  if (listings?.length === 0) return <></>;

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ id, data }) => (
            <SwiperSlide
              key={id}
              onClick={() =>
                router.push(`${routes.categories[data.type]}/${id}`)
              }
            >
              <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{" "}
                  {data.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
