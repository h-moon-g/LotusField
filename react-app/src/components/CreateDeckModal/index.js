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
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [cardImageUrl, setCardImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiFetch = await fetch(
      `https://api.scryfall.com/cards/named?exact=${commander}`
    );

    let apiCard = await apiFetch.json();

    if (
      apiCard?.type_line &&
      apiCard?.type_line.slice(0, 18) === "Legendary Creature"
    ) {
      setCoverImageUrl(apiCard.image_uris.art_crop);
      setCardImageUrl(apiCard.image_uris.border_crop);
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

    // .then((data) => {
    //   return data.json();
    // })
    // .then((data) => {
    //   if (
    //     data?.type_line &&
    //     data?.type_line.slice(0, 18) === "Legendary Creature"
    //   ) {
    //     setCoverImageUrl(data.image_uris.art_crop);
    //     setCardImageUrl(data.image_uris.border_crop);
    //   } else if (
    //     data?.type_line &&
    //     !(data?.type_line.slice(0, 18) === "Legendary Creature")
    //   ) {
    //     setErrors({ commander: "Commanders must be legendary creatures!" });
    //   } else {
    //     setErrors({ commander: "Invalid cardname!" });
    //   }
    // });

    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("commander", commander);
    formData.append("cover_image_url", coverImageUrl);
    formData.append("card_image_url", cardImageUrl);

    let data = await dispatch(ThunkCreateDeck(formData));

    if (data?.name) {
      history.push(`/decks/${data.id}`);
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
