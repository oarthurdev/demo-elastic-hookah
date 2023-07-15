require('dotenv').config();
const { Client } = require('pg');
const { Client: ElasticsearchClient } = require('@elastic/elasticsearch');

// PostgreSQL configuration
const pgConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

// Elasticsearch configuration
const elasticsearchConfig = {
  node: process.env.ELASTIC_URL,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  },
};

// Create PostgreSQL and Elasticsearch clients
const pgClient = new Client(pgConfig);
const esClient = new ElasticsearchClient(elasticsearchConfig);

// Fetch image data from PostgreSQL and upload to Elasticsearch
async function uploadImages() {
  try {
    // Connect to PostgreSQL
    await pgClient.connect();

    // Query the image data from the database
    const query = `SELECT id, image FROM "Product"`; // Replace 'your_table' with your actual table name
    const result = await pgClient.query(query);
    const rows = result.rows;

    // Upload each document to Elasticsearch
    for (const row of rows) {
      const { id, image } = row;

      // Create the Elasticsearch document with the image data
      const document = {
        id,
        image, // Assuming 'image' is a base64-encoded string
      };

      // Index the document in Elasticsearch
      await esClient.index({
        index: 'product',
        body: document,
      });

      console.log(`Uploaded document with id: ${id}`);
    }

    console.log('Image upload completed!');
  } catch (error) {
    console.error('Error uploading images:', error);
  } finally {
    // Close the PostgreSQL connection
    await pgClient.end();

    // Close the Elasticsearch connection
    await esClient.close();
  }
}

uploadImages();
