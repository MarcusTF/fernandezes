import { keys } from "./MapContext"

// STATE
export const initialState = {
  map: undefined,
  center: [0, 0],
  zoom: 3,
  stops: {
    data: undefined,
    loading: false,
    errors: undefined,
    markers: [],
  },
}

export const MapReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case keys.REF_SET: {
      return { ...state, map: payload }
    }
    case keys.RESET: {
      return { ...state, center: [0, 0], zoom: 3 }
    }
    case keys.SET_CENTER: {
      return { ...state, center: payload }
    }
    case keys.SET_ZOOM: {
      return { ...state, zoom: payload }
    }
    case keys.SET_MAP: {
      return { ...state, zoom: payload.zoom, center: payload.coords }
    }
    case keys.SET_STOPS: {
      return { ...state, stops: payload }
    }
    default:
      return state
  }
}

export default MapReducer
