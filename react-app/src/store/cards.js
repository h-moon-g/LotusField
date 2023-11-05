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

export const ThunkAddCard = (formData) => async (dispatch) => {
  // const res = await fetch(`/api/decks/add/card`, {
  //   method: "POST",
  //   body: formData,
  // });
  // if (res.ok) {
  //   const data = await res.json();
  //   if (data.local === "nope") {
  //     await dispatch(createDeck(data.deck));
  //     await dispatch(createCard(data.card));
  //     await dispatch(setUser(data.user));
  //     return data.deck;
  //   } else if (data.local === "yup") {
  //     await dispatch(createDeck(data.deck));
  //     await dispatch(updateCard(data.card));
  //     await dispatch(setUser(data.user));
  //     return data.deck;
  //   }
  // } else {
  //   const data = await res.json();
  //   return data;
  // }
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
