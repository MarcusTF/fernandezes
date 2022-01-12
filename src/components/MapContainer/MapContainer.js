import { Map, ZoomControl } from "pigeon-maps"
import { useContext } from "react"
import { MapContext } from "../../context/map"

const MapContainer = () => {
  const {
    center,
    zoom,
    stops: { markers },
  } = useContext(MapContext)

  return (
    <div className='map'>
      <Map attribution={false} center={center} zoom={zoom}>
        <ZoomControl style={{ left: "unset", right: 10, top: "unset", bottom: 10, zIndex: 100 }} />
        {markers}
      </Map>
    </div>
  )
}

export default MapContainer
