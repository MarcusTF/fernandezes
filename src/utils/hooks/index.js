import dayjs from "dayjs"
import { Marker } from "pigeon-maps"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { MapContext } from "../../context/map"

export const useGenerateMarkers = stops => {
  const { setMap } = useContext(MapContext)

  const colorPicker = data => {
    if (data?.when === "next") return "#ffb05c"
    else if (data?.startDate && data?.endDate) {
      const startDate = dayjs(data?.startDate, "MM/DD/YYYY").valueOf(),
        endDate = dayjs(data?.endDate, "MM/DD/YYYY").valueOf(),
        today = dayjs().valueOf()
      if (endDate < today) return "#c20e0e"
      if (startDate < today && endDate > today) return "#fffc5c"
      if (startDate > today) return "#42b52b"
      return "#c2c2c2"
    } else if (data?.date) {
      const date = dayjs(data?.startDate, "MM/DD/YYYY").valueOf(),
        today = dayjs().valueOf()
      if (date < today) return "#c20e0e"
      if (date > today) return "#42b52b"
    } else if (data?.when)
      switch (data?.when) {
        case "past":
          return "#c20e0e"
        case "current":
          return "#fffc5c"
        case "future":
          return "#42b52b"
        default:
          return "#c2c2c2"
      }
  }

  const handleClick = useCallback(e => setMap(e.anchor, 11), [setMap])

  return stops?.map?.(stop => (
    <Marker
      onClick={handleClick}
      key={stop?.id}
      color={colorPicker(stop?.time)}
      anchor={[stop?.location?.coords?.lat, stop?.location?.coords?.lng]}
    />
  ))
}

/**
 * Simple debouncing using useEffect.
 *
 * @param {function} callback the function to call after the debounce delay.
 * @param {array} deps the dependencies to check for debouncing.
 * @param {number} [delay=1000] the delay (in ms) after the last change before calling the callback.
 * @param {boolean} [conditional=true] (optional) conditional to check before running the debounce.
 * @param {function} conditionalCallback (optional) callback to run if the conditional is false.
 * @example useDebounce(() => apiCall(input), [input], 1000)
 */
export const useDebounce = (callback, deps, delay, conditional = true, conditionalCallback) => {
  const firstRun = useRef(true)
  useEffect(() => {
    const debounce = conditional
      ? setInterval(() => {
          !firstRun.current && callback()
          clearInterval(debounce)
        }, delay || 1000)
      : !!conditionalCallback && conditionalCallback()
    return () => {
      firstRun.current = false
      clearInterval(debounce)
    }
  }, deps)
}

export const useProgressiveImage = src => {
  const [srcLoaded, setSrcLoaded] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setSrcLoaded(src)
  }, [src])

  return srcLoaded
}
