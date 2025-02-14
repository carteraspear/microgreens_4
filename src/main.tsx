import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import './App.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_XohcmASr2',
  client_id: '636n0k53unhepedavb4n0to27g',
  redirect_uri: 'https://main.d1h95fg007nwlm.amplifyapp.com/', // Replace with your actual redirect URI
  response_type: 'code',
  scope: 'aws.cognito.signin.user.admin email openid phone profile',
};

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);