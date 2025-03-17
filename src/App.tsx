import { useState } from "react";
import { useAuth } from "react-oidc-context";
import Entry from "./Entry";
import styles from "./App.module.css"; 

function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState("neighbors"); 

  // display loading state while authentication is being checked
  if (auth.isLoading) {
    return (
      <div className={styles.loadingContainer}> {}
        <h1 className={styles.welcomeText}>Welcome to Microgreens</h1>
        <div>Loading...</div>
      </div>
    );
  }

  // display error message if authentication fails
  if (auth.error) {
    return (
      <div className={styles.errorContainer}> {}
        <h1 className={styles.welcomeText}>Welcome to Microgreens</h1>
        <div>Encountering error... {auth.error.message}</div>
      </div>
    );
  }

  // redirect to entry if auth'd
  if (auth.isAuthenticated) {
    return (
      <Entry
        auth={auth} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  // display sign-in button if not authenticated
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
