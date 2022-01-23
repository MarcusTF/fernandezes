import { Map, ZoomControl } from "pigeon-maps"
import { useContext } from "react"
import { MapContext } from "../../context"

const MapContainer = () => {
  const {
    center,
    zoom,
    stops: { markers },
  } = useContext(MapContext)

  return (
    <main className='map'>
      <Map onClick={e => console.log(e)} attribution={false} center={center} zoom={zoom}>
        <ZoomControl style={{ left: "unset", right: 10, top: "unset", bottom: 25, zIndex: 100 }} />
        {markers}
      </Map>
    </main>
  )
}

export default MapContainer
