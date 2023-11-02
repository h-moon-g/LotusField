const ALL_CARDS = "cards/getCards";

// action creators

export const getAllCards = (cards) => {
  return {
    type: ALL_CARDS,
    cards,
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
    default:
      return state;
  }
};

export default cardReducer;
