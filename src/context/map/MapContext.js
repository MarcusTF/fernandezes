import { useManualQuery } from "graphql-hooks"
import { Marker } from "pigeon-maps"
import React, { createContext, useCallback, useContext, useReducer } from "react"
import { colorPicker, getBounds } from "../../utils/utils"
import { GET_ALL_STOPS } from "../graphql/Queries"
import { default as MapReducer, initialState } from "./MapReducer"
import geoViewport from "@mapbox/geo-viewport"
import { DetailsContext } from ".."

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

  const { getStop } = useContext(DetailsContext)

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

        if (res.error) return dispatch({ type: keys.SET_STOPS, payload: { ...res, loading: false } })

        const stops = res?.data?.stops?.nodes,
          map = document.querySelector(".map")

        if (!stops?.length || stops?.length === 0) {
          dispatch({
            type: keys.SET_STOPS,
            payload: {
              ...res,
              loading: false,
              markers: [],
            },
          })
          dispatch({ type: keys.RESET })
          return
        }

        const handleClick = stop => {
          setMap([stop?.location?.coords?.lat, stop?.location?.coords?.lng], 11)
          getStop(stop?.id)
        }

        if (stops?.length === 1) {
          const stop = stops[0]
          dispatch({
            type: keys.SET_STOPS,
            payload: {
              ...res,
              loading: false,
              markers: [
                <Marker
                  onClick={() => handleClick(stop)}
                  key={stop?.id}
                  payload={stop?.id}
                  color={colorPicker(stop)}
                  anchor={[stop?.location?.coords?.lat, stop?.location?.coords?.lng]}
                />,
              ],
            },
          })
          dispatch({
            type: keys.SET_MAP,
            payload: { coords: [stop?.location?.coords?.lat, stop?.location?.coords?.lng], zoom: 11 },
          })
          return
        }

        const markers = stops?.map?.(stop => (
          <Marker
            onClick={() => handleClick(stop)}
            payload={stop?.id}
            key={stop?.id}
            color={colorPicker(stop)}
            anchor={[stop?.location?.coords?.lat, stop?.location?.coords?.lng]}
          />
        ))
        const bounds = getBounds(stops?.map?.(stop => stop?.location?.coords))

        // stops?.reduce?.(
        //   (acc, cur) => {
        //     return [
        //       Math.min(acc[0], cur.location?.coords?.lng),
        //       Math.min(acc[1], cur.location?.coords?.lat),
        //       Math.max(acc[2], cur.location?.coords?.lng),
        //       Math.max(acc[3], cur.location?.coords?.lat),
        //     ]
        //   },
        //   [
        //     stops?.[0]?.location?.coords?.lng || 0,
        //     stops?.[0]?.location?.coords?.lat || 0,
        //     stops?.[0]?.location?.coords?.lng || 0,
        //     stops?.[0]?.location?.coords?.lat || 0,
        //   ]
        // )

        const { center, zoom } = geoViewport.viewport(bounds, [map?.clientWidth, map?.clientHeight])

        dispatch({ type: keys.SET_STOPS, payload: { ...res, loading: false, markers } })
        dispatch({ type: keys.SET_MAP, payload: { coords: [center[1], center[0]], zoom } })
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
