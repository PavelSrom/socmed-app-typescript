export interface Alert {
  id: string
  type: 'success' | 'error'
  message: string
}

export const LOADING = 'LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const RESET_REDUCERS = 'RESET_REDUCERS'

interface StartLoadingAction {
  type: typeof LOADING
}

interface StopLoadingAction {
  type: typeof STOP_LOADING
}

interface SetAlertAction {
  type: typeof SET_ALERT
  payload: Alert
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT
  payload: Alert['id']
}

interface ResetReducersAction {
  type: typeof RESET_REDUCERS
}

export type VisualActions =
  | StartLoadingAction
  | StopLoadingAction
  | SetAlertAction
  | RemoveAlertAction
  | ResetReducersAction
