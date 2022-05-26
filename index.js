const createDeck = require('./keyforge-deck-generator');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/generate-deck', (req, res) => {
    const requestedDeck = createDeck();
    res.json(requestedDeck);
})

app.get('/api/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      client.release();

      const results = { 'results': (result) ? result.rows : null};
      res.json(results);

    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
})


app.listen(port, () => {
    console.log(`Waiting for decks to be requested on port ${port}`);
})
