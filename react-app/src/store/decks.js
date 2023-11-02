const ALL_DECKS = "decks/getDecks";

// action creators

export const getAllDecks = (decks) => {
  return {
    type: ALL_DECKS,
    decks,
  };
};

// reducer

const initialState = {};
const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_DECKS:
      const decksObj = {};
      action.decks.forEach((deck) => {
        decksObj[deck.id] = deck;
      });
      return decksObj;
    default:
      return state;
  }
};

export default deckReducer;
