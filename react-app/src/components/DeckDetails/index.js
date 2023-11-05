import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./DeckDetails.css";
import { getAllDecks } from "../../store/decks";
import { getAllCards } from "../../store/cards";
import { getAllComments } from "../../store/comments";
import fetchAll from "../utils";
import { ThunkAddCard } from "../../store/cards";

export default function DeckDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.session.user);
  const decks = useSelector((state) => state.decks);
  const cards = useSelector((state) => state.cards);

  const [addCard, setAddCard] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    const cardInLocalDB = Object.values(cards).find(
      (card) => card.name === addCard
    );
    if (cardInLocalDB) {
      formData.append("local_card_id", cardInLocalDB.id);
      formData.append("local_card", "yup");
    } else {
      let apiFetch = await fetch(
        `https://api.scryfall.com/cards/named?exact=${addCard}`
      );
      let apiCard = await apiFetch.json();
      if (
        apiCard?.type_line &&
        apiCard?.type_line.slice(0, 18) === "Legendary Creature"
      ) {
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
        formData.append("local_card", "nope");
      } else if (
        apiCard?.type_line &&
        !(apiCard?.type_line.slice(0, 18) === "Legendary Creature")
      ) {
        setErrors({ commander: "Commanders must be legendary creatures!" });
        return null;
      } else {
        setErrors({ commander: "Invalid cardname!" });
        return null;
      }
    }
    let data = await dispatch(ThunkAddCard(formData));
    if (data?.errors) {
      setErrors(data.errors);
    }
  };

  const dispatch = useDispatch();

  const currentDeck = decks[id];

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
        <div>
          <button>Update deck</button>
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
