import { useRouter } from "next/router";
import { useState } from "react";
import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";
import { fetchJson } from "../lib/api";
import { useMutation } from "react-query";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutation(() =>
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await mutation.mutateAsync();
      router.push("/");
    } catch (err) {
      // mutation.isError will be true
    }
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
          <Field label="Password">
            <Input
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {mutation.isError && (
            <p className="text-red-500">Invalid Credentials</p>
          )}
          {mutation.isLoading ? (
            <p className="">Loading...</p>
          ) : (
            <Button type="submit">Sign In</Button>
          )}
        </form>
      </div>
    </Page>
  );
};

export default SignIn;
