const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const apiKey = process.env.ELASTIC_API_KEY;
const elasticUrl = process.env.ELASTIC_URL;
const indexName = process.env.ELASTIC_INDEX;

// Rota para realizar uma consulta no Elasticsearch
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q; // Parâmetro 'q' contendo a consulta
    const response = await axios.get(`${elasticUrl}${indexName}/_search`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${apiKey}`
      },
      params: {
        q: query
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar a consulta' });
  }
});

// Iniciar o servidor na porta desejada
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
