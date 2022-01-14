import { keys } from "./DetailsContext"

// STATE
export const initialState = {
  stop: {
    data: undefined,
    loading: false,
    errors: undefined,
  },
}

export const DetailsReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case keys.OPEN_STOP: {
      return { ...state, stop: payload }
    }
    default:
      return state
  }
}

export default DetailsReducer
