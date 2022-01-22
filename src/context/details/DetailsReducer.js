import { keys } from "./DetailsContext"

// STATE
export const initialState = {
  stopDetails: {
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
      return { ...state, stopDetails: payload }
    }
    default:
      return state
  }
}

export default DetailsReducer
