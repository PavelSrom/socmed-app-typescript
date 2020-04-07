import { IUser } from '../../../../server/src/models/User'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS'
export const AUTO_LOGIN_FAIL = 'AUTO_LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const RESET_REDUCERS = 'RESET_REDUCERS'

interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS
  payload: { token: string }
}

interface AuthFailAction {
  type: typeof AUTH_FAIL
}

interface AutoLoginSuccessAction {
  type: typeof AUTO_LOGIN_SUCCESS
  payload: IUser
}

interface AutoLoginFailAction {
  type: typeof AUTO_LOGIN_FAIL
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface ResetReducersAction {
  type: typeof RESET_REDUCERS
}

export type AuthActions =
  | AuthSuccessAction
  | AuthFailAction
  | AutoLoginSuccessAction
  | AutoLoginFailAction
  | LogoutAction
  | ResetReducersAction
