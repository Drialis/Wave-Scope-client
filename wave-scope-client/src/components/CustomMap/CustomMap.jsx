import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Card, Container } from 'react-bootstrap';

function CustomMap({ zoom, center, markers, type, centerName }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  })

  const [map, setMap] = useState(null)

  const onLoad = (map) => {
    //console.log('Aquí haz lo que necesites tras la carga del mapa')

  }
  const onUnmount = () => setMap(null)

  return isLoaded && (
    <Container className='mb-5'>
      <Card style={{ backgroundColor: '#FFFBEB', padding: '10px' }}>

        <GoogleMap
          mapContainerStyle={{
            height: '400px',
            width: 'auto'
          }}
          zoom={zoom}
          onLoad={onLoad}
          center={{ lat: center.coordinates[1], lng: center.coordinates[0] }}
          onUnmount={onUnmount}
        >

          {
            type === "sighting" &&
            <Marker
              position={{ lat: markers.coordinates[1], lng: markers.coordinates[0] }}
              icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
            />
          }
          {
            type === "beach" &&
            <>
              <Marker
                position={{ lat: center.coordinates[1], lng: center.coordinates[0] }}
                icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
                title={centerName}
              />
              {markers.map((stop, index) =>
                <Marker
                  key={index}
                  position={{ lat: Number(stop.latitude), lng: Number(stop.longitude) }}
                  icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                  title={stop.name}
                />
              )}
            </>
          }
          {
            type === 'beaches' &&
            <>
              {markers.map((beach, index) =>
                <Marker
                  key={index}
                  position={{ lat: beach.location.coordinates[1], lng: beach.location.coordinates[0] }}
                  icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
                  title={beach.name}
                />
              )}
            </>}
          {
            type === 'welcomeBeach' &&
            <>
              <Marker
                position={{ lat: center.coordinates[1], lng: center.coordinates[0] }}
                icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
              />
              {markers.map((beach, index) =>
                <Marker
                  key={index}
                  position={{ lat: beach.location.coordinates[1], lng: beach.location.coordinates[0] }}
                  icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
                  title={beach.name}
                />
              )}
            </>


          }

        </GoogleMap>
      </Card>
    </Container>
  )
}

export default CustomMap