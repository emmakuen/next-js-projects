import GoogleIcon from "../public/assets/svg/googleIcon.svg";
import { useRouter } from "next/router";
import { routes } from "../lib/routes";
import { useAuthContext } from "../contexts/authContext";

const OAuth = () => {
  const router = useRouter();
  const { googleOAuth } = useAuthContext();
  const onGoogleClick = async () => {
    await googleOAuth();
  };
  return (
    <div className="socialLogin">
      <p>Sign {router.pathname === routes.signUp ? "up" : "in"} with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <GoogleIcon className="socialIconImg" />
      </button>
    </div>
  );
};

export default OAuth;
