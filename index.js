// load the .env file into process.env
require('dotenv').config();

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

app.get('/api/generate-deck', async (req, res) => {
    const requestedDeck = createDeck();

    try {
        const insertDeckInfo = `
            INSERT INTO
                decks (id, name, set, house1, house2, house3)
            VALUES
                (DEFAULT, $1, $2, $3, $4, $5)
            RETURNING id
        `;
        const deckInsertResponse = await pool.query(insertDeckInfo, [requestedDeck.name, requestedDeck.code, requestedDeck.houses[0], requestedDeck.houses[1], requestedDeck.houses[2]]);

        let deckID;

        if (deckInsertResponse.rows.length) {
            deckID = deckInsertResponse.rows[0].id;
        } else {
            res.send('Error ' + err);
            return
        }

        const cards = requestedDeck.cards;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            const cardQuery = `
                INSERT INTO
                    cards (id, deck_id, name, house, card_text, image_link)
                VALUES
                    (DEFAULT, $1, $2, $3, $4, $5)
            `;

            await pool.query(cardQuery, [deckID, cards[i].name, cards[i].house, cards[i].text, cards[i].image]);
        }
        
    } catch (err) {
        console.error(err);
        res.send('Error ' + err);
        return;
    }

    res.json(requestedDeck);
})

app.get('/api/db', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM test_table');
      
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);

    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
})

app.get('/api/decks', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM decks');
      
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);

    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
})

app.get('/api/cards', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM cards');
      
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
