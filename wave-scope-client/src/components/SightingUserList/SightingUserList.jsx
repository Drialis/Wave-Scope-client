import { useEffect, useState } from "react"
import sightingServices from "../../services/sighting.services"
import Loader from "../Loader/Loader"
import { Container, Row, Col } from "react-bootstrap"
import SightingCard from "../SightingCard/SightingCard"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const SightingUserList = ({ user }) => {

  const [sightings, setSightings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { loggedUser } = useContext(AuthContext)


  useEffect(() => {
    loadSightingUserList();
  }, [user])


  const loadSightingUserList = () => {
    sightingServices
      .getAllSightings()
      .then(({ data }) => {
        const userSightings = data.filter(elm => elm.user._id === loggedUser._id)
        setSightings(userSightings)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Container className="WelcomePage mb-5">
      <div >
        <br />
        {
          isLoading
            ?
            <Loader />
            :
            <Container className="SightingsList mb-5">

              <Row className="mb-3">
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
            </Container>
        }
      </div>
    </Container>
  )
}

export default SightingUserList