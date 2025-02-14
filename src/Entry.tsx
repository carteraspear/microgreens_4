import React from "react";
import { useAuth } from "react-oidc-context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css";

interface EntryProps {
  auth: ReturnType<typeof useAuth>;
}

const Entry: React.FC<EntryProps> = ({ auth }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="topBar">
        <button className="button" onClick={() => navigate("/profile")}>
          Profile
        </button>
        <input type="text" placeholder="Search..." className="searchInput" />
        <button className="button" onClick={() => navigate("/settings")}>
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="mainContent">
        <Outlet /> {/* This will render the nested routes (e.g., Neighbors, Posts, etc.) */}
      </div>

      {/* Bottom Bar */}
      <div className="bottomBar">
        <button className="bottomButton" onClick={() => navigate("/")}>
          Neighbors
        </button>
        <button className="bottomButton" onClick={() => navigate("/posts")}>
          Posts
        </button>
        <button className="bottomButton" onClick={() => navigate("/map")}>
          Map
        </button>
        <button className="bottomButton" onClick={() => navigate("/favorites")}>
          Favorites
        </button>
        <button className="bottomButton" onClick={() => navigate("/messages")}>
          Messages
        </button>
      </div>
    </div>
  );
};

export default Entry;