import { IPost } from '../../../../src/models/Post'

export const GET_POSTS = 'GET_POSTS'
export const CREATE_NEW_POST = 'CREATE_NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const RESET_REDUCERS = 'RESET_REDUCERS'

interface GetPostsAction {
  type: typeof GET_POSTS
  payload: IPost[]
}

interface NewPostAction {
  type: typeof CREATE_NEW_POST
  payload: IPost
}

interface UpdatePostAction {
  type: typeof UPDATE_POST
  payload: IPost
}

interface ResetReducersAction {
  type: typeof RESET_REDUCERS
}

export type PostActions =
  | GetPostsAction
  | NewPostAction
  | UpdatePostAction
  | ResetReducersAction
