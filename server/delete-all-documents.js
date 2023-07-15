require('dotenv').config();
const axios = require('axios');

async function deleteAllDocuments() {
  const elasticUrl = process.env.ELASTIC_URL;
  const index = 'product';
  const apiKey = process.env.ELASTIC_API_KEY;

  try {
    const response = await axios.post(`${elasticUrl}${index}/_delete_by_query`, {
      query: {
        match_all: {},
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${apiKey}`,
      },
    });

    if (response.data.deleted) {
      console.log(`Deleted ${response.data.deleted} documents from the index.`);
    } else {
      console.log('No documents found to delete.');
    }
  } catch (error) {
    console.error('Error deleting documents:', error.response.data);
  }
}

deleteAllDocuments();
