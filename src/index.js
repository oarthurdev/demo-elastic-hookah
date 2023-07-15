import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { AppLoader } from './components/loader/AppLoader';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { ErrorPage } from './components/error-boundary/ErrorPage';

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ik7ghl8q.us.auth0.com"
      clientId="xhz6RvVB3e4WGAm07UdHdVvwelXXF8Th"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<AppLoader />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
