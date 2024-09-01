import React, { useState } from "react";
import "./SuperAdminLogin.css";
import email from "../Assets/email.png";
import pass from "../Assets/pass.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SuperAdminlogin } from "../../Redux/Auth/authSlice";
import { fetchCurrentUser } from "../../Redux/User/userSlice";

export const LoginSignup = () => {
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      await dispatch(
        SuperAdminlogin({ email: formData.email, password: formData.password })
      ).unwrap();
      dispatch(fetchCurrentUser());
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
      setError("Login failed, please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Super Admin</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="contact">
          <div className="input">
            <img src={email}  alt="mail"/>
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
            <img src={pass} alt="pass"/>
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

      <div className="submit-container">
        {/* <div className={action=="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign UP</div> */}
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
