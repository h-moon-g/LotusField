import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationObject, setValidationObject] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorsObj = {};

    if (!email) {
      errorsObj.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = "Invalid email format";
    }

    if (!username) {
      errorsObj.username = "Username is required";
    } else if (username.length < 3) {
      errorsObj.username = "Username must be min 3 characters";
    }

    if (!password) {
      errorsObj.password = "Password is required";
    } else if (password.length < 6) {
      errorsObj.password = "Password must be min 6 characters";
    }

    if (!confirmPassword) {
      errorsObj.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errorsObj.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }
    setValidationObject(errorsObj);

    if (Object.keys(errorsObj).length > 0) {
      return;
    }
    const data = await dispatch(signUp(username, email, password));
    if (data && data.errors) {
      setValidationObject(data.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="modal-div">
      <h1 id="signup-title">Sign up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {validationObject.email && (
          <span className="error">{validationObject.email}</span>
        )}
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {validationObject.username && (
          <span className="error">{validationObject.username}</span>
        )}
        <label className="login-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {validationObject.password && (
          <span className="error">{validationObject.password}</span>
        )}
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {validationObject.confirmPassword && (
          <span className="error">{validationObject.confirmPassword}</span>
        )}
        <label className="login-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <div id="signup-button-div">
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
