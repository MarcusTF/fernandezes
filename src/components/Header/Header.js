import { Details } from "../Details"
import Search from "../Search/Search"
import "./Header.scss"

const Header = () => {
  return (
    <header>
      <div className='title'>
        <h1>The Fernandezes</h1>
        <h2>World Tour</h2>
        <button title='About'>?</button>
      </div>
      <Search />
      <Details />
    </header>
  )
}

export default Header
