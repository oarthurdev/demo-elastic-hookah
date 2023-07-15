import { useCallback, useState, useEffect, useMemo } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import loadImage from '../utils/loadImage';
import { debounce } from 'lodash';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();
  const cachedImage = useMemo(() => loadImage('/narg-logo.png'), []);
  const navigate = useNavigate();
   // Define o valor inicial do state searchTerm com base no 'q' na URL
   useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchTerm(decodeURIComponent(params.get('q')));
    }
  }, [location]);

  const validatedSearchTerm = useMemo(() => searchTerm.replace(/[^\w\s]/gi, ''), [searchTerm])

  // Define o valor inicial do state searchTerm com base no 'q' na URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchTerm(decodeURIComponent(params.get('q')));
    }
  }, [location]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    debounce(() => {
      if (validatedSearchTerm.trim() !== '') {
        setResults([
          { title: 'Resultado 1', description: 'Descrição do resultado 1', link: 'https://www.google.com', image: 'https://images.tcdn.com.br/img/img_prod/421417/narguile_amazon_future_pride_55cm_dourado_wood_rosh_amazon_mangueira_helix_piteira_e_prato_aluminio__7427_3_c360dbcc63110921acd2aa34f70deb8a.jpeg' },
          { title: 'Resultado 2', description: 'Descrição do resultado 2', link: 'https://www.google.com', image: 'https://images.tcdn.com.br/img/img_prod/421417/narguile_amazon_future_pride_55cm_dourado_wood_rosh_amazon_mangueira_helix_piteira_e_prato_aluminio__7427_3_c360dbcc63110921acd2aa34f70deb8a.jpeg' } ,
          { title: 'Resultado 3', description: 'Descrição do resultado 3', link: 'https://www.google.com', image: 'https://images.tcdn.com.br/img/img_prod/421417/narguile_amazon_future_pride_55cm_dourado_wood_rosh_amazon_mangueira_helix_piteira_e_prato_aluminio__7427_3_c360dbcc63110921acd2aa34f70deb8a.jpeg' } ,
        ]);
        navigate(`/search?q=${encodeURIComponent(validatedSearchTerm)}`);
      }
    }, 500),
    [searchTerm, navigate]
  );


  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <a href='/'>
          <img src={cachedImage.src} alt="Hookah Finder Logo" height={62} width={62} />
        </a>
        <Box ml={2} flexGrow={1}>
          <TextField
            id="search-input"
            placeholder="Pesquisar no Hookah Finder"
            sx={{
              width: "40%"
            }}
            variant="outlined"
            size="medium"
            value={searchTerm}
            onKeyPress={(event) => event.key === 'Enter' && handleSearchSubmit()}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearchSubmit}>
                  <SearchIcon />
                </IconButton>
              ),
              inputProps: {
                maxLength: 100 // example value
              }
            }}
          />
        </Box>
      </Box>
      <SearchResults results={results} />
    </Box>
  );
}

export default Search;