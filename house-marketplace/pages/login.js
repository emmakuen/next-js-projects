import ArrowRightIcon from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../contexts/authContext";
import useToggle from "../hooks/useToggle";
import { useState } from "react";

import { withPublic } from "../lib/routes";
import OAuth from "../components/OAuth";

const Login = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { login } = useAuthContext();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>

      <form onSubmit={onSubmit}>
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
              onClick={toggleShowPassword}
            />
          </div>
        </div>
        <Link href="/forgot-password" passHref>
          <a className="forgotPasswordLink">Forgot Password</a>
        </Link>
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton" type="submit">
            <ArrowRightIcon fill="#fff" width="34" height="34" />
          </button>
        </div>
      </form>
      <OAuth />
      <Link href="/sign-up" passHref>
        <a className="registerLink">Sign Up Instead</a>
      </Link>
    </div>
  );
};

export default withPublic(Login);
