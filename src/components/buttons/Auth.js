import React, { memo } from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated, user } = useAuth0();
  const name = user ? user.name : '';
  const picture = user ? user.picture : '';
  const email = user ? user.email : '';

  return (
   <>
      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <LoginButton />
      )}
      {isAuthenticated && (
        <img
          src={picture}
          alt={name}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginLeft: '10px',
            padding: '5px',
            float: 'right',
            marginTop: '5px'
          }}
        />
      )}
    </>
  );
};

export default memo(AuthenticationButton);