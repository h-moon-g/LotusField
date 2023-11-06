import { updateDeck } from "./decks";

const ALL_CARDS = "cards/getCards";
const ADD_CARD = "cards/createCard";
const UPDATE_CARD = "cards/updateCard";

// action creators

export const getAllCards = (cards) => {
  return {
    type: ALL_CARDS,
    cards,
  };
};

export const createCard = (card) => {
  return {
    type: ADD_CARD,
    card,
  };
};

export const updateCard = (card) => {
  return {
    type: UPDATE_CARD,
    card,
  };
};

// thunks

export const ThunkAddCardToDBAndDeck = (formData) => async (dispatch) => {
  const res = await fetch(`/api/cards/add`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateDeck(data.deck));
    await dispatch(createCard(data.card));
    return data.deck;
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkAddCardToDeck = (formData) => async (dispatch) => {
  const res = await fetch(`/api/cards/update`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateDeck(data.deck));
    await dispatch(updateCard(data.card));
    return data.deck;
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkRemoveCard = (cardId, deckId) => async (dispatch) => {
  const res = await fetch(`/api/cards/${deckId}/${cardId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateDeck(data.deck));
    await dispatch(updateCard(data.card));
    return data.deck;
  } else {
    const data = await res.json();
    return data;
  }
};

// reducer

const initialState = {};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CARDS:
      const cardsObj = {};
      action.cards.forEach((card) => {
        cardsObj[card.id] = card;
      });
      return cardsObj;
    case ADD_CARD:
      return { ...state, [action.card.id]: action.card };
    case UPDATE_CARD:
      return { ...state, [action.card.id]: action.card };
    default:
      return state;
  }
};

export default cardReducer;
