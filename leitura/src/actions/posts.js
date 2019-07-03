import * as api from '../http'

// actions variables

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = "RECEIVE_POST";


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
      api.getPosts(post.category).then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
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
  console.log('POST', post)
  return dispatch => {
    return api.editPost(post).then(post =>
      api.getPosts(post.category).then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};

export const deletePost = post => {
  console.log('id', post)
  return dispatch => {
    return api.deletePost(post).then(post =>
      api.getPosts().then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};

export const votePost = (id, option) => {
  return dispatch => {
    return api.votePost(id, option).then(post =>
    {
      console.log('post', post)
      api.getPosts().then(posts =>
      dispatch({
        type: RECEIVE_POSTS,
        posts
      })
    )}
    );
  };
};

export const votePostDetail = (id, option) => {
  console.log('ID', id)
  console.log('OPTION', option)
  return dispatch => {
    return api.votePost(id, option).then(post =>
  {
    api.fetchPost(id).then(post =>
    dispatch({
      type: RECEIVE_POST,
      post
    })
  )}
    );
  };
};