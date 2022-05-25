const cardList = require('./sets-truncated/cota-truncated.json');
const tempCardArray = cardList.cards;
let deck = [];

const getRandomHouses = () => {
    
    const output = [];

    const houseChoices = ['brobnar', 'logos', 'sanctum', 'shadows', 'dis', 'mars', 'untamed'];

    for (let i = 0; i < 3; i++) {
        const n = Math.floor(Math.random() * houseChoices.length);
        output.push(houseChoices[n]);

        // delete the chosen house
        houseChoices.splice(n, 1);
    }

    return output;
} 

const getRandomCard = (house, rarity) => {
    const cardsByHouse = tempCardArray.filter(card => card.house == house);
    const cardsByHouseAndRarity = cardsByHouse.filter(card => card.rarity == rarity);
    const chosenCardNumber = Math.floor(Math.random() * (cardsByHouseAndRarity.length - 1));
    const chosenCard = cardsByHouseAndRarity[chosenCardNumber];
    return chosenCard;
}

const getDeckName = () => {
    if (Math.random() <= 0.5) {
        return `The ${getRandomNoun()} of ${getRandomNoun()}`;
    } else {
        return `${getRandomName()}, the ${getRandomNoun()} of ${getRandomNoun()}`;
    }    
}

const getRandomNoun = () => {
    const listOfNouns = ['birthday', 'wax', 'wire', 'explosions', 'rhythm', 'trains', 'sticks', 'division', 'corruption', 'frame', 'wish', 'sugar'];
    chosenNoun = Math.floor(Math.random() * listOfNouns.length);
    return listOfNouns[chosenNoun];
}

const getRandomName = () => {
    const listOfNames = ['Grant', 'Erich', 'Dave', 'Phil', 'Z', 'Joe', 'Dunkoro', 'Devin', 'George', 'Brooks'];
    chosenName = Math.floor(Math.random() * listOfNames.length);
    return listOfNames[chosenName];
}

const createDeck = () => {

    const deck = {
      name: '',
      houses: [], // contains the string name of each house
      cards: [], // contains objects representing each card
    }

    deck.houses = getRandomHouses();
    deck.name = getDeckName();
    
    for (let j = 0; j < 3; j++) {
        
        const numOfRares = 1 + Math.floor(Math.random() * 3);
        const numOfUncommons = Math.floor(Math.random() * 5);
        const numOfCommons = 12 - numOfRares - numOfUncommons;
        
        for (let i = 0; i < numOfRares; i++) {
            let cardPull = getRandomCard(deck.houses[j], 'Rare');
            deck.cards.push(cardPull);
        }        
        
        for (let i = 0; i < numOfUncommons; i++) {
            let cardPull = getRandomCard(deck.houses[j], 'Uncommon');
            deck.cards.push(cardPull);
        }

        for (let i = 0; i < numOfCommons; i++) {
            let cardPull = getRandomCard(deck.houses[j], 'Common');
            deck.cards.push(cardPull);
        }

    }
    return deck;
}
  
module.exports = createDeck;