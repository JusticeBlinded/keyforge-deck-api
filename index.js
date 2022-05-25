const createDeck = require('./keyforge-deck-generator');
const express = require('express');
const app = express();
const port = env.PORT || 3000;

app.get('/generate-deck', (req, res) => {
    const requestedDeck = createDeck();
    res.json(requestedDeck);
})

app.listen(port, () => {
    console.log(`Waiting for decks to be requested on port ${port}`);
})