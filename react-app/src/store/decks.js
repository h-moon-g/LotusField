import { setUser } from "./session";
import { createCard } from "./cards";
import { updateCard } from "./cards";

const ALL_DECKS = "decks/getDecks";
const ADD_DECK = "decks/createDeck";
const UPDATE_DECK = "decks/updateDeck";
const DELETE_DECK = "decks/deleteDeck";

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

export const updateDeck = (deck) => {
  return {
    type: UPDATE_DECK,
    deck,
  };
};

export const deleteDeck = (id) => {
  return {
    type: DELETE_DECK,
    id,
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

export const ThunkUpdateDeckNotLocal = (formData) => async (dispatch) => {
  const res = await fetch(`/api/decks/update/new`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(createCard(data.card));
    await dispatch(updateDeck(data.deck));
    return data.deck;
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkUpdateDeckNoCover = (formData) => async (dispatch) => {
  const res = await fetch(`/api/decks/update/local/nocover`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    if (data.card_in_deck === "yup") {
      await dispatch(updateDeck(data.deck));
      return data.deck;
    } else {
      await dispatch(updateCard(data.card));
      await dispatch(updateDeck(data.deck));
      return data.deck;
    }
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkUpdateDeckHasCover = (formData) => async (dispatch) => {
  const res = await fetch(`/api/decks/update/local/hascover`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    if (data.card_in_deck === "yup") {
      await dispatch(updateDeck(data.deck));
      return data.deck;
    } else {
      await dispatch(updateCard(data.card));
      await dispatch(updateDeck(data.deck));
      return data.deck;
    }
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkDeleteDeck = (id) => async (dispatch) => {
  const res = await fetch(`/api/decks/${id}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteDeck(id));
    dispatch(setUser(data.user));
    return data;
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
    case UPDATE_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    case DELETE_DECK:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default deckReducer;
