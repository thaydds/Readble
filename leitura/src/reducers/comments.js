export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const comments = (state = {}, action) => {
  const { comments, comment } = action;
  console.log('action', action)
  console.log('COMMENTS', comments)
  console.log('COMMENT', comment)

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return comments;
    case RECEIVE_COMMENT:
      return {...state, comment: comment };
    default:
      return state;
  }
};

export default comments;