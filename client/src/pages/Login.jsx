import React from "react";
import logo from "../assests/logo.png";
import "./../styles/Login.scss";

const Login = () => {
  return (
    <div id="login-container">
      <div className="navbar-login">
        <img src={logo} alt="KEC LOGO" className="navbar-logo" />
        <p className="navbar-logo-name">Kongu Engineering College</p>
      </div>
      <div className="login-form-container">
        <form className="login-form">
          <div className="login-heading-des">
            <h1 className="login-title">Login</h1>
            <p className="login-des">
              Welcome back! Login to access the KEC Exam Booking
            </p>
          </div>
          <div className="login-elements">
            <input
              className="login-text-field"
              placeholder="Email"
              type={"email"}
              required
            />
          </div>
          <div className="login-elements">
            <input
              className="login-text-field"
              placeholder="Password"
              type={"password"}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
