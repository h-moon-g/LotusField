import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUserLogIn = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  return (
    <>
      <div className="modal-div">
        <h1 id="login-title">Log In</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <ul className="errors-ul">
            {Object.values(errors).map((error, idx = 0) => (
              <li className="error" key={idx + 1}>
                {error}
              </li>
            ))}
          </ul>
          <label id="email-label">
            Email
            <input
              className="field-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="label">
            Password
            <input
              className="field-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div id="login-button-div">
            <button id="login-button" type="submit">
              Log In
            </button>
            <button className="demoUserLink" onClick={demoUserLogIn}>
              Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
