import { useMutation } from "graphql-hooks"
import React, { createContext, useCallback } from "react"
import { LOG_IN, REFRESH, SIGN_UP } from "../graphql/Mutations"
import { default as AuthReducer, initialState } from "./AuthReducer"
import { graphQLClientContext } from ".."
import { useImmerReducer } from "use-immer"
import produce from "immer"
import dayjs from "dayjs"

// KEYS
export const keys = {
  LOG_IN: "LOG_IN",
  SIGN_UP: "SIGN_UP",
  REFRESH: "REFRESH",
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(AuthReducer, initialState)

  const [authenticate] = useMutation(LOG_IN)
  const [register] = useMutation(SIGN_UP)
  const [refresh] = useMutation(REFRESH)

  const signUp = useCallback(
    async userInfo => {
      dispatch({ type: keys.SIGN_UP, payload: { data: undefined, loading: true, error: undefined } })
      try {
        const res = await register({ variables: { ...userInfo } })
        if (res?.error)
          return dispatch({ type: keys.SIGN_UP, payload: { data: undefined, error: res?.error, loading: false } })
        dispatch({
          type: keys.SIGN_UP,
          payload: { data: res?.data?.registerUser?.user?.email, loading: false, error: undefined },
        })
      } catch (error) {
        dispatch({ type: keys.SIGN_UP, payload: { data: undefined, loading: false, error } })
      }
    },
    [dispatch, register]
  )

  const refreshToken = useCallback(
    async refreshToken => {
      dispatch({ type: keys.REFRESH, payload: { authToken: undefined, loading: true, error: undefined } })
      try {
        const res = await refresh({
          variables: { refreshToken },
          fetchOptionsOverrides: { headers: { authorization: null } },
        })
        if (res?.error)
          return dispatch({ type: keys.REFRESH, payload: { authToken: undefined, error: res?.error, loading: false } })
        console.log("token refreshed :)")
        dispatch({
          type: keys.REFRESH,
          payload: { authToken: res?.data?.refreshJwtAuthToken?.authToken, loading: false, error: undefined },
        })
        graphQLClientContext.setHeader("authorization", `Bearer ${res?.data?.refreshJwtAuthToken?.authToken}`)
        return res
      } catch (error) {
        dispatch({ type: keys.REFRESH, payload: { authToken: undefined, loading: false, error } })
      }
    },
    [dispatch, refresh]
  )

  const logOut = useCallback(() => {
    dispatch({ type: keys.LOG_IN, payload: { user: null, loading: false, error: undefined } })
    graphQLClientContext.setHeader("authorization", null)
    sessionStorage?.clear?.()
    localStorage?.clear?.()
  }, [dispatch])

  const fetchParse = async (url, options) => {
    const res = await fetch(url, options),
      parsedCopy = await res?.clone?.()?.json?.(),
      errorMessage = parsedCopy?.errors?.[0]?.message
    return [res, errorMessage]
  }

  const jwtRefresh = useCallback(
    async (url, options) => {
      try {
        const [res1, error1] = await fetchParse(url, options)
        if (error1 === "The iss do not match with this server") {
          try {
            const session = sessionStorage.getItem("_the_fernandezes_session"),
              remembered = localStorage.getItem("_the_fernandezes_remember_me")

            if (!session && !remembered) return res1

            const parsed = session ? JSON.parse(session) : JSON.parse(remembered)

            if (console.log(dayjs(parsed?.tokenCreated).add(7, "day").isAfter(dayjs()))) {
              logOut()
              return res1
            }

            const refresh = await refreshToken(parsed?.refreshToken)

            if (refresh?.errors) return res1

            const authToken = refresh?.data?.refreshJwtAuthToken?.authToken,
              newOptions = produce(options, draft => void (draft.headers.authorization = `Bearer ${authToken}`)),
              [res2, notThisSh_tAgain] = await fetchParse(url, newOptions)

            if (notThisSh_tAgain === "The iss do not match with this server") return res1
            if (session) sessionStorage.setItem("_the_fernandezes_session", JSON.stringify({ ...parsed, authToken }))
            if (remembered)
              localStorage.setItem("_the_fernandezes_remember_me", JSON.stringify({ ...parsed, authToken }))

            return res2
          } catch (err) {
            return res1
          }
        }
        return res1
      } catch (e) {
        return new Response(JSON.stringify(e))
      }
    },
    [refreshToken]
  )

  const logIn = useCallback(
    async credentials => {
      if (!credentials?.username || !credentials?.password)
        return dispatch({
          type: keys.LOG_IN,
          payload: { loading: false, error: { message: "No data entered." } },
        })
      dispatch({ type: keys.LOG_IN, payload: { loading: true, error: undefined } })
      try {
        const res = await authenticate({ variables: { ...credentials } })
        if (res?.error) return dispatch({ type: keys.LOG_IN, payload: { error: res?.error, loading: false } })
        dispatch({ type: keys.LOG_IN, payload: { user: res?.data?.login?.user, loading: false, error: undefined } })
        graphQLClientContext.fetch = jwtRefresh
        return graphQLClientContext.setHeader("authorization", `Bearer ${res?.data?.login?.user?.authToken}`)
      } catch (error) {
        dispatch({ type: keys.LOG_IN, payload: { loading: false, error } })
      }
    },
    [authenticate, dispatch, jwtRefresh]
  )

  const pullUserFromStorage = useCallback(() => {
    const storage = sessionStorage?.getItem?.("_the_fernandezes_session"),
      remembered = localStorage?.getItem?.("_the_fernandezes_remember_me")
    try {
      const user = storage ? JSON?.parse?.(storage) : remembered ? JSON?.parse?.(remembered) : null
      if (!user) return
      dispatch({ type: keys.LOG_IN, payload: { user, loading: false, error: undefined } })
      graphQLClientContext.fetch = jwtRefresh
      return graphQLClientContext.setHeader("authorization", `Bearer ${user?.authToken}`)
    } catch (error) {
      dispatch({ type: keys.LOG_IN, payload: { loading: false, error } })
    }
  }, [dispatch, jwtRefresh])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logIn,
        pullUserFromStorage,
        logOut,
        signUp,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
