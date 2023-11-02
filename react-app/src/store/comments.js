const ALL_COMMENTS = "comments/getComments";

// action creators

export const getAllComments = (comments) => {
  return {
    type: ALL_COMMENTS,
    comments,
  };
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
    default:
      return state;
  }
};

export default commentReducer;
