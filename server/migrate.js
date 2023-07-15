require('dotenv').config();
const { Client } = require('pg');
const axios = require('axios');

async function migrateData() {
  // Configuração do banco de dados PostgreSQL
  const pgConfig = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  };

  // Configuração do Elasticsearch
  const elasticConfig = {
    url: process.env.ELASTIC_URL,
    index: process.env.ELASTIC_INDEX,
  };

  // Conexão com o banco de dados PostgreSQL
  const pgClient = new Client(pgConfig);
  await pgClient.connect();

  try {
    // Consulta os dados do banco de dados PostgreSQL
    const query = `SELECT * FROM "Product"`; // Substitua "your_table" pelo nome da tabela que deseja migrar
    const result = await pgClient.query(query);
    const rows = result.rows;

    // Mapeia e formata os documentos para o formato aceito pelo Elasticsearch
    const documents = rows.map(row => ({
      index: {
        _index: elasticConfig.index,
        _id: row.id.toString(), // Substitua "id" pelo nome da coluna que contém o ID do documento
      },
    }));

    const config = {
      headers: {
        'Content-Type': 'application/x-ndjson',
        Authorization: `ApiKey ${process.env.ELASTIC_API_KEY}`,
      },
    };

    // Envia os documentos para o Elasticsearch
    const { data } = await axios.post(`${elasticConfig.url}/_bulk`, formatDataForBulk(documents, rows), config);

    // Verifica a resposta do Elasticsearch
    if (data.errors) {
      throw new Error(`Erro durante o upload dos documentos: ${JSON.stringify(data)}`);
    }

    console.log('Documentos migrados com sucesso para o Elasticsearch!');
  } catch (error) {
    console.error('Erro durante a migração dos documentos:', error);
  } finally {
    // Fecha a conexão com o banco de dados PostgreSQL
    await pgClient.end();
  }
}

// Formata os dados para o formato "bulk" aceito pelo Elasticsearch
function formatDataForBulk(documents, rows) {
  const bulkData = [];
  for (let i = 0; i < rows.length; i++) {
    bulkData.push(JSON.stringify(documents[i]));
    bulkData.push(JSON.stringify(rows[i]));
  }
  return bulkData.map(data => `${data}\n`).join('');
}

// Executa a migração dos dados
migrateData();
