import { useMutation } from "graphql-hooks"
import React, { createContext, useCallback, useReducer } from "react"
import { LOG_IN, REFRESH, SIGN_UP } from "../graphql/Mutations"
import { default as AuthReducer, initialState } from "./AuthReducer"
import { graphQLClientContext } from ".."
import { useImmerReducer } from "use-immer"

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
        return graphQLClientContext.setHeader("Authorization", `Bearer ${res?.data?.login?.user?.authToken}`)
      } catch (error) {
        dispatch({ type: keys.LOG_IN, payload: { loading: false, error } })
      }
    },
    [authenticate, dispatch]
  )

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

  const pullUserFromStorage = useCallback(() => {
    const storage = sessionStorage?.getItem?.("_the_fernandezes_session"),
      remembered = localStorage?.getItem?.("_the_fernandezes_remember_me")
    try {
      const user = storage ? JSON?.parse?.(storage) : remembered ? JSON?.parse?.(remembered) : null
      if (!user) return
      dispatch({ type: keys.LOG_IN, payload: { user, loading: false, error: undefined } })
      return graphQLClientContext.setHeader("Authorization", `Bearer ${user?.authToken}`)
    } catch (error) {
      dispatch({ type: keys.LOG_IN, payload: { loading: false, error } })
    }
  }, [dispatch])

  const refreshToken = useCallback(
    async refreshToken => {
      dispatch({ type: keys.LOG_IN, payload: { authToken: undefined, loading: true, error: undefined } })
      try {
        const res = await refresh({ variables: { refreshToken } })
        if (res?.error)
          return dispatch({ type: keys.LOG_IN, payload: { authToken: undefined, error: res?.error, loading: false } })
        console.log("token refreshed :)")
        dispatch({
          type: keys.LOG_IN,
          payload: { authToken: res?.data?.refreshJwtAuthToken?.authToken, loading: false, error: undefined },
        })
        return graphQLClientContext.setHeader("Authorization", `Bearer ${res?.data?.refreshJwtAuthToken?.authToken}`)
      } catch (error) {
        dispatch({ type: keys.LOG_IN, payload: { authToken: undefined, loading: false, error } })
      }
    },
    [dispatch, refresh]
  )

  const logOut = useCallback(async () => {
    dispatch({ type: keys.LOG_IN, payload: { user: null, loading: false, error: undefined } })
    graphQLClientContext.setHeader("Authorization", null)
    sessionStorage?.removeItem?.("_the_fernandezes_session")
    localStorage?.removeItem?.("_the_fernandezes_remember_me")
  }, [])

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
