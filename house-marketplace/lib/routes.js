import Loader from "../components/Loader";
import { useAuthContext } from "../contexts/authContext";
import { useRouter } from "next/router";

const routes = Object.freeze({
  explore: "/",
  offers: "/offers",
  login: "/login",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  profile: "/profile",
});

const withPublic = (Component) => {
  return function WithPublic(props) {
    const { user } = useAuthContext();
    const router = useRouter();

    if (typeof window !== "undefined" && Boolean(user)) {
      router.replace(routes.explore);
      return <Loader />;
    }

    return <Component {...props} />;
  };
};

const withProtected = (Component) => {
  return function WithProtected(props) {
    const { user } = useAuthContext();
    const router = useRouter();
    if (typeof window !== "undefined" && !Boolean(user)) {
      router.replace(routes.login);
      return <Loader />;
    }

    return <Component {...props} />;
  };
};

export { withPublic, withProtected, routes };
