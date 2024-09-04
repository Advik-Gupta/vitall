import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  return (
    <div className="signInFrom">
      <h1 className="mt-5">Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
