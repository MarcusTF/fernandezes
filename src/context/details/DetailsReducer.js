import { keys } from "./DetailsContext"
import merge from "lodash/merge"

// STATE
export const initialState = {
  stopDetails: {
    data: undefined,
    loading: false,
    errors: undefined,
  },
  panel: null,
}

export const DetailsReducer = (draft, { type, payload }) => {
  switch (type) {
    case keys.OPEN_STOP:
      return void (draft.stopDetails = merge(draft.stopDetails, payload))
    default:
      return draft
  }
}

export default DetailsReducer
