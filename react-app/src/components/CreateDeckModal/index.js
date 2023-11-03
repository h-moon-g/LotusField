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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiFetch = await fetch(
      `https://api.scryfall.com/cards/named?exact=${commander}`
    );

    let apiCard = await apiFetch.json();

    let formData = new FormData();

    if (
      apiCard?.type_line &&
      apiCard?.type_line.slice(0, 18) === "Legendary Creature"
    ) {
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

    formData.append("name", name);
    formData.append("description", description);
    formData.append("commander", commander);

    let data = await dispatch(ThunkCreateDeck(formData));

    if (data?.deck) {
      history.push(`/decks/${data.deck.id}`);
      closeModal();
    } else if (data?.errors) {
      setErrors(data.errors);
    }
  };

  return (
    <div>
      <div>
        <div>Create Deck</div>
        {errors.message && <p>{errors.message}</p>}
        <form onSubmit={handleSubmit}>
          <label className="login-label">
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
