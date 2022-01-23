import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context"
import "./UserActions.scss"

const UserActions = () => {
  const navigate = useNavigate()

  const { user, logOut } = useContext(AuthContext)

  return !user ? (
    <div className='actions logged-out'>
      <button onClick={() => navigate("login")}>Log In</button>
      <button onClick={() => navigate("signup")}>Sign Up</button>
    </div>
  ) : (
    <div className='actions logged-in'>
      <button onClick={() => navigate("profile")}>View Profile</button>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  )
}

export default UserActions
