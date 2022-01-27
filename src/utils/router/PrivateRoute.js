import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context"
import { useStoredUser } from "../hooks"

const PrivateRoute = ({ children, invert }) => {
  const user = useStoredUser()

  if (invert) return user ? <Navigate to={"/"} /> : children
  return user ? children : <Navigate to={"/login"} />
}

export default PrivateRoute
