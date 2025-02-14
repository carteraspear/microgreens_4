import { useState } from "react";
import { useAuth } from "react-oidc-context";
import Entry from "./Entry";
import styles from "./App.module.css"; // Import CSS as a module

function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState("neighbors"); // Default page

  // Display loading state while authentication is being checked
  if (auth.isLoading) {
    return (
      <div className={styles.loadingContainer}> {/* Use className */}
        <h1 className={styles.welcomeText}>Welcome to Microgreens</h1>
        <div>Loading...</div>
      </div>
    );
  }

  // Display error message if authentication fails
  if (auth.error) {
    return (
      <div className={styles.errorContainer}> {/* Use className */}
        <h1 className={styles.welcomeText}>Welcome to Microgreens</h1>
        <div>Encountering error... {auth.error.message}</div>
      </div>
    );
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
    <div className={styles.container}> {/* Use className */}
      <h1 className={styles.welcomeText}>Welcome to Microgreens</h1>
      <button className={styles.signInButton} onClick={() => auth.signinRedirect()}>
        Sign in
      </button>
    </div>
  );
}

export default App;
