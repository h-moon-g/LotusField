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
      <div id="home-deck-div">
        <NavLink
          id="home-deck-card"
          key={deck.id}
          exact
          to={`decks/${deck.id}`}
        >
          <div id="home-deck-text">
            <p>{deck.username}</p>
            <p>{deck.name}</p>
          </div>
          <div id="home-img-div">
            <img src={deck.coverImageUrl} />
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div>
      <div id="home-text">
        <h1>Ready. Set. Brew.</h1>
        <h2>We are a deck building website for Magic: the Gathering.</h2>
      </div>
      <div id="home-map-text">
        <h3>Explore all decks</h3>
      </div>
      <div id="home-map-wrap">{deckDisplay}</div>
    </div>
  );
}
