import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateAdmin.css";

import call from "../Assets/call.png";
import person from "../Assets/person.png";
import add from "../Assets/add.png";
import email from "../Assets/email.png";
import pass from "../Assets/pass.png";
import gender from "../Assets/gender.png";
import { createAdmin } from "../../Redux/Auth/authSlice";

export const CreateAdmin = () => {
  const navigate = useNavigate()
  const { theatreId } = useParams(); // Get the theatreId from the URL
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    imageUrl: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, imageUrl: files[0] }); // Correctly handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminData = new FormData();
    adminData.append("name", `${formData.firstName} ${formData.lastName}`);
    adminData.append("email", formData.email);
    adminData.append("phone", formData.phone);
    adminData.append("gender", formData.gender);
    adminData.append("password", formData.password);

    if (formData.imageUrl) {
      adminData.append("avatar", formData.imageUrl); // Use 'avatar' to match backend
    }

    console.log("Admin Data:", Object.fromEntries(adminData)); // Log the FormData for debugging
    dispatch(createAdmin({ theatreId, adminData })).then(() =>
      navigate("/superadmin/manage-theater")
    );
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Register Admin</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="container-new" style={{ marginLeft: "6rem" }}>
          <div className="input-new-1">
            <input
              type="file"
              id="uploadimg"
              name="avatar" // Keep the name 'avatar' to match backend
              onChange={handleChange}
              placeholder="Image"
              required
            />
            <label htmlFor="uploadimg" id="label-img" style={{width:"20rem"}}>
              <img src={add} id="labelimg" alt="Upload" /> Upload File
            </label>
          </div>
          <div className="container-name">
            <div className="input-new">
              <img src={person} alt="person" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-new">
              <img src={person} alt="person" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="contact">
          <div className="input">
            <img src={email} alt="email" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <img src={call} alt="call" />
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder="Contact No.:"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="other-info">
          <div className="input-gender">
            <img src={gender} alt="gender" />
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            <label htmlFor="Male">Male</label>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            <label htmlFor="Female">Female</label>
            <input
              type="radio"
              id="Transgender"
              name="gender"
              value="Transgender"
              onChange={handleChange}
              required
            />
            <label htmlFor="Transgender">Transgender</label>
          </div>
          <div className="input">
            <img src={pass} alt="pass" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Assign Admin
        </div>
      </div>
    </div>
  );
};
