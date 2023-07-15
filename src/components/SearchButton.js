import React from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const SearchButton = React.memo(({ onClick }) => {
  return (
    <IconButton color="primary" aria-label="Enviar" sx={{
      '&:hover': {
        backgroundColor: '#453421',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(-2px)',
      },
      transition: 'all 0.3s ease-in',
    }} onClick={onClick}>
      <SendIcon />
    </IconButton>
  );
});

export default SearchButton;