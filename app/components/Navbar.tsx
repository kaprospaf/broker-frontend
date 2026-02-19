import { Link } from "react-router";
import { useState } from "react";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/api/posts?search=${search}`
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <div
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Link to="/" className="logo">
          <span className="logo-icon">◆</span>
          Broker
        </Link>
      </div>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="nav-center">
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>

        <div
          className="profile-wrapper"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          👤
          {profileOpen && (
            <div className="profile-dropdown">
              <Link to="/profile">Profile</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
