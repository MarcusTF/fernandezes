import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react/cjs/react.development"
import { AuthContext, DetailsContext, MapContext } from "../../context"
import { useOnce } from "../../utils/hooks"
import { Details } from "../Details"
import Search from "../Search/Search"
import UserActions from "../UserActions/UserActions"
import "./Header.scss"

const Header = () => {
  const navigate = useNavigate()

  const { stopId } = useParams()
  const {
    searchStops,
    stops: { data, loading },
  } = useContext(MapContext)
  const { pullUserFromStorage } = useContext(AuthContext)

  useEffect(() => pullUserFromStorage(), [pullUserFromStorage])
  useOnce(() => searchStops(), !stopId && !loading && !data)

  return (
    <header>
      <div className='title'>
        <h1 onClick={() => navigate("/")}>The Fernandezes</h1>
        <h2>World Tour</h2>
        <button tabIndex={0} onClick={() => navigate("about")} title='About'>
          ?
        </button>
      </div>
      <Search />
      <Details />
      <UserActions />
    </header>
  )
}

export default Header
