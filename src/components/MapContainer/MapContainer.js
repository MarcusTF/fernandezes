import { Map, ZoomControl } from "pigeon-maps"
import { useContext, useEffect, useRef } from "react"
import { MapContext } from "../../context/map"

const MapContainer = () => {
  const {
    center,
    zoom,
    stops: { markers },
    setMapRef,
  } = useContext(MapContext)

  const map = useRef(null)

  useEffect(() => setMapRef(map.current), [setMapRef, map.current])

  return (
    <main ref={map} className='map'>
      <Map center={center} zoom={zoom}>
        <ZoomControl style={{ left: "unset", right: 10, top: "unset", bottom: 25, zIndex: 100 }} />
        {markers}
      </Map>
    </main>
  )
}

export default MapContainer
