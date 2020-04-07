import { PostActions } from '../types/posts'
import { IPost } from '../../../../server/src/models/Post'

interface RootState {
  posts: IPost[]
}

const initialState: RootState = {
  posts: [],
}

export default (state = initialState, action: PostActions): RootState => {
  switch (action.type) {
    case 'CREATE_NEW_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }
    case 'UPDATE_POST':
      const newPosts = [...state.posts]
      const targetIndex = newPosts.findIndex(({ _id }) => action.payload._id === _id)
      newPosts.splice(targetIndex, 1, action.payload)

      return {
        ...state,
        posts: newPosts,
      }
    case 'RESET_REDUCERS':
      return initialState
    default:
      return state
  }
}
