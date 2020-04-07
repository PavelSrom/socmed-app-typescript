import { VisualActions } from '../types/visual'
import { Alert } from '../types/visual'

interface RootState {
  loading: boolean
  alerts: Alert[]
}

const initialState: RootState = {
  loading: false,
  alerts: [],
}

export default (state = initialState, action: VisualActions): RootState => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      }
    case 'SET_ALERT':
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter(({ id }) => id !== action.payload),
      }
    case 'RESET_REDUCERS':
      return initialState
    default:
      return state
  }
}
