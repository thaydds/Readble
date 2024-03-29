import { RECEIVE_POSTS, RECEIVE_POST, EDIT_POST, DELETE_POST, ADD_POST, ADD_COUNT_COMMENT, SUB_COUNT_COMMENT, VOTE_POST_DETAIL, VOTE_POST } from '../actions/posts'

export default function posts (state={}, actions) {
  switch(actions.type){
    case ADD_POST:
      return {...state, lista: [...state.lista,actions.post] }
    case EDIT_POST:
      return {...state, lista: state.lista.map((post) => post.id === actions.post.id ?
      post = actions.post : post) }
    case ADD_COUNT_COMMENT:
      return {...state, post: {...actions.post, commentCount: actions.post.commentCount + 1} }
    case SUB_COUNT_COMMENT:
      return {...state, post: {...actions.post, commentCount: actions.post.commentCount - 1} }
    case RECEIVE_POSTS :
      return {...state, lista: actions.posts }
    case RECEIVE_POST :
      return {...state, post: actions.post }
    case DELETE_POST:
      return {...state, lista: state.lista.filter((post) => post.id !== actions.post.id)  }  
    case VOTE_POST:
        return {...state, lista: state.lista.map((post) => post.id === actions.id ?
          post = {...post, voteScore: post.voteScore + actions.vote} : post) }
    case VOTE_POST_DETAIL:
        return {...state, post: {...actions.postDetail, voteScore: actions.postDetail.voteScore + actions.vote }}
    default:
      return state
  }
}

