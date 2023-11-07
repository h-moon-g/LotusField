import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { getAllDecks } from "../../store/decks";
import { getAllCards } from "../../store/cards";
import { getAllComments } from "../../store/comments";
import fetchAll from "../utils";

export default function Home() {
  const user = useSelector((state) => state.session.user);
  const decks = useSelector((state) => state.decks);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAll(dispatch, getAllDecks, getAllCards, getAllComments);
  }, []);

  const decksArray = Object.values(decks);

  if (!decksArray.length) {
    return null;
  }

  const deckDisplay = decksArray.map((deck) => {
    return (
      <div>
        <p>{deck.username}</p>
        <p>{deck.name}</p>
        <NavLink key={deck.id} exact to={`decks/${deck.id}`}>
          <div>
            <img src={deck.coverImageUrl} />
          </div>
        </NavLink>
      </div>
    );
  });

  return <div>{deckDisplay}</div>;
}
