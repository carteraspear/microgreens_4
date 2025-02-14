import React from "react";
import { useAuth } from "react-oidc-context";

interface EntryProps {
  auth: ReturnType<typeof useAuth>; // Use the return type of useAuth
  signOutRedirect: () => void;
}

const Entry: React.FC<EntryProps> = ({ auth, signOutRedirect }) => {
  return (
    <div>
      <pre> Hello: {auth.user?.profile.email} </pre>
      <pre> ID Token: {auth.user?.id_token} </pre>
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>

      <button onClick={() => auth.removeUser()}>Sign out</button>
      <button onClick={signOutRedirect}>Sign out with redirect</button>
    </div>
  );
};

export default Entry;