import React, { createContext, useCallback, useReducer } from "react"
import { default as MapReducer, initialState } from "./MapReducer"

// KEYS
export const keys = {
  SET_CENTER: "SET_CENTER",
  SET_MAP: "SET_MAP",
  SET_ZOOM: "SET_ZOOM",
  RESET: "RESET",
}

export const MapContext = createContext(initialState)

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)

  const setCenter = useCallback(coords => {
    dispatch({ type: keys.SET_CENTER, payload: coords })
  }, [])

  const setZoom = useCallback(zoom => {
    dispatch({ type: keys.SET_ZOOM, payload: zoom })
  }, [])

  const setMap = useCallback((coords, zoom) => {
    dispatch({ type: keys.SET_MAP, payload: { coords, zoom } })
  }, [])

  const resetMap = useCallback(() => {
    dispatch({ type: keys.RESET })
  }, [])

  return (
    <MapContext.Provider
      value={{
        ...state,
        setCenter,
        setZoom,
        resetMap,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
