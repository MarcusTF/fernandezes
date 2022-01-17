import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { useContext, useEffect } from "react"
import { MapContext } from "./context/map"
import Header from "./components/Header/Header"
import Loading from "./components/Loading/Loading"
import { useParams } from "react-router-dom"

function App() {
  const {
    getStops,
    stops: { loading },
  } = useContext(MapContext)

  const { stopId } = useParams()
  useEffect(() => !stopId && getStops(), [getStops, stopId])

  return (
    <div className='App'>
      {loading && <Loading />}
      <Header />
      <MapContainer />
    </div>
  )
}

export default App
