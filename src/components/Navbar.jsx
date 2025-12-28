import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">

        {/* Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://res.cloudinary.com/dwr8472qb/image/upload/v1735985550/images_kjpzhg.jpg"
            alt="AptiCrack"
            style={{ height: "40px" }}
            className="me-2"
          />
          <span className="fw-bold">AptiCrack</span>
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/user/login"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-semibold" : ""}`
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/user/signup"
                    className="btn btn-primary ms-lg-3 px-3"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-outline-secondary px-3"
                    onClick={() => navigate("/student/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-danger px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;