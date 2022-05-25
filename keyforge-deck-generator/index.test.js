// for details on "test" see https://jestjs.io/docs/api#testname-fn-timeout

const createDeck = require('./index');

test('it creates a deck name', () => {
  const deck = createDeck();
  expect(deck.name).toBeTruthy();
});

test('it creates three houses', () => {
  const deck = createDeck();
  expect(deck.houses).toHaveLength(3);
});

test('it creates 36 cards', () => {
  const deck = createDeck();
  expect(deck.cards).toHaveLength(36);
});

test('it creates 12 cards of each house', () => {
  const deck = createDeck();

  // a map of a house to its cards
  // e.g.
  //   { "brobnar": [{ "name": "Anger", ... }, { "name": "Smash", ... }, ...] }  
  const houseMap = {};
  for (const house of deck.houses) {
    houseMap[house] = []
  }

  for (const card of deck.cards) {
    const house = card.house;
    houseMap[house].push(card);
  }

  for (const house of deck.houses) {
    expect(houseMap[house]).toHaveLength(12);
  }
});

test('includes at least two rares in the deck', () => {
  const deck = createDeck();
  let rarityCount = 0;

  for (const card of deck.cards) {
    if (card.rarity == "Rare") {
      rarityCount ++;
    }
  }
  expect(rarityCount).toBeGreaterThan(1);
});

test('doesnt create more than 4 rares in one house', () => {
  const deck = createDeck();
  const raresInEachHouse = {};
  for (const house of deck.houses) {
    raresInEachHouse[house] = [];
  }

  for (const card of deck.cards) {
    if (card.rarity === "Rare") {
      raresInEachHouse[card.house].push(card);
    }
  }

  for (const house of deck.houses) {
    expect(raresInEachHouse[house].length).toBeLessThan(5);
  }
});


test('doesnt create more than 8 uncommons in one house', () => {
  const deck = createDeck();
  const uncommonsInEachHouse = {};
  for (const house of deck.houses) {
    uncommonsInEachHouse[house] = [];
  }

  for (const card of deck.cards) {
    if (card.rarity === "Uncommon") {
      uncommonsInEachHouse[card.house].push(card);
    }
  }

  for (const house of deck.houses) {
    expect(uncommonsInEachHouse[house].length).toBeLessThan(9);
  }
});