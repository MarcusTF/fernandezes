import { useContext, useEffect, useRef, useState } from "react"
import Lottie from "react-lottie-player"
import { useNavigate, useParams } from "react-router-dom"
import { loadingLottieData } from "../../assets/lottie"
import { SearchIcon, XIcon } from "../../assets/vector"
import { DetailsContext } from "../../context"
import { MapContext } from "../../context/map"
import { useDebounce } from "../../utils/hooks"

import "./Search.scss"

const Search = () => {
  const { getStops, setMap } = useContext(MapContext)
  const {
    getStop,
    stop: { data: stop, loading, error },
  } = useContext(DetailsContext)

  const [search, setSearch] = useState("")
  const lastSearch = useRef("")

  const { stopId } = useParams()
  const navigate = useNavigate()

  useDebounce(
    () => {
      getStop(null)
      getStops(search)
      lastSearch.current = search
    },
    [search, stop?.title],
    1000,
    stop?.title?.toLowerCase?.() !== search?.toLowerCase?.() &&
      search?.toLowerCase?.() !== lastSearch?.current?.toLowerCase?.()
  )

  useEffect(() => {
    if (stopId && !search && !stop) {
      getStop(stopId)
      return
    }
    if (stopId && stop?.id === stopId && !search) {
      getStops(stop?.title, false)
      lastSearch.current = stop?.title
      setSearch(stop.title)
      return
    }
    if (stop?.title && stop?.id !== stopId) {
      getStops(stop?.title, false)
      lastSearch.current = stop?.title
      setSearch(stop.title)
      navigate(`/stop/${stop?.id}`)
    }
  }, [getStop, getStops, navigate, search, setMap, stop, stopId])

  // useEffect(() => {
  //   if (stopId) {
  //     getStop(stopId)
  //   }
  // }, [getStop, stopId])

  return (
    <div className='input-wrapper'>
      <SearchIcon role='img' aria-label='magnifying glass icon' />
      <input
        autoComplete='off'
        placeholder='Find a stop...'
        onChange={e => setSearch(e.target.value)}
        value={search}
        type='text'
        name='search'
        id='search'
      />
      {search && (
        <XIcon
          role='button'
          aria-label='clear search'
          className='clear'
          onClick={() => {
            setSearch("")
            lastSearch.current = ""
            getStop(null)
            navigate("/")
            getStops("")
          }}
        />
      )}
    </div>
  )
}

export default Search
