import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { useRouter } from "next/router";
import { routes } from "../../lib/routes";
import { getImageName, filterUnsavedImages } from "../../lib/helpers";

const EditListing = () => {
  const router = useRouter();
  const { listingId } = router.query;
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const { user, fetchImgUrls, memoizedFetchListing, updateListing } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: "",
    discountedPrice: 0,
    images: {},
    geolocation: {
      lat: 0,
      lng: 10,
    },
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    geolocation: { lat, lng },
  } = formData;

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const listingData = await memoizedFetchListing(listingId);
      setListing(listingData);
      setFormData(listingData);
    };

    fetchListing();
    return () => {
      setListing(null);
    };
  }, [listingId, memoizedFetchListing]);

  useEffect(() => {
    if (listing && user && listing.userRef !== user.uid) {
      router.push(routes.explore);
    }
  }, [listing, router, user]);

  useEffect(() => {
    setFormData({ ...formData, userRef: user.uid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const storageImgNames = listing.imgUrls.map((url) => getImageName(url));

    const unsavedImages = filterUnsavedImages(
      storageImgNames,
      user.uid,
      images
    );

    const imgUrls = await fetchImgUrls(unsavedImages);
    await updateListing(listingId, formData, [...listing.imgUrls, ...imgUrls]);
  };

  const onMutate = (e) => {
    let boolean = null;
    // Handle booleans
    if (["true", "false"].includes(e.target.value)) {
      boolean = JSON.parse(e.target.value);
    }

    // Handle files
    if (e.target.files) {
      setFormData({ ...formData, images: e.target.files });
    } else if (e.target.id === "lat" || e.target.id == "lng") {
      const geolocationCopy = formData.geolocation;
      geolocationCopy[e.target.id] = e.target.value;
      setFormData({ ...formData, geolocation: geolocationCopy });
    } else {
      // Handle Text/Booleans/Numbers
      setFormData({
        ...formData,
        [e.target.id]: boolean ?? e.target.value,
      });
    }
  };

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Update Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength={10}
            required
          />
          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min={1}
                max={50}
                required
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min={1}
                max={50}
                required
              />
            </div>
          </div>
          <label className="formLabel">Parking Spot</label>
          <div className="formButtons">
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="parking"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Address</label>
          <textarea
            name="address"
            id="address"
            value={address}
            onChange={onMutate}
            required
            className="formInputAddress"
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  type="number"
                  className="formInputSmall"
                  id="lat"
                  value={lat}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className="formLabel">Longitude</label>
                <input
                  type="number"
                  className="formInputSmall"
                  id="lng"
                  value={lng}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
              className="formInputSmall"
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <div className="formPriceDiv">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  className="formInputSmall"
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required={offer}
                />
                {offer && <p className="formPriceText">$ / Month</p>}
              </div>
            </>
          )}
          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            type="file"
            className="formInputFile"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button className="primaryButton createListingButton" type="submit">
            Update Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditListing;
