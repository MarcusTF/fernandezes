import React, { useEffect } from "react"
import ReactDOM from "react-dom"

import { MapContainer } from "./components/MapContainer"

import "./App.scss"
import { useContext } from "react"
import { MapContext } from "./context/map"
import Header from "./components/Header/Header"
import Loading from "./components/Loading/Loading"
import { Route, Routes } from "react-router-dom"
import { DetailsContent } from "./components/Details"
import { About, Login, Profile, SignUp } from "./components/Panels"
import PrivateRoute from "./utils/router/PrivateRoute"
import { AuthContext } from "./context"

if (process.env.NODE_ENV !== "production") {
  const axe = require?.("@axe-core/react")
  axe?.(React, ReactDOM, 1000)
}

function App() {
  const {
      stops: { loading },
    } = useContext(MapContext),
    { user } = useContext(AuthContext)

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
