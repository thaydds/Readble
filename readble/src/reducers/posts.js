import { RECEIVE_POSTS, RECEIVE_POST } from '../actions/posts'

export default function posts (state={}, actions) {
  switch(actions.type){
    case RECEIVE_POSTS :
     return {...state, lista: actions.posts }
    case RECEIVE_POST :
      return {...state, post: actions.post }
    default:
      return state
  }
}