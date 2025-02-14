import React from "react";
import { useAuth } from "react-oidc-context";
import "./App.css"; // Import the CSS file

interface EntryProps {
  auth: ReturnType<typeof useAuth>;
  signOutRedirect: () => void;
}

const Entry: React.FC<EntryProps> = ({ auth, signOutRedirect }) => {
  return (
    <div className="container">
      {/* Top Bar */}
      <div className="topBar">
        <button className="button">Left Button</button>
        <input type="text" placeholder="Search..." className="searchInput" />
        <button className="button">Right Button</button>
      </div>

      {/* Main Content */}
      <div className="mainContent">
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()} className="button">
          Sign out
        </button>
        <button onClick={signOutRedirect} className="button">
          Sign out with redirect
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="bottomBar">
        <button className="bottomButton">Neighbors</button>
        <button className="bottomButton">Posts</button>
        <button className="bottomButton">Map</button>
        <button className="bottomButton">Favorites</button>
        <button className="bottomButton">Messages</button>
      </div>
    </div>
  );
};

export default Entry;