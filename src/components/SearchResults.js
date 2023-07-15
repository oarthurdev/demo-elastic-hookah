import { Box, Typography, Button } from '@mui/material';

function SearchResults(props) {
  const { results } = props;

  return (
    <Box sx={{ mt: 4 }} style={{ textAlign: 'center' }}>
      {results.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Resultados da pesquisa:
          </Typography>
          {results.map((result, index) => (
            <Box key={result.id} mb={2}>
              <Typography variant="subtitle1">
                <a href={result.link}>{result.title}</a>
              </Typography>
              {result.image && (
                <Box mt={1}>
                  <a href={result.link}>
                    <img src={result.image} alt={result.title} width={150} height={100} />
                  </a>
                </Box>
              )}
              <Typography variant="body2">{result.description}</Typography>
              <Box mt={1}>
                <Typography variant="caption">{result.date}</Typography>
                <Typography variant="caption" sx={{ ml: 1 }}>{result.author}</Typography>
              </Box>
            </Box>
          ))}
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary">
              Carregar mais resultados
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" justifyContent="center" gutterBottom>
            Nenhum resultado encontrado
        </Typography>
      )}
    </Box>
  );
}

export default SearchResults;