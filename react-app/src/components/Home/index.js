import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { getAllDecks } from "../../store/decks";
import { getAllCards } from "../../store/cards";
import { getAllComments } from "../../store/comments";
import fetchAll from "../utils";

// Features Coming Soon...
// More expansive search such as...
// Autofilled results
// Search by card color, type, cost and more
// Better form and comment ui
// Mobile view
// Include card price with options to add to cart with option to buy singles or decks
// Your decks section
// Liked decks section
// Select format to add decks from more than commander
// More rules checking to check legality of decks
// Show stats about decks such as average CMC, deck price, amount of lands. etc
// ... and more!

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
      <div className="home-map-text">
        <h3>Explore all decks</h3>
      </div>
      <div id="home-map-wrap">{deckDisplay}</div>
    </div>
  );
}
