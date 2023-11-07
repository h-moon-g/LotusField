import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./CreateDeckModal.css";
import { ThunkCreateDeck } from "../../store/decks";

export default function CreateDeck() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [commander, setCommander] = useState("");
  const [errors, setErrors] = useState({});

  const cards = useSelector((state) => state.cards);
  const decks = useSelector((state) => state.decks);

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
      const cardInLocalDB = Object.values(cards).find(
        (card) => card.name === apiCard.name
      );
      if (cardInLocalDB) {
        const deckWithCardAsCommander = Object.values(decks).find(
          (deck) => deck.commanderId === cardInLocalDB.id
        );
        if (deckWithCardAsCommander) {
          formData.append(
            "local_cover_image_url",
            deckWithCardAsCommander.coverImageUrl
          );
          formData.append("local_card_id", cardInLocalDB.id);
          formData.append("local_card", "yup");
        } else {
          if (cardInLocalDB?.type.slice(0, 18) === "Legendary Creature") {
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
            formData.append("local_card_id", cardInLocalDB.id);
            formData.append("local_card", "yup but no cover");
          } else {
            setErrors({ commander: "Commanders must be legendary creatures!" });
            return null;
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
        formData.append("local_card", "nope");
      }
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("commander", commander);

    let data = await dispatch(ThunkCreateDeck(formData));

    if (data?.name) {
      history.push(`/decks/${data.id}`);
      closeModal();
    } else if (data?.errors) {
      console.log(data.errors);
      setErrors(data?.errors);
    }
  };

  return (
    <div>
      <div>
        <div>Create Deck</div>
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
          <button type="submit">Create Deck</button>
        </form>
      </div>
    </div>
  );
}
