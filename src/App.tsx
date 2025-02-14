import { useAuth } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entry from "./Entry";
import Neighbors from "./Neighbors";
import Posts from "./Posts";
import Map from "./Map";
import Favorites from "./Favorites";
import Messages from "./Messages";
import Settings from "./Settings";
import Profile from "./Profile";

function App() {
  const auth = useAuth();

  // Display loading state while authentication is being checked
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Display error message if authentication fails
  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  // Redirect to Entry component if authenticated
  if (auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Entry auth={auth} />}>
            <Route index element={<Neighbors />} /> {/* Default page */}
            <Route path="posts" element={<Posts />} />
            <Route path="map" element={<Map />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    );
  }

  // Display sign-in button if not authenticated
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;