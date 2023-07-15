import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import { modalLoginStyle } from "../styles/ModalLogin"

const LogoutButton = () => {
  const { logout } = useAuth0();
  const classes = modalLoginStyle();

  return (
    <Button
      className={classes.logoutBtn} 
      sx={{
        marginRight: '45px'
      }}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      variant="outlined"
      color="error"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;