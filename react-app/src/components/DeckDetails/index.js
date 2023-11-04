import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./DeckDetails.css";
import { getAllDecks } from "../../store/decks";
import { getAllCards } from "../../store/cards";
import { getAllComments } from "../../store/comments";
import fetchAll from "../utils";

export default function DeckDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.session.user);
  const decks = useSelector((state) => state.decks);
  const cards = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  const currentDeck = decks[id];

  useEffect(() => {
    fetchAll(dispatch, getAllDecks, getAllCards, getAllComments);
  }, [user.userDecks]);

  if (!currentDeck) {
    fetchAll(dispatch, getAllDecks, getAllCards, getAllComments);
  }

  const cardsInDeckArray = [];

  if (currentDeck) {
    for (let cardId of currentDeck.cardsInDeck) {
      cardsInDeckArray.push(cards[cardId]);
    }
  }

  let deckOptions = null;
  if (user?.id === currentDeck?.userId) {
    deckOptions = (
      <div>
        <button>Update deck</button>
        <button>Delete deck</button>
      </div>
    );
  }

  const cardDisplay = cardsInDeckArray.map((card) => {
    return (
      <div>
        <img src={card?.imageUrl} alt={`Cover for ${card?.name}`} />
      </div>
    );
  });

  return (
    <div>
      <h1>{currentDeck?.name}</h1>
      <p>{currentDeck?.description}</p>
      {deckOptions}
      {cardDisplay}
    </div>
  );
}
