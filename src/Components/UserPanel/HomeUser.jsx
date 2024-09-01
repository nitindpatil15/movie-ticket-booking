import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../Redux/Movie/movieSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./HomeUser.css";
import { fetchAds } from "../../Redux/Ads/adsSlice";

const HomeUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, status } = useSelector((state) => state.movies);
  const { ads, adstatus } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAds());
  }, [dispatch, location]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>; // You can use a spinner component here
  }

  return (
    <div style={{margin: "0",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color:" #212529",
      textAlign: "left",
      background: "#1e1e1e",
      backgroundImage: "repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 6px)",
      backgroundSize: "50px 50px"}}>
      {/* Movies Carousel */}
      <div
        id="carouselMovies"
        className="carousel slide mt-2"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {movies.slice(0, 3).map((_, index) => (
            <li
              key={index}
              data-target="#carouselMovies"
              data-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner">
          {status === "succeeded" &&
            movies.slice(0, 3).map((movie, index) => (
              <div
                key={movie._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                onClick={() => handleMovieClick(movie._id)}
              >
                <img
                  src={movie.image}
                  style={{height:"30rem",objectFit:"fit"}}
                  className="d-block w-100"
                  alt={movie.title}
                />
              </div>
            ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselMovies"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselMovies"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      {/* Ads Carousel */}
      <div 
        id="carouselAds"
        className="carousel slide mt-4"
        data-ride="carousel"
      >
        {adstatus === "succeeded" && ads.length > 0 ? (
          <>
            <ol className="carousel-indicators">
              {ads.map((_, index) => (
                <li
                  key={index}
                  data-target="#carouselAds"
                  data-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {ads.map((ad, index) => (
                <div
                  key={ad._id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <Link className="ad-body border-black" to={ad.link}>
                    <img
                      src={ad.imageUrl}
                      alt={ad.title}
                      className="d-block w-100"
                      style={{ maxHeight: "100px" }}
                    />
                    <p className="text-white bold mx-4" style={{textAlign:"center"}}>{ad.title}</p>
                  </Link>
                </div>
              ))}
            </div>
            {/* <a
              className="carousel-control-prev"
              href="#carouselAds"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a> */}
            <a
              className="carousel-control-next"
              href="#carouselAds"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </>
        ) : (
          <div className="mt-3" style={{textAlign:"center"}}>No Ads Available</div>
        )}
      </div>

      {/* Content Section */}
      <div className="container-fluid">
        {/* Newly Arrived Movies Section */}
        <div className="row" id="h-row" >
          <div className="col-12">
            <div className="content-section">
              <div className="content-section-header">
                <h5 style={{textAlign:"center"}}>Newly Arrived Movies</h5>
              </div>
              <div className="row" id="h-row">
                {status === "succeeded" &&
                  movies.map((movie) => (
                    <div
                      key={movie._id}
                      className="col-md-4 col-sm-6 col-xs-12 mb-3"
                      onClick={() => handleMovieClick(movie._id)}
                    >
                      <div className="content-placeholder">
                        <img
                          style={{ width: "30rem", height: "10rem" }}
                          src={movie.image}
                          alt={movie.title}
                          className="img-fluid"
                        />
                        <p className="" id="movie-desc-home">
                          {movie.title}
                          <br /> {movie.genre}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
