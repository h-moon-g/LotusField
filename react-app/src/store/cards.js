const ALL_CARDS = "cards/getCards";
const ADD_CARD = "cards/createCard";

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
    default:
      return state;
  }
};

export default cardReducer;
