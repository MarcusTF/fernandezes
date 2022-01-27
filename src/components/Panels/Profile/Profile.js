import { useContext } from "react"
import { AuthContext } from "../../../context"

const Profile = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='profile'>
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{user?.username}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Profile
