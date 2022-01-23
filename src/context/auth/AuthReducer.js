import { keys } from "./AuthContext"

// STATE
export const initialState = {
  authentication: {
    loading: false,
    errors: undefined,
  },
  registration: {
    data: undefined,
    loading: false,
    errors: undefined,
  },
  user: null,
  panel: null,
}

export const AuthReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case keys.LOG_IN: {
      const { user, ...rest } = payload
      return { ...state, user, authentication: { ...rest } }
    }
    case keys.SIGN_UP: {
      return { ...state, registration: { ...payload } }
    }
    default:
      return state
  }
}

export default AuthReducer
