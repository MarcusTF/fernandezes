import { useManualQuery } from "graphql-hooks"
import { Marker } from "pigeon-maps"
import React, { createContext, useCallback, useContext, useReducer } from "react"
import { colorPicker, getBounds } from "../../utils/utils"
import { GET_ALL_STOPS, GET_STOP } from "../graphql/Queries"
import { default as MapReducer, initialState } from "./MapReducer"
import geoViewport from "@mapbox/geo-viewport"
import { DetailsContext } from ".."
import { useNavigate } from "react-router-dom"

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

  const { getStopDetails } = useContext(DetailsContext)

  const navigate = useNavigate()

  const [getAllStops] = useManualQuery(GET_ALL_STOPS, { variables: { search: "" } })
  const [getOneStop] = useManualQuery(GET_STOP)

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

  const getStop = useCallback(
    async id => {
      dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: true, error: undefined } })
      try {
        const res = await getOneStop({ variables: { id } })
        if (res.error) dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: true, error: res.error } })
        const { stop } = res.data
        dispatch({
          type: keys.SET_STOPS,
          payload: {
            data: [res?.data?.stop],
            loading: false,
            markers: [
              <Marker
                onClick={() => {
                  navigate(`stop/${stop?.id}`)
                }}
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
        navigate(`stop/${stop?.id}`)
      } catch (error) {
        dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: true, error } })
      }
    },
    [getOneStop, navigate]
  )

  const searchStops = useCallback(
    async query => {
      dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: true, error: undefined } })
      try {
        const res = await getAllStops({ variables: { search: query || "" } })

        if (res.error) return dispatch({ type: keys.SET_STOPS, payload: { ...res, loading: false } })

        const data = res?.data?.stops?.nodes,
          map = document.querySelector(".map")

        if (!data?.length || data?.length === 0) {
          dispatch({
            type: keys.SET_STOPS,
            payload: {
              data,
              error: undefined,
              loading: false,
              markers: [],
            },
          })
          dispatch({ type: keys.RESET })
          return
        }

        const handleClick = stop => navigate(`stop/${stop?.id}`)

        if (data?.length === 1) {
          const stop = data[0]
          dispatch({
            type: keys.SET_STOPS,
            payload: {
              data,
              error: undefined,
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
          navigate(`stop/${stop?.id}`)
          return
        }

        const markers = data?.map?.(stop => (
          <Marker
            onClick={() => handleClick(stop)}
            payload={stop?.id}
            key={stop?.id}
            color={colorPicker(stop)}
            anchor={[stop?.location?.coords?.lat, stop?.location?.coords?.lng]}
          />
        ))
        const bounds = getBounds(data?.map?.(stop => stop?.location?.coords))

        const { center, zoom } = geoViewport.viewport(bounds, [
          map?.clientWidth,
          map?.clientWidth < 900 ? map?.clientHeight / 2 : map?.clientHeight,
        ])

        getStopDetails(null)
        dispatch({ type: keys.SET_STOPS, payload: { ...res, loading: false, markers } })
        dispatch({ type: keys.SET_MAP, payload: { coords: [center[1], center[0]], zoom } })
      } catch (error) {
        console.log(error)
        dispatch({ type: keys.SET_STOPS, payload: { data: undefined, loading: false, error } })
      }
    },
    [getAllStops, getStopDetails, navigate]
  )

  return (
    <MapContext.Provider
      value={{
        ...state,
        getStop,
        setCenter,
        setZoom,
        resetMap,
        setMap,
        searchStops,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
