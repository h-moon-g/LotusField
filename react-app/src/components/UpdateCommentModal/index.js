import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./UpdateCommentModal.css";
import { ThunkUpdateComment } from "../../store/comments";

export default function UpdateComment(message, commentId) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [updateMessage, setUpdateMessage] = useState(message.message);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("comment_id", message.commentId);
    formData.append("message", updateMessage);
    let data = await dispatch(ThunkUpdateComment(formData));
    if (data?.comment) {
      closeModal();
    } else if (data?.errors) {
      setErrors(data.errors);
    }
  };

  return (
    <div className="modal-div">
      <h1 className="deck-modal-title">Update Comment</h1>
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Update your message!
          <input
            type="text"
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            required
          />
        </label>
        {errors.message && <p className="error">{errors.message}</p>}
        <div className="button-div">
          <button className="signup-button" type="submit">
            Update Comment
          </button>
        </div>
      </form>
    </div>
  );
}
