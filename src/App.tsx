// App.tsx
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "636n0k53unhepedavb4n0to27g"; // Your Cognito App Client ID
    const logoutUri = "https://example.com"; // Replace with your actual logout redirect URI
    const cognitoDomain = "https://<user pool domain>"; // Replace with your Cognito User Pool domain
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Display loading state while authentication is being checked
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Display error message if authentication fails
  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  // Display user information if authenticated
  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  // Display sign-in and sign-out buttons if not authenticated
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;