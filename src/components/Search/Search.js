import { useContext, useEffect, useRef, useState } from "react"
import Lottie from "react-lottie-player"
import { loadingLottieData } from "../../assets/lottie"
import { SearchIcon, XIcon } from "../../assets/vector"
import { DetailsContext } from "../../context"
import { MapContext } from "../../context/map"
import { useDebounce } from "../../utils/hooks"

import "./Search.scss"

const Search = () => {
  const { getStops } = useContext(MapContext)
  const {
    getStop,
    stop: { data: stop, loading, error },
  } = useContext(DetailsContext)

  const [search, setSearch] = useState("")
  const lastSearch = useRef("")

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
    if (stop?.title) {
      setSearch(stop.title)
      lastSearch.current = stop?.title
    }
  }, [stop?.title])

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
            getStops("")
          }}
        />
      )}
    </div>
  )
}

export default Search
