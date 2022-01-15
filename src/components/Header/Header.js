import { useContext } from "react"
import { DetailsContext } from "../../context"
import { Details } from "../Details"
import { About } from "../Panels"
import Search from "../Search/Search"
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
      <Details />
    </header>
  )
}

export default Header
