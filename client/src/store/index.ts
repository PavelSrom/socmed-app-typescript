import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import thunk, { ThunkMiddleware, /* ThunkAction, */ ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import auth from './reducers/auth'
import posts from './reducers/posts'
import visual from './reducers/visual'

import { AuthActions } from './types/auth'
import { PostActions } from './types/posts'
import { VisualActions } from './types/visual'

const rootReducer = combineReducers({
  auth,
  posts,
  visual,
})

export type AppState = ReturnType<typeof rootReducer>
export type AppActions = AuthActions | PostActions | VisualActions

// the two types below are to allow thunk to dispatch other (nested) actions
// export type AsyncAction = ThunkAction<void, {}, {}, AppActions>
export type Dispatch = ThunkDispatch<{}, {}, AppActions>

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
)
