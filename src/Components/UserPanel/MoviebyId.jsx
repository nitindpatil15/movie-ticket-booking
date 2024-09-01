import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // To get the movie ID from URL
import { fetchAllMovies, fetchMovieById } from "../../Redux/Movie/movieSlice";
import "./MoviebyId.css";

const MoviebyId = () => {
  const navigate = useNavigate();
  const { movieId } = useParams(); // Assuming you're using React Router to get movie ID from URL
  const dispatch = useDispatch();

  // State for controlling trailer modal visibility
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch movie data from Redux store
  const { currentMovie, status, error } = useSelector((state) => state.movies);
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId)); // Fetch movie by ID on component mount
      dispatch(fetchAllMovies());
    }
  }, [dispatch, movieId]);

  const handlebooking = (movieId) => {
    navigate(`/movie/book/${movieId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentMovie) {
    return <div>No movie found.</div>;
  }

  // Destructure movie data
  const {
    _id,
    title,
    image,
    language,
    genre,
    // eslint-disable-next-line
    director,
    cast,
    crew,
    trailer,
    description,
    duration,
    startDate,
  } = currentMovie;

  const handleLikeMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container">
      {/* Movie Header Section */}
      <div
        className="jumbotron d-flex align-items-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          position: "relative",
          height: "70vh",
        }}
      >
        {/* Overlay for Blur Effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Slight overlay for better text visibility
            backdropFilter: "blur(2px)", // Blur effect
          }}
        ></div>

        {/* Movie Content */}
        <div className="row jumbotron-content w-100 position-relative">
          <div className="col-md-4">
            <img
              src={image}
              alt="Movie Poster"
              id="movie-poster"
              className="movie-poster img-fluid"
              style={{
                objectFit: "cover",
                height: "22rem",
                borderRadius: "10px",
              }}
            />
            <button
              className="btn-2 btn-primary btn-view-trailer mt-3"
              style={{position:"relative",bottom:"3.8rem",left:"8rem",backgroundColor:"#fe39ff",width:"10rem"}}
              onClick={() => setShowTrailer(true)}
            >
              {" "}
              View Trailer
            </button>
          </div>
          <div className="col-md-5" style={{marginLeft:"3rem"}}>
            <h1>{title}</h1>
            <p>
              Date: {new Date(startDate).toLocaleDateString()} | Duration:{" "}
              {Math.floor(duration / 60)}h {duration % 60}m
            </p>
            <p>
              Language: {language} | Genre: {genre}
            </p>
            <p id="rating">⭐ 4.5/5</p>{" "}
            {/* Replace with actual rating if available */}
            <button
              className="btn btn-danger btn-book-ticket"
              onClick={() => handlebooking(_id)}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Movie Description Section */}
      <div
        style={{
          textAlign: "left",
          marginTop: " 10px",
          borderBottom: " 1px solid #cdcdcd",
          borderTop: "1px solid #cdcdcd",
          paddingTop: "10px",
        }}
      >
        <h2>About Movie</h2>
        <p>{description}</p>
      </div>

      {/* Movie Cast Section */}
      <div className="movie-cast">
        <h2>Cast</h2>
        <div className="row">
          {cast.map((member) => (
            <div className="col-md-3" key={member._id}>
              <img
                src={member.image}
                alt={member.name}
                className="img-fluid rounded-circle"
              />
              <h5>{member.name}</h5>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Movie Crew Section */}
      <div className="movie-crew">
        <h2>Crew</h2>
        <div className="row">
          {crew.map((member) => (
            <div className="col-md-3" key={member._id}>
              <img
                src={member.image}
                alt={member.name}
                className="img-fluid rounded-circle"
              />
              <h5>{member.name}</h5>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies Section (You Might Like) */}
      <div className="you-might-like">
        <h2>You Might Like</h2>
        <div className="row" id="m-d-row">
          {movies.map((item, index) => (
            <div className="col-md-3" key={index} onClick={()=>handleLikeMovie(item._id)} style={{cursor:"pointer"}}>
              <div className="card">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={`Movie ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.language}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Trailer */}
      {trailer && (
        <div
          className={`modal fade ${showTrailer ? "show" : ""}`}
          style={{ display: showTrailer ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content" id="modal-content">
                <div className="modal-header" id="modal-header">
                  <h5 className="modal-title">Trailer</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowTrailer(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <iframe
                    width="100%"
                    height="400"
                    src={trailer}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Movie Trailer"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviebyId;
