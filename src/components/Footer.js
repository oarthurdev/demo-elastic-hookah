import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { COPYRIGHT_STRING } from '../utils/constants';
import Box from '@mui/material/Box';

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60 * 24); // update once per day
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box component="footer">
      <Typography variant="body2" 
                  color="text.secondary" 
                  align="center" 
                  rel="noopener noreferrer"
                  title={`${currentYear} ${COPYRIGHT_STRING}`}>  

        {`${currentYear} © ${COPYRIGHT_STRING}`}
      </Typography>
    </Box>
  );
}

export default Footer;  