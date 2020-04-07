import axios from 'axios'
import { History } from 'history'
import { Dispatch } from '..'
import setAxiosToken from '../../utils/setAxiosToken'
import { setAlert } from './visual'

export const autoLoginUser = () => async (dispatch: Dispatch) => {
  if (localStorage.authToken) setAxiosToken(localStorage.authToken)

  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: 'AUTO_LOGIN_SUCCESS', payload: res.data })
    dispatch(setAlert('Logged in successfully', 'success'))
  } catch ({ response }) {
    dispatch({ type: 'AUTO_LOGIN_FAIL' })
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const registerUser = (form: any) => async (dispatch: Dispatch) => {
  const fd = new FormData()
  for (let key of Object.keys(form)) {
    fd.append(key, form[key])
  }

  try {
    const res = await axios.post('/api/auth/register', fd)
    dispatch({ type: 'AUTH_SUCCESS', payload: res.data })
    dispatch(autoLoginUser())
  } catch ({ response }) {
    dispatch({ type: 'AUTH_FAIL' })
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const loginUser = (form: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', form)
    dispatch({ type: 'AUTH_SUCCESS', payload: res.data })
    dispatch(autoLoginUser())
  } catch ({ response }) {
    dispatch({ type: 'AUTH_FAIL' })
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const logoutUser = (history: History) => (dispatch: Dispatch) => {
  dispatch({ type: 'LOGOUT' })
  history.push('/')
  dispatch(setAlert('Logged out successfully', 'success'))
}

export const deleteUserAccount = (history: History) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete('/api/auth/delete')
    history.push('/')
    dispatch({ type: 'RESET_REDUCERS' })
    dispatch(setAlert(res.data.message, 'success'))
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}
