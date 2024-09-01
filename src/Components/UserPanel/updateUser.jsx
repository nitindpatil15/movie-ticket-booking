import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../../Redux/User/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, updatestatus } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        avatar: null, // Reset avatar to null to allow new uploads
      });
    }
  }, [currentUser]);

  // Handler for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      avatar: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("name", formData.name);
    userData.append("email", formData.email);
    userData.append("phone", formData.phone);
    if (formData.avatar) {
      userData.append("avatar", formData.avatar);
    }

    dispatch(updateUser({ userId: currentUser._id, userData }));
  };

  if (updatestatus === "loading") {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading user data...</div>
      </div>
    );
  }

  if (updatestatus === "failed") {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Failed to load user data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="card-title mb-4">Profile</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
        {updatestatus === "loading" && (
          <div className="mt-3 alert alert-info">Updating...</div>
        )}
        {updatestatus === "failed" && (
          <div className="mt-3 alert alert-danger">
            Something went wrong. Please try again.
          </div>
        )}
        {updatestatus === "succeeded" && (
          <div className="mt-3 alert alert-success">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
