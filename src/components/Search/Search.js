import { useContext, useEffect, useState } from "react"
import { SearchIcon } from "../../assets/vector"
import { MapContext } from "../../context/map"
import { useDebounce } from "../../utils/hooks"

import "./Search.scss"

const Search = () => {
  const { getStops } = useContext(MapContext)
  const [search, setSearch] = useState("")

  useDebounce(() => getStops(search), [search], 1000)

  return (
    <div className='input-wrapper'>
      <SearchIcon />
      <input
        autoComplete='off'
        placeholder='Find a stop...'
        onChange={e => setSearch(e.target.value)}
        value={search}
        type='text'
        name='search'
        id='search'
      />
    </div>
  )
}

export default Search
