import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import "./login.css";

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    await signUp(email.value, name.value, password.value);
    navigate("/login");
  };
  return (
    <div className="login">
      <form onSubmit={handleSignUp}>
        <h2 className="heading">🛍️Sign Up to Small Bazaar🛍️</h2>
        <section>
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input className="login__input" type="text" name="name" id="name" />
        </section>
        <section>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
          />
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
          <button type="submit">Sign Up</button>{" "}
        </section>
        <section>
          <p>
            Already a user?
            <Link to="/login">Login</Link>
          </p>
        </section>
      </form>
    </div>
  );
}
