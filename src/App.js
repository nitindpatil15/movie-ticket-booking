import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import LoginAdmin from "./Components/AdminPanel/LoginAdmin";
import {CreateAdmin} from "./Components/SuperAdmin/CreateAdmin";
import SuperAdminLogin from "./Components/LoginSignup/SuperAdminLogin";
import HomeUser from "./Components/UserPanel/HomeUser";
import ViewMovieData from "./Components/SuperAdmin/ViewMovieData";
import TheaterForm from "./Components/SuperAdmin/TheaterForm";
import SeatSelection from "./Components/UserPanel/SeatSelection";
import UserReservation from "./Components/SuperAdmin/UserReservation";
import ViewAllUsers from "./Components/SuperAdmin/ViewAllUsers";
import Header from "./Components/UserPanel/Header";
import MoviebyId from "./Components/UserPanel/MoviebyId";
import CreateMovie from "./Components/SuperAdmin/CreateMovie";
import AllTheater from "./Components/SuperAdmin/AllTheater";
import TheaterShowtimes from "./Components/UserPanel/TheaterDetails";
import Showtimes from "./Components/UserPanel/Showtimes";
import AllAds from "./Components/SuperAdmin/AllAds";
import { CarousalAds } from "./Components/AdminPanel/CarousalAds";
import ManageShowtimes from "./Components/SuperAdmin/ManageShowtimes";
import Profile from "./Components/UserPanel/updateUser";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeUser />} />
        <Route
          exact
          path="/super-admin/createmovie"
          element={<CreateMovie />}
        />
        <Route exact path="/login-signup" element={<LoginSignup />} />
        <Route exact path="/admin/login" element={<LoginAdmin />} />
        <Route exact path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route
          exact
          path="/superadmin/movie-data"
          element={<ViewMovieData />}
        />
        <Route
          exact
          path="/superadmin/manage-theater"
          element={<AllTheater />}
        />
        <Route
          exact
          path="/superadmin/create-theater"
          element={<TheaterForm />}
        />
        <Route exact path="/superAdmin/createAdmin/:theatreId" element={<CreateAdmin />}
        />
        <Route exact path="/superadmin/showtimes" element={<Showtimes />} />
        <Route exact path="/superadmin/manage-showtimes/:theaterId" element={<ManageShowtimes/>} />
        <Route exact path="/superadmin/manage-showtimes" element={<ManageShowtimes/>} />
        <Route exact path="/superadmin/seats" element={<SeatSelection />} />
        <Route
          exact
          path="/superadmin/allreservations"
          element={<UserReservation />}
        />
        <Route exact path="/superadmin/users" element={<ViewAllUsers />} />
        <Route exact path="user/profile/:userId" element={<Profile/>} />
        <Route exact path="/movie/:movieId" element={<MoviebyId />} />
        <Route
          exact
          path="/movie/book/:movieId"
          element={<TheaterShowtimes />}
        />
        <Route exact path="/superadmin/ads" element={<AllAds />} />
        <Route exact path="/superadmin/ads/add" element={<CarousalAds />} />
        <Route exact path="/seat-selection/movieId/:movieId/theatreId/:theatreId/showtimeId/:showtimeId" element={<SeatSelection/>} />
      </Routes>
    </Router>
  );
}

export default App;
