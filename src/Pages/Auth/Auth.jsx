import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AboutAuth from "./AboutAuth";
import { signUp, logIn } from "../../actions/auth";
import eyeActive from "../../assets/eye.png";
import eyeInactive from "../../assets/hide.png";
import climatic from "../../assets/climatic.png";
import "./Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      try {
        if (isSignup) {
          if (!name) {
            alert("Enter a name to continue");
            setIsLoading(false);
            return;
          }
          await dispatch(signUp({ name, email, password }, navigate));
        } else {
          await dispatch(logIn({ email, password }, navigate));
        }
      } catch (error) {
        alert("Incorrect email or password!");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Enter email and password");
    }
  };
  

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <div className="image-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="110"
            height="110"
            fill="#9746da"
            class="bi bi-cloud-haze2"
            viewBox="3 -5.9 13 20"
          >
            <path d="M8.5 3a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3zM0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
          </svg>
          <img src={climatic} alt="App logo saying Climatic™ in front of a purple-blue gradient" id="img"></img>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <div className="password-field-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={handlePasswordToggle}
              >
                {showPassword ? (
                  <img src={eyeActive} alt="Hide" className="eye-icon" />
                ) : (
                  <img src={eyeInactive} alt="Show" className="eye-icon" />
                )}
              </button>
            </div>
          </label>
          <button type="submit" className="auth-btn">
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin size="2xs" />
            ) : isSignup ? (
              "Sign up"
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
