import dayjs from "dayjs"
import { useQuery } from "graphql-hooks"
import { Map, Marker, ZoomControl } from "pigeon-maps"
import { useContext } from "react"
import { GET_ALL_STOPS } from "../../context/graphql/Queries"
import { MapContext } from "../../context/map"
import { useGenerateMarkers } from "../../utils/hooks"

const MapContainer = () => {
  const { data, loading, error } = useQuery(GET_ALL_STOPS)
  const { center, zoom } = useContext(MapContext)

  const markers = useGenerateMarkers(data?.stops?.nodes)

  return (
    <Map center={center} zoom={zoom}>
      {loading ? <h1>LOADING</h1> : null}
      <ZoomControl style={{ left: "unset", right: 50, top: 50, zIndex: 100 }} />
      {markers}
    </Map>
  )
}

export default MapContainer
