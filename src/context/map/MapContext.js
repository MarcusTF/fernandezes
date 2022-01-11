import dayjs from "dayjs"
import { useManualQuery } from "graphql-hooks"
import { Marker } from "pigeon-maps"
import React, { createContext, useCallback, useReducer } from "react"
import { useGenerateMarkers } from "../../utils/hooks"
import { colorPicker } from "../../utils/utils"
import { GET_ALL_STOPS } from "../graphql/Queries"
import { default as MapReducer, initialState } from "./MapReducer"

// KEYS
export const keys = {
  SET_CENTER: "SET_CENTER",
  SET_STOPS: "SET_STOPS",
  SET_MAP: "SET_MAP",
  SET_ZOOM: "SET_ZOOM",
  RESET: "RESET",
}

export const MapContext = createContext(initialState)

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)

  const [getAllStops] = useManualQuery(GET_ALL_STOPS, { variables: { search: "" } })

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

  const getStops = useCallback(
    async query => {
      dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: true, error: undefined } })
      try {
        const res = await getAllStops({ variables: { search: query || "" } })

        const markers = res?.data?.stops?.nodes?.map?.(stop => (
          <Marker
            onClick={e => setMap(e.anchor, 11)}
            key={stop?.id}
            color={colorPicker(stop?.time)}
            anchor={[stop?.location?.lng, stop?.location?.lat]}
          />
        ))

        dispatch({ type: keys.SET_STOPS, payload: { ...res, loading: false, markers } })
      } catch (error) {
        console.log(error)
        dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: false, error } })
      }
    },
    [getAllStops, setMap]
  )

  return (
    <MapContext.Provider
      value={{
        ...state,
        setCenter,
        setZoom,
        resetMap,
        setMap,
        getStops,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
