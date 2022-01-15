import { keys } from "./DetailsContext"

// STATE
export const initialState = {
  stop: {
    data: undefined,
    loading: false,
    errors: undefined,
  },
  panel: null,
}

export const DetailsReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case keys.OPEN_STOP: {
      return { ...state, stop: payload }
    }
    case keys.OPEN_PANEL: {
      return { ...state, panel: payload }
    }
    case keys.CLOSE_PANEL: {
      return { ...state, panel: null }
    }
    default:
      return state
  }
}

export default DetailsReducer
