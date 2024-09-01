import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { deleteAd, fetchAds } from "../../Redux/Ads/adsSlice"; // Adjust import path if needed
import "./AllTheater.css"

const AllAds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ads, status, error } = useSelector((state) => state.ads); // Select ads state from Redux store

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch, status]);

  const handleDeleteClick = (adId) => {
    dispatch(deleteAd(adId))
      .unwrap()
      .then(() => {
        alert("Ad deleted successfully");
      })
      .catch((error) => {
        alert(error.message || "Failed to delete ad");
      });
  };

  const handleAddClick = () => {
    navigate("/superadmin/ads/add"); // Corrected the navigation path
  };

  return (
    <div className="mx-5" style={{backgroundColor:"white"}}>
      <div className="header mx-auto" >
        <div className="text" style={{display:"flex"}}>View All Ads
        <button className="btn-2" onClick={handleAddClick}>
          <i className="fa fa-plus"></i> Add Ad
        </button>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Ad Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : status === "failed" ? (
            <tr>
              <td colSpan="4" className="text-center">
                Refresh to load ads. {error}
              </td>
            </tr>
          ) : (
            ads.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>
                  <img
                    src={ad.imageUrl}
                    alt={ad.name}
                    className="ad-image"
                    style={{ width: "15rem", height: "6rem" }}
                  />
                </td>
                <td>
                  <button
                    className="btn-2"
                    onClick={() => handleDeleteClick(ad._id)}
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
  );
};

export default AllAds;
