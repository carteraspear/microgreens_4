import React from "react";
import { AuthContextProps } from "react-oidc-context";
import "./App.css";

import Neighbors from "./Neighbors";
import Posts from "./Posts";
import MapPage from "./MapPage";
import Favorites from "./Favorites";
import Messages from "./Messages";
import Settings from "./Settings";
import Profile from "./Profile";

interface EntryProps {
  auth: AuthContextProps;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Entry: React.FC<EntryProps> = ({ auth, currentPage, setCurrentPage }) => {
  console.log(auth); // Ensures 'auth' is used to prevent TS warnings

  const renderPage = () => {
    switch (currentPage) {
      case "neighbors":
        return <Neighbors />;
      case "posts":
        return <Posts />;
      case "map":
        return <MapPage />;
      case "favorites":
        return <Favorites />;
      case "messages":
        return <Messages />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <Neighbors />;
    }
  };

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="topBar">
        <button className="button" onClick={() => setCurrentPage("profile")}>
          Profile
        </button>
        <input type="text" placeholder="Search..." className="searchInput" />
        <button className="button" onClick={() => setCurrentPage("settings")}>
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="mainContent">{renderPage()}</div>

      {/* Bottom Bar */}
      <div className="bottomBar">
        <button
          className={`bottomButton ${currentPage === "neighbors" ? "active" : ""}`}
          onClick={() => setCurrentPage("neighbors")}
        >
          Neighbors
        </button>
        <button
          className={`bottomButton ${currentPage === "posts" ? "active" : ""}`}
          onClick={() => setCurrentPage("posts")}
        >
          Posts
        </button>
        <button
          className={`bottomButton ${currentPage === "map" ? "active" : ""}`}
          onClick={() => setCurrentPage("map")}
        >
          Map
        </button>
        <button
          className={`bottomButton ${currentPage === "favorites" ? "active" : ""}`}
          onClick={() => setCurrentPage("favorites")}
        >
          Favorites
        </button>
        <button
          className={`bottomButton ${currentPage === "messages" ? "active" : ""}`}
          onClick={() => setCurrentPage("messages")}
        >
          Messages
        </button>
      </div>
    </div>
  );
};

export default Entry;
