import { useNavigate } from "react-router-dom"
import "./UserActions.scss"

const UserActions = () => {
  const navigate = useNavigate()
  return (
    <div className='actions'>
      <button onClick={() => navigate("login")}>Log In</button>
      <button>Sign Up</button>
    </div>
  )
}

export default UserActions
