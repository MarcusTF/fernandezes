import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { useContext, useEffect } from "react"
import { MapContext } from "./context/map"

function App() {
  const {
    getStops,
    stops: { loading },
  } = useContext(MapContext)

  useEffect(() => getStops(), [getStops])

  // const loading = true

  return (
    <div className='App'>
      <MapContainer />
    </div>
  )
}

export default App
