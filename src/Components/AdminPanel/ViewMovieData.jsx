import React from "react";
import "./ViewMovieData.css";

const ViewMovieData = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">View Movies Data</div>
        </div>
        <table class="table table-striped table-hover">
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
            <tr>
              <td>Stree 2</td>
              <td>Amar Kaushik</td>
              <td>Horror</td>
              <td>Hindi</td>
              <td>
                <button class="btn-1">
                  <i class="fa fa-pencil-square-o"></i> Update
                </button>
                <button class="btn-2">
                  <i class="fa fa-home"></i> Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>Pushpa</td>
              <td>Sukumar</td>
              <td>Action</td>
              <td>Hindi</td>
              <td>
                <button class="btn-1">
                  <i class="fa fa-pencil-square-o"></i> Update
                </button>
                <button class="btn-2">
                  <i class="fa fa-home"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMovieData;
