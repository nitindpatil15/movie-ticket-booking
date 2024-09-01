import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../Redux/Auth/authSlice";
import { fetchCurrentUser } from "../../Redux/User/userSlice"; // Import fetchCurrentUser action
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

import call from "../Assets/call.png";
import person from "../Assets/person.png";
import add from "../Assets/add.png";
import email from "../Assets/email.png";
import pass from "../Assets/pass.png";
import genderIcon from "../Assets/gender.png";

export const LoginSignup = () => {
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      ).unwrap();
      dispatch(fetchCurrentUser());
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
      setError("Login failed, please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      const formPayload = new FormData();

      // Combine firstName and lastName into a single 'name' field
      formPayload.append("name", `${formData.firstName} ${formData.lastName}`);

      // Append other fields
      Object.keys(formData).forEach((key) => {
        if (key !== "firstName" && key !== "lastName") {
          formPayload.append(key, formData[key]);
        }
      });

      dispatch(registerUser(formPayload));
      dispatch(fetchCurrentUser()).then(() => setAction("Login")); // Fetch current user data after registration
    } catch (error) {
      console.error("Login failed: ", error);
      setError("Login failed, please try again.");
    }
  };

  return (
    <div className="container">
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign UP
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div
            className="container-new"
            style={{ marginLeft: "6rem", marginTop: "1rem" }}
          >
            <div className="input-new-1">
              <input
                type="file"
                id="uploadimg"
                name="avatar"
                onChange={handleFileChange}
                placeholder="Image"
              />
              <label
                htmlFor="uploadimg"
                id="label-img"
                style={{ width: "25rem" }}
              >
                <img src={add} id="labelimg" alt="Upload" /> Upload File
              </label>
              {avatarPreview && (
                <div className="image-preview">
                  <img src={avatarPreview} alt="Avatar Preview" />
                </div>
              )}
            </div>
            <div className="container-name">
              <div className="input-new">
                <img src={person} alt="First Name" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-new">
                <img src={person} alt="Last Name" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}
        <div className="contact">
          <div className="input">
            <img src={email} alt="Email" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {action === "Login" ? null : (
            <div className="input">
              <img src={call} alt="Contact" />
              <input
                type="tel"
                id="phone"
                name="phone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                placeholder="Contact No."
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <div className="other-info">
          {action === "Login" ? null : (
            <div className="input-gender">
              <img src={genderIcon} alt="Gender" />
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="transgender"
                name="gender"
                value="Transgender"
                checked={formData.gender === "Transgender"}
                onChange={handleInputChange}
              />
              <label htmlFor="transgender">Transgender</label>
            </div>
          )}
          <div className="input">
            <img src={pass} alt="Password" />
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

      <div className="submit-action submitbtn">
        <button
          className="submit-button submit"
          onClick={action === "Login" ? handleLogin : handleRegister}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
