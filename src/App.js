import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { useContext } from "react"
import { MapContext } from "./context/map"
import Header from "./components/Header/Header"
import Loading from "./components/Loading/Loading"
import { Route, Routes } from "react-router-dom"
import { DetailsContent } from "./components/Details"
import { About } from "./components/Panels"

function App() {
  const {
    stops: { loading },
  } = useContext(MapContext)

  return (
    <div className='App'>
      {loading && <Loading />}
      <Routes>
        <Route path='' element={<Header />}>
          <Route path='stop/:stopId' element={<DetailsContent />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<div>LOGIN</div>} />
        </Route>
        <Route path='*' element={<Header />} />
      </Routes>
      <MapContainer />
    </div>
  )
}

export default App
