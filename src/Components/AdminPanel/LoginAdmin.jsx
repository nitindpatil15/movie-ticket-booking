import React, { useState } from "react";
import "./LoginAdmin.css";
import email from "../Assets/email.png";
import pass from "../Assets/pass.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Adminlogin } from "../../Redux/Auth/authSlice"; // Correct import for admin login
import { fetchCurrentUser } from "../../Redux/User/userSlice";

export const LoginSignup = () => {
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
      dispatch(
        Adminlogin({ email: formData.email, password: formData.password })
      ).then(()=>
        dispatch(fetchCurrentUser())
        .then(()=>navigate("/"))
      )
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Admin Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="contact">
          <div className="input">
            <img src={email} alt="email icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="other-info">
          <div className="input">
            <img src={pass} alt="password icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error message */}
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
