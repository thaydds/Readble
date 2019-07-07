import uuid from "uuid";
import * as api from'../http'
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const VOTE_COMMENT = " VOTE_COMMENT";


export const fetchComments = id => {
  return dispatch => {
    return api.fetchComments(id).then(comments =>
      dispatch({
        type: RECEIVE_COMMENTS,
        comments
      })
    );
  };
};

export const fetchComment = id => {
  return dispatch => {
    return api.fetchComment(id).then(comment =>
      dispatch({
        type: RECEIVE_COMMENT,
        comment
      })
    );
  };
};

export const voteComment = (id, option) => {
  let vote
  if(option === 'upVote'){
    vote = 1
  }
  if(option === 'downVote'){
    vote = -1
  }
  return dispatch => {
    return api.voteComment(id, option).then(comment =>
        dispatch({
          type: VOTE_COMMENT,
          id,
          vote
        })
      
    );
  };
};

export const addComment = comment => {
  comment = {
    ...comment,
    id: uuid.v4(),
    timestamp: Date.now()
  };
 
  return dispatch => {
    return api.addComment(comment).then(comment =>
      
        dispatch({
          type:ADD_COMMENT,
          comment
        })
      
    );
  };
};

export const deleteComment = comment => {
  return dispatch => {
    return api.deleteComment(comment).then(comment =>
        dispatch({
          type: DELETE_COMMENT,
          comment
        })
      
    );
  };
};

export const editComment = comment => {
  return dispatch => {
    return api.editComment(comment).then(comment =>
        dispatch({
          type: EDIT_COMMENT,
          comment
        })
    );
  };
};