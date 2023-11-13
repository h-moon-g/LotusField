import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteComment } from "../../store/comments";
import "./DeleteCommentModal.css";

function DeleteCommentModal({ commentId, deckId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(ThunkDeleteComment(commentId, deckId));
    if (data.errors) {
      setErrors(data.errors);
    }
    closeModal();
  };

  return (
    <div className="modal-div">
      <div className="dm-title-txt">Confirm Delete</div>
      {errors.error && <p>{errors.error}</p>}
      <div className="dm-confirm-txt">
        Are you sure you want to remove this comment?
      </div>
      <button className="dm-delete-button" onClick={handleDelete}>
        YES (delete comment)
      </button>
      <button className="dm-close-delete-button" onClick={closeModal}>
        NO (keep comment)
      </button>
    </div>
  );
}

export default DeleteCommentModal;
