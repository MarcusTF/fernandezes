import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchIcon, XIcon } from "../../assets/vector"
import { DetailsContext } from "../../context"
import { MapContext } from "../../context/map"
import { useDebounce } from "../../utils/hooks"

import "./Search.scss"

const Search = () => {
  const {
    searchStops,
    setMap,
    stops: { loading: stopsLoading },
  } = useContext(MapContext)

  const {
    getStopDetails,
    stopDetails: { data: stop, loading, error },
  } = useContext(DetailsContext)

  const [search, setSearch] = useState("")
  const lastSearch = useRef("")

  const navigate = useNavigate()

  useDebounce(
    () => {
      getStopDetails(null)
      searchStops(search)
      lastSearch.current = search
    },
    [search, stop?.title],
    1000,
    stop?.title?.toLowerCase?.() !== search?.toLowerCase?.() &&
      search?.toLowerCase?.() !== lastSearch?.current?.toLowerCase?.()
  )

  useEffect(() => {
    if (stop?.title) {
      setSearch(stop?.title)
      lastSearch.current = stop?.title
    }
  }, [stop?.title])

  return (
    <div className='input-wrapper'>
      <SearchIcon role='img' aria-label='magnifying glass icon' />
      <input
        autoComplete='off'
        placeholder='Find a stop...'
        onChange={e => {
          navigate("")
          getStopDetails(null)
          setSearch(e.target.value)
        }}
        value={search}
        type='text'
        name='search'
        id='search'
      />
      {search && (
        <button
          tabIndex={0}
          className='clear'
          title='Clear search'
          onClick={() => {
            if (!stopsLoading) {
              setSearch("")
              lastSearch.current = ""
              getStopDetails(null)
              navigate("/")
              searchStops("")
            }
          }}
        >
          <XIcon className='clear' />
        </button>
      )}
    </div>
  )
}

export default Search
