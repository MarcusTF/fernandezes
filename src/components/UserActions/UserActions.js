import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context"
import "./UserActions.scss"

const UserActions = () => {
  const [confirming, setConfirming] = useState(false)
  const navigate = useNavigate()

  const { user, logOut } = useContext(AuthContext)

  const makeSure = () => {
    setConfirming(true)
    setTimeout(() => setConfirming(false), 3000)
  }

  return !user ? (
    <div className='actions logged-out'>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  ) : (
    <div className='actions logged-in'>
      <button onClick={() => navigate("/filters")}>Filters</button>
      <button onClick={() => navigate("/profile")}>View Profile</button>
      {confirming ? (
        <button onClick={() => logOut()}>Confirm Log Out</button>
      ) : (
        <button onClick={() => makeSure()}>Log Out</button>
      )}
    </div>
  )
}

export default UserActions
