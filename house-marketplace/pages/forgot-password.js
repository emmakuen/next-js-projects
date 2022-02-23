import { withPublic } from "../lib/routes";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import ArrowRightIcon from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Link from "next/link";
import { routes } from "../lib/routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuthContext();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="emailInput"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" href={routes.login}>
            Sign in
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button type="submit" className="signInButton">
              <ArrowRightIcon fill="#fff" width="34" height="34" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default withPublic(ForgotPassword);
