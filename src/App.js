import { useQuery } from "graphql-hooks"
import { GET_ALL_STOPS } from "./context/graphql/Queries"

import "./App.scss"
import { Map, Marker, ZoomControl } from "pigeon-maps"

function App() {
  const { data, loading, error } = useQuery(GET_ALL_STOPS)

  return (
    <div className='App'>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <Map center={[0, 0]} defaultZoom={3}>
          <ZoomControl />
          {data?.stops?.nodes?.map?.(stop => (
            <Marker anchor={[stop.location.lng, stop.location.lat]} />
          ))}
        </Map>
      )}
    </div>
  )
}

export default App
