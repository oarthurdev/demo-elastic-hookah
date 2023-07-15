import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import LoginBtn from './buttons/Login';
import { modalLoginStyle } from './styles/ModalLogin';

function Header() {
  const [open, setOpen] = useState(false);
  const classes = modalLoginStyle();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginSubmit = (email, password) => {
    // Lógica de autenticação aqui
    handleClose();
  };

  return (
    <>
    </>
  );
}

export default Header;