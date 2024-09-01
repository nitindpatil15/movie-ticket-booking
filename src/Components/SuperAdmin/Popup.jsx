import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatetheater } from "../../Redux/Theatre/theatreSlice";
import "./Popup.css";

const Popup = ({ theater, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    seats: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (theater) {
      setFormData({
        name: theater.name || "",
        city: theater.city || "",
        seats: theater.seats || "",
      });
    }
  }, [theater]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Optional: Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataForUpload = new FormData();
    formDataForUpload.append("name", formData.name);
    formDataForUpload.append("city", formData.city);
    formDataForUpload.append("seats", formData.seats);
    if (imageFile) {
      formDataForUpload.append("image", imageFile);
    }
  
    try {
      dispatch(
        updatetheater({ theaterId: theater._id, theaterData: formDataForUpload })
      );
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h2>Update Theater</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Seats:
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="image-preview"
                style={{ width: "100px", height: "auto", marginTop: "10px" }}
              />
            )}
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
