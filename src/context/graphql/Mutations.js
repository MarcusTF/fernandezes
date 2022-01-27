export const LOG_IN = `
mutation LogIn($password: String = "", $username: String = "") {
    login(input: {password: $password, username: $username}) {
      user {
        id
        name
        email
        nicename
        nickname
        registeredDate
        username
        userId
        roles {
          nodes {
            capabilities
            name
            displayName
          }
        }
        authToken: jwtAuthToken
        refreshToken: jwtRefreshToken
      }
    }
  }
  
`

export const SIGN_UP = `
  mutation SignUp($email: String = "", $password: String = "", $username: String = "") {
    registerUser(input: { username: $username, password: $password, email: $email }) {
      user {
        email
      }
    }
  }
`
export const REFRESH = `
  mutation refreshToken($refreshToken: String = "") {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`
