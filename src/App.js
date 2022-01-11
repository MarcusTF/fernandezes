import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { Header } from "./components/Header"
import { Loading } from "./components/Loading"
import { useContext, useEffect } from "react"
import { MapContext } from "./context/map"

function App() {
  const {
    getStops,
    stops: { loading },
  } = useContext(MapContext)

  useEffect(() => getStops(), [getStops])

  return (
    <div className='App'>
      {loading && <Loading />}
      <Header />
      <MapContainer />
    </div>
  )
}

export default App
