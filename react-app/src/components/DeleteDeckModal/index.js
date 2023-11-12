import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { ThunkDeleteDeck } from "../../store/decks";
import "./DeleteDeckModal.css";

function DeleteDeckModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(ThunkDeleteDeck(id));
    if (data.errors) {
      setErrors(data.errors);
    }
    closeModal();
    history.push(`/`);
    alert("Deck succesfully deleted.");
  };

  return (
    <div className="modal-div">
      <div className="dm-title-txt">Confirm Delete</div>
      {errors.error && <p>{errors.error}</p>}
      <div className="dm-confirm-txt">
        Are you sure you want to remove this deck?
      </div>
      <button className="dm-delete-button" onClick={handleDelete}>
        YES (delete deck)
      </button>
      <button className="dm-close-delete-button" onClick={closeModal}>
        NO (keep deck)
      </button>
    </div>
  );
}

export default DeleteDeckModal;
