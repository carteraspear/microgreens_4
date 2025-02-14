import { useState } from "react";
import { useAuth } from "react-oidc-context";
import Entry from "./Entry";

function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState("neighbors"); // Default page

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
      <Entry
        auth={auth} // Now correctly passed as a prop
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
