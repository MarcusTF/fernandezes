import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { AuthContext } from "../../context"

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
    return () => img.remove()
  }, [src])

  return srcLoaded
}

export const useOnce = (callback, condition) => {
  const called = useRef(false)
  useEffect(() => {
    if (condition && !called.current) {
      called.current = true
      callback()
    }
  }, [callback, condition])
}

export const useStoredUser = () => {
  const { user: fromContext } = useContext(AuthContext)

  const storage = sessionStorage?.getItem?.("_the_fernandezes_session"),
    remembered = localStorage?.getItem?.("_the_fernandezes_remember_me"),
    fromStorage = storage ? JSON?.parse?.(storage) : remembered ? JSON?.parse?.(remembered) : null

  return fromContext || fromStorage
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback)
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
