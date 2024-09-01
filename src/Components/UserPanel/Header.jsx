import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, fetchCurrentUser } from "../../Redux/User/userSlice";
import { Logout } from "../../Redux/Auth/authSlice";
import logoP from "../Assets/Movie-Booking-001.png";
import "material-icons/iconfont/material-icons.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentUser()); // Fetch current user on header load
  }, [dispatch]);

  const handleLogout = async() => {
    await dispatch(Logout()).unwrap();
    dispatch(fetchCurrentUser());
    navigate("/login-signup");
  };

  const handleprofile = (userId) => {
    navigate(`/user/profile/:${userId}`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-custom-2">
        <Link className="navbar-brand" to="/">
          <img src={logoP} alt="logo" id="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav2"
          aria-controls="navbarNav2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="navbar-nav ml-auto"></ul>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <div className="material-icons" aria-hidden="true">
              dashboard_customize
            </div>
            Dashboard
          </button>
        </div>
      </nav>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          {currentUser ? (
            <h5
              onClick={()=>handleprofile(currentUser._id)}
              className="offcanvas-title"
              id="offcanvasExampleLabel"
              style={{ cursor: "pointer" }}
            >
              {currentUser?.avatar?.trim() === "" ? (
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png"
                  alt="avatar"
                  className="user-avatar"
                />
              ) : (
                <img
                  src={currentUser?.avatar}
                  alt="avatar"
                  className="user-avatar"
                />
              )}
              {currentUser?.name}
            </h5>
          ) : (
            <>
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                <i
                  className="fa fa-user-circle-o"
                  aria-hidden="true"
                  id="user-offcanvas"
                ></i>
                User
              </h5>
            </>
          )}
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div>
          {currentUser?.role === "SuperAdmin" ? (
            <div className="offcanvas-body">
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link to="/superadmin/movie-data" className="p-4 text-black">
                  Movies
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link
                  to="/superadmin/allreservations"
                  className="p-4 text-black"
                >
                  All Reservations
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link to="super-admin/createmovie" className="p-4 text-black">
                  createMovie
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link
                  to="/superadmin/manage-theater"
                  className="p-4 text-black"
                >
                  Manage Theatres
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link
                  to="/superadmin/manage-showtimes"
                  className="p-4 text-black"
                >
                  Manage Showtimes
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link to="/superadmin/users" className="p-4 text-black">
                  Manage AllUsers
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link to="/superadmin/ads" className="p-4 text-black">
                  Manage Ads
                </Link>
              </div>
              <button
                className="btn mr-5"
                id="btn-logout"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </button>
            </div>
          ) : currentUser?.role === "Admin" ? (
            <>
              <div className="offcanvas-body">
                <div
                  className="p-2 mt-2"
                  style={{ backgroundColor: "ButtonShadow" }}
                >
                  <Link to="/superadmin/movie-data" className="p-4 text-black">
                    Movies
                  </Link>
                </div>
                <div
                  className="p-2 mt-2"
                  style={{ backgroundColor: "ButtonShadow" }}
                >
                  <Link to="super-admin/createmovie" className="p-4 text-black">
                    createMovie
                  </Link>
                </div>
                <div
                  className="p-2 mt-2"
                  style={{ backgroundColor: "ButtonShadow" }}
                >
                  <Link
                    to="/superadmin/manage-theater"
                    className="p-4 text-black"
                  >
                    Manage Theatres
                  </Link>
                </div>
                <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link
                  to="/superadmin/manage-showtimes"
                  className="p-4 text-black"
                >
                  Manage Showtimes
                </Link>
              </div>
                <button
                  className="btn mr-5"
                  id="btn-logout"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </button>
              </div>
            </>
          ) : currentUser?(<></>):(
            <>
              <div className="offcanvas-body">
                <div
                  className="p-2 mt-2"
                  style={{ backgroundColor: "ButtonShadow" }}
                >
                  <Link to="/login-signup" className="p-4 text-black">
                    User Login
                  </Link>
                </div>
              </div>
            </>
          )}
          {currentUser?.role==="Admin" || currentUser?.role==="Customer" ? (
            <div className="offcanvas-body">
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <Link to="/superadmin/allreservations" className="p-4 text-black">
                  Reservations
                </Link>
              </div>
              <div
                className="p-2 mt-2"
                style={{ backgroundColor: "ButtonShadow" }}
              >
                <div onClick={()=>handleDelete(currentUser._id)} className="px-4 text-black" style={{cursor:"pointer"}}>
                  Delete Account
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <button className="btn" id="btn-logout" onClick={handleLogout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
