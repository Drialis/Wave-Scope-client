
import { Container, Row, Col, Card } from "react-bootstrap"
import SightingUserList from "../../components/SightingUserList/SightingUserList"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import sightingServices from "../../services/sighting.services"
import SightingCard from "../../components/SightingCard/SightingCard"
import beachServices from "../../services/beach.services"
import CustomMap from "../../components/CustomMap/CustomMap"
import './WelcomePage.css'



const WelcomePage = () => {
  const { loggedUser } = useContext(AuthContext)

  const [sightings, setSightings] = useState()
  const [isSightingsLoading, setSightingsLoading] = useState(true)
  const [isBeachesLoading, setBeachesLoading] = useState(true)
  const [beaches, setBeaches] = useState([])

  useEffect(() => {
    loadAllSightings()
  }, [])

  const loadAllSightings = () => {

    sightingServices
      .getAllSightings({ totalItems: 3 })
      .then(({ data }) => {
        setSightings(data);
        setSightingsLoading(false)
      })
      .catch(err => console.log(err))

  }

  useEffect(() => {
    loadBeaches()
  }, [])


  const loadBeaches = () => {
    beachServices
      .getAllBeaches('/beaches')
      .then(({ data }) => {
        setBeaches(data)
        setBeachesLoading(false)
      })
      .catch(err => console.log(err))
  }

  const userPosition = {}

  userPosition.coordinates = []

  const showPos = (pos) => {

    userPosition.coordinates[0] = Number(pos.coords.longitude)
    userPosition.coordinates[1] = Number(pos.coords.latitude)

  }

  const showErr = err => {
    console.log("GetCurrentPosition couldn't retrieve data:", err)
  }

  navigator.geolocation.getCurrentPosition(showPos, showErr)

  return (
    <Container className="WelcomePage mx-auto mt-3">
      <h1 className="m-5 text-center">{`Welcome to the wave, ${loggedUser.username}`}</h1>
      <Row>
        <h3 style={{ marginLeft: '0.75rem' }}>Your Sightings</h3>
        <SightingUserList />
      </Row>

      <Row>
        <Card.Body className="p-2 MapCard" >
          <Card.Title className="m-5">
            <h2 className="text-center"
              style={{ color: '#023047' }}> Your visited coastal sites</h2>
          </Card.Title>
          {
            isBeachesLoading
              ?
              <Loader />
              :
              <CustomMap
                zoom={3}
                center={userPosition}
                markers={beaches}
                type={'welcomeBeach'}
              />
          }
        </Card.Body>
      </Row>

      <h3 className="mt-5">Recent Sightings of Wave Scope Community</h3>
      {
        isSightingsLoading
          ?
          <Loader />
          :
          <Row>
            {
              sightings.map(sighting =>
                <Col
                  key={sighting._id}
                  xs={{ span: 12 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                >
                  <SightingCard
                    name={sighting.specimen.commonName}
                    username={sighting.user.username}
                    {...sighting} />
                </Col>
              )
            }
          </Row>
      }

    </Container >
  )
}

export default WelcomePage