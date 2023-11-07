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
    <div>
      <div>
        <div>Update Comment</div>
        {errors.message && <p>{errors.message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Update your message!
            <input
              type="text"
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
              required
            />
          </label>
          {errors.message && <p>{errors.message}</p>}
          <button type="submit">Update Comment</button>
        </form>
      </div>
    </div>
  );
}
