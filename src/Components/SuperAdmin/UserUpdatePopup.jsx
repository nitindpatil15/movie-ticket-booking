import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './UserUpdatePopup.css';
import { fetchAllUsers, updateUser } from '../../Redux/User/userSlice'; // Import the updateUser action

const UserUpdatePopup = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateUser action with the required data
    dispatch(updateUser({ userId: user._id, userData: formData }));
    onClose(); // Close the popup after submitting
    dispatch(fetchAllUsers())
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Contact</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-1">Update</button>
            <button type="button" className="btn-2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdatePopup;
