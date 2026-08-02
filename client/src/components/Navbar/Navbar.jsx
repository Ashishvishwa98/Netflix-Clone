import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  // Profile menu open/close karne ke liye
  const [showMenu, setShowMenu] = useState(false);

  // LocalStorage se user ki details lo
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Logout function
  const handleLogout = () => {

    // Login token delete karo
    localStorage.removeItem("token");

    // User data delete karo
    localStorage.removeItem("user");

    // Login page par bhej do
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Navbar ka Left Section */}
      <div className="navbar-left">

        {/* Netflix Logo */}
        <h1 className="logo">NETFLIX</h1>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/new-popular">New & Popular</Link>
          <Link to="/my-list">My List</Link>
        </div>

      </div>

      {/* Navbar ka Right Section */}
      <div className="navbar-right">

        {/* Search Icon */}
        <FaSearch className="nav-icon" />

        {/* Notification Icon */}
        <FaBell className="nav-icon" />

        {/* User Profile Section */}
        <div
          className="profile"
          onClick={() => setShowMenu(!showMenu)}
        >

          {/* Profile Image */}
          <img
            className="profile-img"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
          />

          {/* User ka Name */}
          <span className="profile-name">
            {user?.name
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "User"}
          </span>

          {/* Dropdown Arrow */}
          <FiChevronDown className="arrow" />

          {/* Agar showMenu true hai tabhi dropdown dikhega */}
          {showMenu && (
            <div className="profile-menu">

              {/* User Details */}
              <div className="menu-user">

                <img
                  className="menu-avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  alt="Avatar"
                />

                <div className="menu-info">

                  {/* User Name */}
                  <h4>
                    {user?.name
                      ? user.name.charAt(0).toUpperCase() +
                        user.name.slice(1)
                      : "User"}
                  </h4>

                  {/* User Email */}
                  <p className="profile-email">
                    {user?.email}
                  </p>

                </div>

              </div>

              {/* Logout Button */}
              <button
                className="logout-btn"
                onClick={(e) => {

                  // Click event parent tak na jaye
                  e.stopPropagation();

                  // Logout function call karo
                  handleLogout();
                }}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;