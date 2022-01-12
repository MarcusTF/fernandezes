import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { useContext, useEffect } from "react"
import { MapContext } from "./context/map"
import Header from './components/Header/Header'
import Load

function App() {
  const {
    getStops,
    stops: { loading },
  } = useContext(MapContext)

  useEffect(() => getStops(), [getStops])

  // const loading = true

  return (
    <div className='App'>
      {loading && <Loading />}
      <Header />
      <MapContainer />
    </div>
  )
}

export default App
