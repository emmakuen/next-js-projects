import { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { useAuthContext } from "../contexts/authContext";

const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const { user } = useAuthContext();
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
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    setFormData({ ...formData, userRef: user.uid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>CreateListing</div>;
};

export default CreateListing;
