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
        capabilities
        authToken: jwtAuthToken
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
