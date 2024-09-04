import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

import "./sign-up-form.styles.scss";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  instagram: "",
  year: "",
  branch: "",
  hostel: "",
  vitRegisterNumber: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();
  const {
    displayName,
    email,
    password,
    confirmPassword,
    instagram,
    year,
    branch,
    hostel,
    vitRegisterNumber,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
        instagram,
        year,
        branch,
        hostel,
        vitRegisterNumber,
      });
      resetFormFields();
      navigate("/sign-in");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Instagram"
          type="text"
          required
          onChange={handleChange}
          name="instagram"
          value={instagram}
        />

        <FormInput
          label="Year (1st, 2nd, 3rd, 4th)"
          type="text"
          required
          onChange={handleChange}
          name="year"
          value={year}
        />

        <FormInput
          label="Branch"
          type="text"
          required
          onChange={handleChange}
          name="branch"
          value={branch}
        />

        <FormInput
          label="Hostel"
          type="text"
          required
          onChange={handleChange}
          name="hostel"
          value={hostel}
        />

        <FormInput
          label="Registration Number"
          type="text"
          required
          onChange={handleChange}
          name="vitRegisterNumber"
          value={vitRegisterNumber}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
