import CookieConsent from "react-cookie-consent";
import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import AuthenticationButton from './components/buttons/Auth';

const SearchPage = lazy(() => import('./components/SearchPage'));
const Search = lazy(() => import('./components/Search'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <AuthenticationButton />
              <SearchPage />
            </>
          } />
          <Route path="/search" element={
            <>
              {/* <AuthenticationButton /> */}
              <Search />
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent cookieName="HookahFinderCookie" enableDeclineButton buttonText="Accept All" declineButtonText="Reject All" overlay>This website uses cookies to enhance the user experience.</CookieConsent>
      </Router>
    </ThemeProvider>
  );
}

export default App;