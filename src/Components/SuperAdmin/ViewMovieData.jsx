import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMovies,
  deleteMovie,
  updateMovie,
} from "../../Redux/Movie/movieSlice"; // Import actions
import "./ViewMovieData.css";
import { useLocation } from "react-router-dom";

const ViewMovieData = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movies);

  // State for Modal and Form
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({
    _id: "",
    title: "",
    director: "",
    genre: "",
    language: "",
    image: null, // Add image state
    trailer: null, // Add trailer state
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [trailerPreview, setTrailerPreview] = useState(null); // State for trailer preview

  // Fetch all movies when the component mounts or location changes
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllMovies());
    }
    
  }, [dispatch, status, location]);

  // Open modal and set selected movie data
  const handleUpdateClick = (movie) => {
    setSelectedMovie(movie);
    setImagePreview(movie.image); // Set image preview from the selected movie
    setTrailerPreview(movie.trailer); // Set trailer preview from the selected movie
    setShowModal(true);
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMovie({ ...selectedMovie, [name]: value });
  };

  // Handle file input changes in the modal form
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image" && files[0]) {
      setSelectedMovie({ ...selectedMovie, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // Preview image
    } else if (name === "trailer" && files[0]) {
      setSelectedMovie({ ...selectedMovie, trailer: files[0] });
      setTrailerPreview(URL.createObjectURL(files[0])); // Preview trailer video
    }
  };

  // Handle movie update
  const handleUpdateSubmit = () => {
    const formData = new FormData(); // Use FormData for file uploads
    formData.append("title", selectedMovie.title);
    formData.append("director", selectedMovie.director);
    formData.append("genre", selectedMovie.genre);
    formData.append("language", selectedMovie.language);
    if (selectedMovie.image) formData.append("image", selectedMovie.image); // Append image if selected
    if (selectedMovie.trailer)
      formData.append("trailer", selectedMovie.trailer); // Append trailer if selected

    dispatch(updateMovie({ movieId: selectedMovie._id, movieData: formData }));
    setShowModal(false); // Close the modal after submission
  };

  // Delete movie handler
  const handleDelete = (movieId) => {
    dispatch(deleteMovie(movieId));
  };

  return (
    <>
      <div className="container" key={location.pathname} id="v-m-container">
        <div className="header">
          <div className="text">View Movies Data</div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Director Name</th>
              <th>Genre</th>
              <th>Language</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : status === "failed" ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Failed to load movies.
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.language}</td>
                  <td>
                    <button
                      className="btn-1"
                      onClick={() => handleUpdateClick(movie)}
                    >
                      <i className="fa fa-pencil-square-o"></i> Update
                    </button>
                    <button
                      className="btn-2"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Movie */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" id="v-m-d-model">
            <h4>Update Movie</h4>
            <form>
              <div className="form-group">
                <label>Movie Name</label>
                <input
                  type="text"
                  name="title"
                  value={selectedMovie.title}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Director Name</label>
                <input
                  type="text"
                  name="director"
                  value={selectedMovie.director}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={selectedMovie.genre}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Language</label>
                <input
                  type="text"
                  name="language"
                  value={selectedMovie.language}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Movie Poster</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="preview-image"
                    id="v-d-img"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Trailer Video</label>
                <input
                  type="file"
                  name="trailer"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {trailerPreview && (
                  <video
                    src={trailerPreview}
                    controls
                    className="preview-video"
                    id="v-d-video"
                  />
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateSubmit}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMovieData;
