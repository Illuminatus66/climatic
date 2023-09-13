import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import "./Navbar.css";
import { fetchCurrentUser } from "../../reducers/userSlice"; 
import { logout } from "../../reducers/authSlice";
import { resetWeather } from "../../reducers/weatherSlice"
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch (resetWeather());
    navigate("/");
    dispatch(fetchCurrentUser(null));
  };

  useEffect((handleLogout) => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(fetchCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch, user?.token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor : '#95d3ff'}}>
        <div className="navbar-1">
          <Link to='/' className= 'nav-logo'>
          <svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" fill="#9746da" className="bi bi-cloud-haze2" viewBox="-2 -1 19 19">
  <path d="M8.5 3a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3zM0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
</svg>
          </Link>
          <span className="navbar-brand mb-4 h2">Climatic™ created by Illuminatus66</span>
          <Link to="https://github.com/Illuminatus66" className="nav-item nav-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-github" viewBox="0 1 18 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg>
            Github Link
          </Link>
          <Link to="https://github.com/Illuminatus66/climatic" className="nav-item nav-btn">
            Project Info
          </Link>
        </div>
        <div className="navbar-2">
          {user === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
