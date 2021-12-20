import { useState } from "react";
import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Page title="Sign In">
      <div className="lg:flex lg:justify-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-sm text-gray-500 lg:text-center mb-4">
            Welcome Back
          </h1>
          <Field label="Email">
            <Input
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="password">
            <Input
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </Page>
  );
};

export default SignIn;
