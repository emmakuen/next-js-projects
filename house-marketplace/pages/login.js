import { useState } from "react";
import { useRouter } from "next/router";
import ArrowRightIcon from "../public/assets/svg/keyboardArrowRightIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../contexts/authContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { login } = useAuthContext();

  const router = useRouter();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
      {/* TODO: Google OAuth */}
      <Link href="/sign-up" passHref>
        <a className="registerLink">Sign Up Instead</a>
      </Link>
    </div>
  );
};

export default Login;
