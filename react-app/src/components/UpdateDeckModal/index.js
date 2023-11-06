import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./UpdateDeckModal.css";
import { ThunkUpdateDeckHasCover } from "../../store/decks";
import { ThunkUpdateDeckNoCover } from "../../store/decks";
import { ThunkUpdateDeckNotLocal } from "../../store/decks";

export default function UpdateDeck(id) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const cards = useSelector((state) => state.cards);
  const decks = useSelector((state) => state.decks);

  const currentDeck = useSelector((state) => state.decks[id.id]);

  const [name, setName] = useState(currentDeck.name);
  const [description, setDescription] = useState(currentDeck.description);
  const [commander, setCommander] = useState(
    cards[currentDeck.commanderId].name
  );
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let apiFetch = await fetch(
      `https://api.scryfall.com/cards/named?exact=${commander}`
    );
    let apiCard = await apiFetch.json();
    if (
      apiCard?.type_line &&
      !(apiCard?.type_line.slice(0, 18) === "Legendary Creature")
    ) {
      setErrors({ commander: "Commanders must be legendary creatures!" });
      return null;
    } else if (!apiCard?.type_line) {
      setErrors({ commander: "Invalid cardname!" });
      return null;
    } else {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("commander", commander);
      formData.append("deck_id", currentDeck.id);
      const cardInLocalDB = Object.values(cards).find(
        (card) => card.name === apiCard.name
      );
      if (cardInLocalDB) {
        formData.append("card_id", cardInLocalDB.id);
        const cardInCurrentDeck = Object.values(currentDeck.cardsInDeck).find(
          (id) => id === cardInLocalDB.id
        );
        const deckWithCardAsCommander = Object.values(decks).find(
          (deck) => deck.commanderId === cardInLocalDB.id
        );
        if (deckWithCardAsCommander) {
          formData.append(
            "local_cover_image_url",
            deckWithCardAsCommander.coverImageUrl
          );
          if (cardInCurrentDeck) {
            formData.append("card_in_deck", "yup");
          } else {
            formData.append("card_in_deck", "nope");
          }
          let data = await dispatch(ThunkUpdateDeckHasCover(formData));
          if (data?.name) {
            closeModal();
          } else if (data?.errors) {
            setErrors(data.errors);
          }
        } else {
          const coverImage = apiCard.image_uris.art_crop;
          let coverFile = null;
          await fetch(`${coverImage}`)
            .then((res) => res.blob())
            .then((myBlob) => {
              coverFile = new File([myBlob], "cover_image.jpeg", {
                type: myBlob.type,
              });
            });
          formData.append("cover_image_url", coverFile);
          if (cardInCurrentDeck) {
            formData.append("card_in_deck", "yup");
          } else {
            formData.append("card_in_deck", "nope");
          }
          let data = await dispatch(ThunkUpdateDeckNoCover(formData));
          if (data?.name) {
            closeModal();
          } else if (data?.errors) {
            setErrors(data.errors);
          }
        }
      } else {
        const coverImage = apiCard.image_uris.art_crop;
        const borderImage = apiCard.image_uris.border_crop;
        let coverFile = null;
        let borderFile = null;
        await fetch(`${coverImage}`)
          .then((res) => res.blob())
          .then((myBlob) => {
            coverFile = new File([myBlob], "cover_image.jpeg", {
              type: myBlob.type,
            });
          });
        await fetch(`${borderImage}`)
          .then((res) => res.blob())
          .then((myBlob) => {
            borderFile = new File([myBlob], "border_image.jpeg", {
              type: myBlob.type,
            });
          });
        formData.append("cover_image_url", coverFile);
        formData.append("card_image_url", borderFile);
        formData.append("color_identity", apiCard.color_identity.join(""));
        formData.append("card_name", apiCard.name);
        formData.append("type", apiCard.type_line);
        let data = await dispatch(ThunkUpdateDeckNotLocal(formData));
        if (data?.name) {
          closeModal();
        } else if (data?.errors) {
          setErrors(data.errors);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <div>Update Deck</div>
        {errors.message && <p>{errors.message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name your deck!
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
          <label>
            Give a short description about your deck!
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
          <label>
            Choose your commander!
            <input
              type="text"
              value={commander}
              onChange={(e) => setCommander(e.target.value)}
              required
            />
          </label>
          {errors.commander && <p>{errors.commander}</p>}
          <button type="submit">Update Deck</button>
        </form>
      </div>
    </div>
  );
}
