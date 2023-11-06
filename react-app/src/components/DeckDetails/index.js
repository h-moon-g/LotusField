import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./DeckDetails.css";
import { getAllDecks } from "../../store/decks";
import { getAllCards } from "../../store/cards";
import { getAllComments } from "../../store/comments";
import fetchAll from "../utils";
import { ThunkAddCardToDBAndDeck } from "../../store/cards";
import { ThunkAddCardToDeck } from "../../store/cards";
import { ThunkRemoveCard } from "../../store/cards";
import OpenModalButton from "../OpenModalButton/index";
import UpdateDeckModal from "../UpdateDeckModal";

export default function DeckDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.session.user);
  const decks = useSelector((state) => state.decks);
  const cards = useSelector((state) => state.cards);

  const [addCard, setAddCard] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const currentDeck = decks[id];

  if (!currentDeck) {
    fetchAll(dispatch, getAllDecks, getAllCards, getAllComments);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let apiFetch = await fetch(
      `https://api.scryfall.com/cards/named?exact=${addCard}`
    );
    let apiCard = await apiFetch.json();
    if (apiCard?.name) {
      const cardInLocalDB = Object.values(cards).find(
        (card) => card.name === apiCard?.name
      );
      if (cardInLocalDB) {
        const cardInCurrentDeck = currentDeck.cardsInDeck.find(
          (card) => card === cardInLocalDB.id
        );
        if (cardInCurrentDeck) {
          setErrors({ addCard: "Card already in deck!" });
          return null;
        }
        formData.append("card_id", cardInLocalDB.id);
        formData.append("deck_id", currentDeck.id);
        let data = await dispatch(ThunkAddCardToDeck(formData));
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setAddCard("");
        }
      } else {
        const borderImage = apiCard.image_uris.border_crop;
        let borderFile = null;
        await fetch(`${borderImage}`)
          .then((res) => res.blob())
          .then((myBlob) => {
            borderFile = new File([myBlob], "border_image.jpeg", {
              type: myBlob.type,
            });
          });
        formData.append("card_image_url", borderFile);
        formData.append("color_identity", apiCard.color_identity.join(""));
        formData.append("card_name", apiCard.name);
        formData.append("type", apiCard.type_line);
        formData.append("deck_id", currentDeck.id);
        let data = await dispatch(ThunkAddCardToDBAndDeck(formData));
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setAddCard("");
        }
      }
    } else {
      setErrors({ addCard: "Invalid cardname!" });
      return null;
    }
  };

  const handleCardDelete = async (id) => {
    console.log(id);
    let data = await dispatch(ThunkRemoveCard(id, currentDeck.id));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  let cardDisplay = null;

  const cardsInDeckArray = [];
  if (currentDeck) {
    for (let cardId of currentDeck.cardsInDeck) {
      cardsInDeckArray.push(cards[cardId]);
    }
  }
  cardDisplay = cardsInDeckArray.map((card) => {
    if (card?.id !== currentDeck.commanderId) {
      return (
        <div>
          <img src={card?.imageUrl} alt={`Cover for ${card?.name}`} />
          <button onClick={(e) => handleCardDelete(card?.id)}>
            Remove card from deck
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <img src={card?.imageUrl} alt={`Cover for ${card?.name}`} />
        </div>
      );
    }
  });

  let deckOptions = null;
  if (user?.id === currentDeck?.userId) {
    deckOptions = (
      <div>
        <div>
          <OpenModalButton
            buttonText="Update Deck"
            modalComponent={<UpdateDeckModal id={id} />}
          />
          <button>Delete deck</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Add a card!
            <input
              type="text"
              value={addCard}
              onChange={(e) => setAddCard(e.target.value)}
            />
          </label>
          {errors.addCard && <p>{errors.addCard}</p>}
          <button type="submit">Add card</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>{currentDeck?.name}</h1>
      <p>{currentDeck?.description}</p>
      {deckOptions}
      {cardDisplay}
    </div>
  );
}
