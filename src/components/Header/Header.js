import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { DetailsContext } from "../../context"
import { About } from "../Panels"
import Search from "../Search/Search"
import UserActions from "../UserActions/UserActions"
import "./Header.scss"

const Header = () => {
  const { openPanel } = useContext(DetailsContext)
  return (
    <header>
      <div className='title'>
        <h1>The Fernandezes</h1>
        <h2>World Tour</h2>
        <button onClick={() => openPanel(<About />)} title='About'>
          ?
        </button>
      </div>
      <Search />
      <Outlet />
      <UserActions />
    </header>
  )
}

export default Header
