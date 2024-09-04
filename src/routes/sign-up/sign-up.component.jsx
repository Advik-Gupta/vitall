import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import "./sign-up.styles.scss";

const SignUp = () => {
  return (
    <div className="signUpFrom">
      <h1 className="mt-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
