import { useManualQuery } from "graphql-hooks"
import React, { createContext, useCallback, useReducer } from "react"
import { GET_STOP } from "../graphql/Queries"
import { default as DetailsReducer, initialState } from "./DetailsReducer"

// KEYS
export const keys = {
  OPEN_STOP: "OPEN_STOP",
}

export const DetailsContext = createContext(initialState)

export const DetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DetailsReducer, initialState)

  const [getStopById] = useManualQuery(GET_STOP)

  const getStop = useCallback(
    async id => {
      if (!id) dispatch({ type: keys.OPEN_STOP, payload: { data: undefined, loading: false, error: undefined } })
      dispatch({ type: keys.OPEN_STOP, payload: { data: undefined, loading: true, error: undefined } })
      try {
        const res = await getStopById({ variables: { id } })
        if (res.error) return dispatch({ type: keys.OPEN_STOP, payload: { ...res, loading: false } })
        return dispatch({ type: keys.OPEN_STOP, payload: { data: res?.data?.stop, loading: false, error: undefined } })
      } catch (error) {
        dispatch({ type: keys.OPEN_STOP, payload: { data: undefined, loading: false, error } })
      }
    },
    [getStopById]
  )

  return (
    <DetailsContext.Provider
      value={{
        ...state,
        getStop,
      }}
    >
      {children}
    </DetailsContext.Provider>
  )
}
