import { updateDeck } from "./decks";

const ALL_COMMENTS = "comments/getComments";
const ADD_COMMENT = "comments/createComment";
const DELETE_COMMENT = "comments/deleteComment";

// action creators

export const getAllComments = (comments) => {
  return {
    type: ALL_COMMENTS,
    comments,
  };
};

export const createComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  };
};

//thunks

export const ThunkAddCommentToDeck = (formData) => async (dispatch) => {
  const res = await fetch(`/api/comments/add`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(createComment(data.comment));
    await dispatch(updateDeck(data.deck));
    return data.deck;
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkDeleteComment = (commentId, deckId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/${deckId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteComment(commentId));
    dispatch(updateDeck(data.deck));
    return data;
  } else {
    const data = await res.json();
    return data;
  }
};

// reducer

const initialState = {};
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COMMENTS:
      const commentsObj = {};
      action.comments.forEach((comment) => {
        commentsObj[comment.id] = comment;
      });
      return commentsObj;
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
