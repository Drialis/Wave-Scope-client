import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'

const MapReact = () => {

  const position = { lat: 28.140000, long: -15.436111 }

  return (
    <APIProvider apiKey={import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh' }}>
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  )
}

export default MapReact