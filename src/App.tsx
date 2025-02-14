import { useAuth } from "react-oidc-context";
import Entry from "./Entry";

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
    return <Entry auth={auth} />; // No longer passing signOutRedirect
  }

  // Display sign-in button if not authenticated
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;