import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/auth";

import "./login.css";

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;
    await signIn(username.value, password.value);
    navigate("/");
  };
  return (
    <div className="login">
      <form onSubmit={handleSignIn}>
        <h2 className="heading">🛍️Login to Small Bazaar🛍️</h2>
        <section>
          <label htmlFor="username">
            <strong>UserName</strong>
          </label>
          <input
            className="login__input"
            type="text"
            name="username"
            id="username"
            // placeholder="Your Email"
          />
          {/* <input type="email" /> */}
        </section>
        <section>
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            id="password"
          />
          <button type="submit">Sign In</button>{" "}
        </section>
        <section>
          <p>
            New user?
            <Link to="/signup">Sign Up</Link>
          </p>
        </section>
      </form>
    </div>
  );
}
