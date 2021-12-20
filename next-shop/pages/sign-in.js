import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";

const SignIn = () => {
  return (
    <Page title="Sign In">
      <div className="lg:flex lg:justify-center">
        <form>
          <h1 className="text-sm text-gray-500 lg:text-center mb-4">
            Welcome Back
          </h1>
          <Field label="Email">
            <Input type="email" />
          </Field>
          <Field label="password">
            <Input type="password" />
          </Field>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </Page>
  );
};

export default SignIn;
