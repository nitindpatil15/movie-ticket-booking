import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMovie } from "../../Redux/Movie/movieSlice"; // Assuming your slice is named movieSlice.js
import "./CreateMovie.css";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State management for form fields
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([{ name: "", role: "", image: null }]);
  const [crew, setCrew] = useState([{ name: "", role: "", image: null }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle file selection for the poster
  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPoster(file);
    }
  };

  // Function to handle file selection for the trailer
  const handleTrailerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTrailer(file);
    }
  };

  // Function to handle input change for cast and crew details
  const handleCastChange = (index, event) => {
    const { name, value, files } = event.target;
    const updatedCast = [...cast];
    if (name === "image") {
      updatedCast[index][name] = files[0];
    } else {
      updatedCast[index][name] = value;
    }
    setCast(updatedCast);
  };

  const handleCrewChange = (index, event) => {
    const { name, value, files } = event.target;
    const updatedCrew = [...crew];
    if (name === "image") {
      updatedCrew[index][name] = files[0];
    } else {
      updatedCrew[index][name] = value;
    }
    setCrew(updatedCrew);
  };

  // Function to add more cast or crew members
  const addMoreCast = () => {
    setCast([...cast, { name: "", role: "", image: null }]);
  };

  const addMoreCrew = () => {
    setCrew([...crew, { name: "", role: "", image: null }]);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create form data object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", language);
      formData.append("genre", genre);
      formData.append("director", director);
      formData.append("duration", duration);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);

      // Add files to form data
      if (poster) formData.append("image", poster); // `image` key for movie poster
      if (trailer) formData.append("trailer", trailer); // `trailer` key for movie trailer

      // Append cast and crew details
      cast.forEach((member, index) => {
        formData.append(`cast[${index}][name]`, member.name);
        formData.append(`cast[${index}][role]`, member.role);
        if (member.image) {
          formData.append(`cast[${index}][image]`, member.image);
        }
      });

      crew.forEach((member, index) => {
        formData.append(`crew[${index}][name]`, member.name);
        formData.append(`crew[${index}][role]`, member.role);
        if (member.image) {
          formData.append(`crew[${index}][image]`, member.image);
        }
      });

      // Dispatch the createMovie thunk and handle success
      await dispatch(createMovie(formData));
      setSuccessMessage("Movie created successfully!");
      setErrorMessage(null); // Clear any existing error messages
      navigate("/superadmin/movie-data");
    } catch (error) {
      setErrorMessage("Movie creation failed. Please try again.");
      setSuccessMessage(null); // Clear any existing success messages
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="header">
        <div className="text">Add Movies</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="headline">Movie Details</div>
        <div className="underline-1"></div>

        {/* Dotted Box for File Upload */}
        <div className="poster">
          <div className="dotted-box">
            <input
              type="file"
              id="posterUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePosterChange}
              required
            />
            <label htmlFor="posterUpload" className="dotted-label">
              {poster ? (
                <img
                  src={URL.createObjectURL(poster)}
                  alt="Movie Poster"
                  className="preview-image"
                />
              ) : (
                "Click here to upload Movie Poster"
              )}
            </label>
          </div>
        </div>

        <div className="details">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="link">Trailer Link</label>
          <input
            type="url"
            id="link"
            placeholder="Trailer Link"
            value={trailer ? URL.createObjectURL(trailer) : ""}
            readOnly
          />
        </div>

        <div className="poster">
          <div className="dotted-box">
            <input
              type="file"
              id="trailerUpload"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleTrailerChange}
            />
            <label htmlFor="trailerUpload" className="dotted-label">
              {trailer ? (
                <video
                  src={URL.createObjectURL(trailer)}
                  alt="Movie Trailer"
                  style={{ width: "50rem" }}
                  className="preview-video"
                  controls
                />
              ) : (
                "Click here to upload Movie Trailer"
              )}
            </label>
          </div>
        </div>

        <div className="details">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="en">English</option>
            <option value="mr">Marathi</option>
            <option value="hi">Hindi</option>
          </select>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            placeholder="Genre (Comedy, Horror)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <label htmlFor="director">Director Name</label>
          <input
            type="text"
            id="director"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <div className="details d-flex flex-wrap">
          <div className="d-flex">
            <label htmlFor="startDate">StartDate</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="d-flex">
            <label htmlFor="endDate">EndDate</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="d-flex">
            <label htmlFor="duration">Duration:</label>
            <input
              type="number"
              id="duration"
              placeholder="Duration Of Movie"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="headline">Cast Details</div>
        <div className="underline-1"></div>
        {cast.map((member, index) => (
          <div className="details" key={index}>
            <input
              type="text"
              name="name"
              placeholder="Actor Name"
              value={member.name}
              onChange={(e) => handleCastChange(index, e)}
            />
            <input
              type="text"
              name="role"
              placeholder="Actor Role"
              value={member.role}
              onChange={(e) => handleCastChange(index, e)}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleCastChange(index, e)}
            />
          </div>
        ))}
        <button type="button" className="btn" onClick={addMoreCast}>
          <i className="fa fa-home"></i> Add More
        </button>

        <div className="headline">Crew Details</div>
        <div className="underline-1"></div>
        {crew.map((member, index) => (
          <div className="details" key={index}>
            <input
              type="text"
              name="name"
              placeholder="Crew Name"
              value={member.name}
              onChange={(e) => handleCrewChange(index, e)}
            />
            <input
              type="text"
              name="role"
              placeholder="Crew Role"
              value={member.role}
              onChange={(e) => handleCrewChange(index, e)}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleCrewChange(index, e)}
            />
          </div>
        ))}
        <button type="button" className="btn" onClick={addMoreCrew}>
          <i className="fa fa-home"></i> Add More
        </button>
      </div>
      <button type="submit" className="submit">
        Submit
      </button>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default CreateMovie;
