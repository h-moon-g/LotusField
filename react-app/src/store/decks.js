import { setUser } from "./session";
import { createCard } from "./cards";
import { updateCard } from "./cards";

const ALL_DECKS = "decks/getDecks";
const ADD_DECK = "decks/createDeck";

// action creators

export const getAllDecks = (decks) => {
  return {
    type: ALL_DECKS,
    decks,
  };
};

export const createDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  };
};

// thunks

export const ThunkCreateDeck = (formData) => async (dispatch) => {
  const res = await fetch(`/api/decks/new`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    if (data.local === "nope") {
      await dispatch(createDeck(data.deck));
      await dispatch(createCard(data.card));
      await dispatch(setUser(data.user));
      return data.deck;
    } else {
      await dispatch(createDeck(data.deck));
      await dispatch(updateCard(data.card));
      await dispatch(setUser(data.user));
      return data.deck;
    }
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
        [action.deck.id]: action.deck,
      };
    default:
      return state;
  }
};

export default deckReducer;
