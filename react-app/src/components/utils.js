const fetchAll = (dispatch, getAllDecks, getAllCards, getAllComments) => {
  fetch("/api/all")
    .then((res) => res.json())
    .then((data) => {
      dispatch(getAllDecks(data.decks));
      dispatch(getAllCards(data.cards));
      dispatch(getAllComments(data.comments));
    });
};

export default fetchAll;
