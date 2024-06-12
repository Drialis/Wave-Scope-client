import { Row, Col, Container } from "react-bootstrap"
import BeachCard from "../BeachCard/BeachCard"
import Loader from "../Loader/Loader"
import CustomMap from "../CustomMap/CustomMap"
import { useContext, useEffect, useState } from "react"
import beachServices from "../../services/beach.services"
import { AuthContext } from "../../contexts/auth.context"


const BeachesList = () => {

  const [beaches, setBeaches] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const { loggedUser } = useContext(AuthContext)

  useEffect(() => {
    loadBeaches()
  }, [])

  const loadBeaches = () => {
    beachServices
      .getAllBeaches('/beaches')
      .then(({ data }) => {
        setBeaches(data)
        setIsloading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {
        isLoading
          ?
          <Loader />
          :
          <Container className="mt-3">

            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <CustomMap
                  zoom={1}
                  center={beaches[0].location}
                  markers={beaches}
                  type={'beaches'}
                />
              </Col>
            </Row>

            <Row>
              {beaches.map(beach => {

                return (
                  <Col
                    key={beach._id}
                    md={{ span: 6 }}
                    lg={{ span: 4 }}
                  >

                    <BeachCard {...beach} />

                  </Col>
                )
              })
              }
            </Row>
          </Container>
      }
    </div>
  )
}

export default BeachesList