import { AuthActions } from '../types/auth'
import { IUser } from '../../../../server/src/models/User'

interface RootState {
  isAuthenticated: boolean | null
  user: IUser | null
}

const initialState: RootState = {
  isAuthenticated: null,
  user: null,
}

export default (state = initialState, action: AuthActions): RootState => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      localStorage.setItem('authToken', action.payload.token)
      return state
    case 'AUTO_LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }
    case 'AUTH_FAIL':
    case 'AUTO_LOGIN_FAIL':
      localStorage.removeItem('authToken')
      return {
        ...state,
        isAuthenticated: false,
      }
    case 'LOGOUT':
    case 'RESET_REDUCERS':
      localStorage.removeItem('authToken')
      return initialState
    default:
      return state
  }
}
