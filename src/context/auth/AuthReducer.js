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
  refresh: {
    loading: false,
    errors: undefined,
  },
  user: null,
  panel: null,
}

export const AuthReducer = (draft, { type, payload }) => {
  switch (type) {
    case keys.LOG_IN:
      const { user, ...rest } = payload
      draft.user = user
      return void (draft.authentication = rest)
    case keys.SIGN_UP:
      return void (draft.registration = payload)
    case keys.REFRESH: {
      const { authToken, errors } = payload
      if (authToken) {
        draft.user.authToken = authToken
        return void (draft.refresh = initialState.refresh)
      } else if (errors) {
        localStorage.clear()
        sessionStorage.clear()
        draft.user = null
        return void (draft.refresh = payload)
      } else return void (draft.refresh = payload)
    }
    default:
      return draft
  }
}

export default AuthReducer
