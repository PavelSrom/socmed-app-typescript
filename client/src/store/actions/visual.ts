import { v4 } from 'uuid'
import { Dispatch } from '..'

export const showSpinner = () => (dispatch: Dispatch) => dispatch({ type: 'LOADING' })
export const hideSpinner = () => (dispatch: Dispatch) =>
  dispatch({ type: 'STOP_LOADING' })

type AlertType = 'success' | 'error'
export const setAlert = (message: string, type: AlertType) => (dispatch: Dispatch) => {
  const id = v4()
  dispatch({ type: 'SET_ALERT', payload: { message, type, id } })

  setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), 5000)
}
