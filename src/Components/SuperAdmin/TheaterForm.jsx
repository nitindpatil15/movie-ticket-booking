import React, { useState } from "react";
import "./TheaterForm.css";
import { useDispatch } from "react-redux";
import { createtheater } from "../../Redux/Theatre/theatreSlice";
import { useNavigate } from "react-router-dom";

function TheaterForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const [mapEmbedLink, setMapEmbedLink] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapLinkChange = (event) => {
    setMapEmbedLink(event.target.value);
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("name", document.getElementById("theaterName").value);
    formData.append("seats", document.getElementById("theaterSeats").value);
    formData.append("contactInfo", JSON.stringify(contactInfo));
    formData.append("address", document.getElementById("theaterAddress").value);
    formData.append("city", document.getElementById("theaterCity").value);
    formData.append("state", document.getElementById("theaterState").value);
    formData.append("zip", document.getElementById("theaterZip").value);
    formData.append("mapEmbedLink", mapEmbedLink);

    // Append the image file
    const imageFileInput = document.getElementById("theaterImage");
    if (imageFileInput.files[0]) {
      formData.append("image", imageFileInput.files[0]);
    }

    // Dispatch the thunk with the form data
    dispatch(createtheater(formData))
      .unwrap()
      .then(() => {
        alert("Theater details saved successfully!");
        navigate("/superadmin/manage-theater")
      })
      .catch((error) => {
        alert(`Failed to save theater details: ${error}`);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Create Theater - Super Admin Panel</h2>

      {/* Theater Details Form */}
      <form id="theaterForm" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="form-section">
          <h4>Upload Theater Image</h4>
          <input
            type="file"
            className="form-control"
            id="theaterImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <img
            id="imagePreview"
            className="image-preview"
            src={imagePreview}
            alt="avatar Preview"
          />
        </div>

        {/* Address Section */}
        <div className="form-section">
          <h4>Theater Address</h4>
          <input
            type="text"
            className="form-control"
            id="theaterName"
            placeholder="Theater Name"
            required
          />
          <input
            type="number"
            className="form-control"
            id="theaterSeats"
            placeholder="Seats"
            required
          />
          <textarea
            className="form-control"
            id="theaterAddress"
            rows="3"
            placeholder="Enter the full address of the theater"
            required
          />
          <input
            type="text"
            className="form-control"
            id="theaterCity"
            placeholder="City"
            required
          />
          <input
            type="text"
            className="form-control"
            id="theaterState"
            placeholder="State"
            required
          />
          <input
            type="text"
            className="form-control"
            id="theaterZip"
            placeholder="Zip Code"
            required
          />
        </div>

        {/* Google Maps Directions Section */}
        <div className="form-section">
          <h4>Google Maps Directions</h4>
          <input
            type="url"
            className="form-control"
            id="theaterDirections"
            placeholder="Enter Google Maps URL"
            value={mapEmbedLink}
            onChange={handleMapLinkChange}
            required
          />
          {mapEmbedLink && (
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              src={mapEmbedLink}
              allowFullScreen
              title="Google Map Embed"
            ></iframe>
          )}
        </div>

        {/* Contact Section */}
        <div className="form-section">
          <h4>Contact Information</h4>
          <input
            type="tel"
            className="form-control"
            id="theaterPhone"
            name="phone"
            placeholder="Phone Number"
            value={contactInfo.phone}
            onChange={handleContactChange}
            required
          />
          <input
            type="email"
            className="form-control"
            id="theaterEmail"
            name="email"
            placeholder="Email Address"
            value={contactInfo.email}
            onChange={handleContactChange}
            required
          />
        </div>

        {/* Facilities Section */}
        <div className="form-section">
          <h4>Facilities</h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facilityParking"
            />
            <label className="form-check-label" htmlFor="facilityParking">
              Parking
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facilityFood"
            />
            <label className="form-check-label" htmlFor="facilityFood">
              Food & Beverages
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facilityWheelchair"
            />
            <label className="form-check-label" htmlFor="facilityWheelchair">
              Wheelchair Accessible
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facilityRestroom"
            />
            <label className="form-check-label" htmlFor="facilityRestroom">
              Restrooms
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Theater Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default TheaterForm;
