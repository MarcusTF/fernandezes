import { useContext } from "react"
import { MapContext } from "context/map"
import { Route, Routes } from "react-router-dom"
import { DetailsContent } from "components/Details"
import { MapContainer } from "components/MapContainer"
import { About, Login, Profile, SignUp } from "components/Panels"

import Header from "components/Header/Header"
import Loading from "components/Loading/Loading"
import PrivateRoute from "utils/router/PrivateRoute"

import "./App.scss"

function App() {
  const {
    stops: { loading },
  } = useContext(MapContext)

  return (
    <div className='App'>
      {loading && <Loading />}
      <Routes>
        <Route path='' element={<Header />}>
          <Route path='/stop/:stopId' element={<DetailsContent />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/signup'
            element={
              <PrivateRoute invert>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='*' element={<Header />} />
      </Routes>
      <MapContainer />
    </div>
  )
}

export default App
