import { useState } from "react";
import ArrowRightIcon from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Image from "next/image";
import Link from "next/link";

import { useAuthContext } from "../contexts/authContext";
import { withPublic } from "../lib/routes";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const { signup, useGoogleOAuth } = useAuthContext();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome!</p>
      </header>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="nameInput"
          name="name"
          id="name"
          onChange={onChange}
          value={name}
          placeholder="Name"
          required
        />
        <input
          type="email"
          className="emailInput"
          name="email"
          id="email"
          onChange={onChange}
          value={email}
          placeholder="Email"
          required
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
            id="password"
            required
            minLength={6}
          />
          <div className="showPassword">
            <Image
              src="/assets/svg/visibilityIcon.svg"
              width="20"
              height="20"
              alt="show password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button type="submit" className="signInButton">
            <ArrowRightIcon fill="#fff" width="34" height="34" />
          </button>
        </div>
      </form>
      <OAuth />
      <Link href="/login" passHref>
        <a className="registerLink">Sign In Instead</a>
      </Link>
    </div>
  );
};

export default withPublic(SignUp);
