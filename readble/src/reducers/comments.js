import {EDIT_COMMENT, DELETE_COMMENT, ADD_COMMENT, VOTE_COMMENT} from '../actions/comments'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const comments = (state = {}, action) => {
  const { comments, comment } = action;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return  {...state, comments}
    case RECEIVE_COMMENT:
      return {...state, comment: comment };
      case DELETE_COMMENT:
          return {...state, comments: state.comments.filter((post) => post.id !== action.comment.id)  }
      case ADD_COMMENT:
          return {...state, comments: [...state.comments , action.comment] }
      case EDIT_COMMENT:
        return {...state, comments: state.comments.map((comment) => comment.id === action.comment.id ?
        comment = action.comment : comment) }
        case VOTE_COMMENT:
          return {...state, comments: state.comments.map((comment) => comment.id === action.id ?
          comment = {...comment, voteScore: comment.voteScore + action.vote } : comment) }
    default:
      return state;
  }
};

export default comments;