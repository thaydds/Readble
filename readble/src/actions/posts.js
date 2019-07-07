import * as api from '../http'

// actions variables

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const ADD_POST = "ADD_POST";
export const ADD_COUNT_COMMENT = " ADD_COUNT_COMMENT";
export const SUB_COUNT_COMMENT = "SUB_COUNT_COMMENT";
export const VOTE_POST = "VOTE_POST";
export const VOTE_POST_DETAIL = "VOTE_POST_DETAIL";




// actions functions

export function receivePosts (posts) {
	return {
	type: RECEIVE_POSTS,
	posts
}}

export const handleInitialData = category => {
  return dispatch => {
    return api.getPosts(category).then(posts =>
      dispatch(receivePosts(posts))
    );
  };
};

export const addPost = post => {
  post = {
    ...post,
    timestamp: Date.now()
  };
  
  return dispatch => {
    return api.addPost(post).then(post => 
          dispatch({
          type: ADD_POST,
          post
        })
      
    );
  };
};

export const fetchPost = id => {
  return dispatch => {
    return api.fetchPost(id).then(post =>{
      dispatch({
        type: RECEIVE_POST,
        post
      })
    }
    );
  };
};

export const editPost = post => {
  return dispatch => {
    return api.editPost(post).then(post =>  
        dispatch({
          type: EDIT_POST,
          post
        })
    );
  };
};

export const deletePost = post => {
  return dispatch => {
    return api.deletePost(post).then(post =>
        dispatch({
          type: DELETE_POST,
          post
        })
    );
  };
};

export const votePost = (id, option) => {
  let vote
  if(option === 'upVote'){
    vote = 1
  }
  if(option === 'downVote'){
    vote = -1
  }
  return dispatch => {
    return api.votePost(id, option).then(post =>
    { 
      dispatch({
        type: VOTE_POST,
        id,
        vote,
      })
    }
    );
  };
};

export const votePostDetail = (postDetail, option) => {
  let vote
  if(option === 'upVote'){
    vote = 1
  }
  if(option === 'downVote'){
    vote = -1
  }
  return dispatch => {
    return api.votePost(postDetail.id, option).then(post =>
  {
    dispatch({
      type: VOTE_POST_DETAIL,
      postDetail,
      vote
    })
  }
    );
  };
};

export const addCountComment = (post) => {
  return { type: ADD_COUNT_COMMENT, post }
}

export const subCountComment = (post) => {
  return { type: SUB_COUNT_COMMENT, post }
}