const ALL_DECKS = "decks/getDecks";
const ADD_DECK = "decks/createDeck";

// action creators

export const getAllDecks = (decks) => {
  return {
    type: ALL_DECKS,
    decks,
  };
};

export const createDeck = (newDeckAndCard) => {
  return {
    type: ADD_DECK,
    newDeckAndCard,
  };
};

// thunks

export const ThunkCreateDeck = (formData) => async (dispatch) => {
  const res = await fetch(`/api/decks/new`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const newDeckAndCard = await res.json();
    await dispatch(createDeck(newDeckAndCard));
    return newDeckAndCard;
  } else {
    const data = await res.json();
    return data;
  }
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
    case ADD_DECK:
      return {
        ...state,
        [action.newDeckAndCard.deck.id]: action.newDeckAndCard.deck,
        [action.newDeckAndCard.card.id]: action.newDeckAndCard.card,
      };
    default:
      return state;
  }
};

export default deckReducer;
