import dayjs from "dayjs"
import { useQuery } from "graphql-hooks"
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { useContext } from "react"
import { GET_ALL_STOPS } from "../../context/graphql/Queries"
import { MapContext } from "../../context/map"
import Stops from "../Stops/Stops"

const MapContainer = () => {
  const { data, loading, error } = useQuery(GET_ALL_STOPS)
  const { center, zoom } = useContext(MapContext)

  return (
    <Map center={center} zoom={zoom}>
      <ZoomControl style={{ left: "unset", right: 50, top: 50, zIndex: 100 }} />
      {loading ? <h1>LOADING</h1> : data?.stops?.nodes ? <Stops stops={data?.stops?.nodes} /> : null}
    </Map>
  )
}

export default MapContainer
