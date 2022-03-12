import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/authContext";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  const { memoizedFetchLandlord } = useAuthContext();
  const router = useRouter();
  const params = router.query;
  const landlordId = params.userRef;
  const listingName = params.listingName;
  const isMounted = useRef(false);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    isMounted.current = true;
    const getLandlord = async () => {
      const landlord = await memoizedFetchLandlord(landlordId);
      setLandlord(landlord);
    };
    getLandlord();

    return () => (isMounted.current = false);
  }, [landlordId, memoizedFetchLandlord]);
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                onChange={onMessageChange}
                value={message}
              ></textarea>

              <a
                href={`mailto:${landlord.email}?Subject=${listingName}&body=${message}`}
              >
                <button type="button" className="primaryButton">
                  Send Message
                </button>
              </a>
            </div>
          </form>
        </main>
      )}
    </div>
  );
};

export default Contact;
