import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const auth = useContext(AuthContext);

  return (
    <header className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <button
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>

        <a href="/" className="logo">
          Broker
        </a>

        {showMenu && (
          <div className="dropdown">
            <a href="/">All</a>

            <a href="/jobs">Jobs</a>
            <a href="/furniture">Furniture</a>
            <a href="/electronics">Electronics</a>

            {/* Houses Dropdown */}
            <div className="nested">
              <button
                className="nested-btn"
                onClick={() => setShowHouses(!showHouses)}
              >
                Houses ▸
              </button>

              {showHouses && (
                <div className="nested-menu">
                  <a href="/houses/sale">For Sale</a>
                  <a href="/houses/rent">For Rent</a>
                </div>
              )}
            </div>

            <hr />

            {auth?.user && (
              <>
                <a href="/myposts">My Posts</a>
                <a href="/dashboard">Post Item</a>
              </>
            )}
          </div>
        )}
      </div>

      {/* CENTER SEARCH */}
      <div className="nav-center">
        <input type="text" placeholder="Search products..." />
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {auth?.user ? (
          <>
            <a href="/profile" className="profile-btn">
              {auth.user.name}
            </a>

            <button onClick={auth.logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="login-btn">
              Login
            </a>
            <a href="/register" className="signup-btn">
              Sign Up
            </a>
          </>
        )}
      </div>
    </header>
  );
}