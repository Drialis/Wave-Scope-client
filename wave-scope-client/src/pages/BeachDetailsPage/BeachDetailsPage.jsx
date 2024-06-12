import './BeachDetailsPage.css'
import { Button, Card, Carousel, CardBody, Badge, Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loader from "../../components/Loader/Loader"
import beachServices from "../../services/beach.services"
import CustomMap from '../../components/CustomMap/CustomMap'
import SightingsByBeach from '../../components/SightingsByBeach/SightingsByBeach'
import { AuthContext } from '../../contexts/auth.context'


const BeachDetailsPage = () => {

  const { loggedUser } = useContext(AuthContext)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const showConfirmModal = () => setShow(true)

  const [isLoading, setIsLoading] = useState(true)
  const [beach, setBeach] = useState({})
  const { beachId } = useParams()

  useEffect(() => {
    loadBeachDetails()
  }, [])

  const loadBeachDetails = () => {

    beachServices
      .getOneBeach(beachId)
      .then(({ data }) => {
        setBeach(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const navigate = useNavigate()

  const deleteThisBeach = () => {

    beachServices
      .deleteBeach(beachId)
      .then(() => {
        handleClose()
        navigate(`/beaches`)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container className='BeachDetailsPage mt-5'>

      <div>
        {
          isLoading
            ?
            <Loader />
            :
            <>
              <Card className="BeachDetailsCard">
                <Card.Body>
                  <Carousel>
                    {
                      beach.images.length !== 0 ?
                        beach.images.map((image, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100 img-fluid"
                              style={{ height: 450, objectFit: "cover", objectPosition: "center bottom" }}
                              src={image}
                              alt={beach.name} />
                          </Carousel.Item>
                        ))
                        :
                        <Carousel.Item>
                          <img
                            className="d-block w-100 img-fluid mt-5 rounded"
                            style={{ height: 450, objectFit: "cover", objectPosition: "center top" }}
                            src="https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717428275/Anadir_un_titulo_2_zruph6.png"
                            alt="pic-not-provided" />
                        </Carousel.Item>
                    }
                  </Carousel>
                  <br />
                  <CustomMap
                    zoom={13}
                    center={beach.location}
                    centerName={beach.name}
                    markers={beach.nearBusStops}
                    type={'beach'}
                  />

                </Card.Body>
                <Card.Body>
                  <Card.Title>{`${beach.name}`}</Card.Title>
                  <Card.Text>
                    {`Location: ${beach.location.coordinates[0]}, ${beach.location.coordinates[1]} `}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className="Description">
                    {beach.description}
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text className='h6'>
                    Nearest Bus Stops
                  </Card.Text>

                  {beach.nearBusStops.map((busStop, index) =>
                    <div key={busStop._id}>
                      <h3 className="fs-6 mt-3">• {busStop.name}</h3>
                      {busStop.lines.map((line, index) =>
                        <Badge
                          key={index}
                          bg="info"
                          style={{ marginRight: '2px' }}>
                          {line}
                        </Badge>
                      )}
                    </div>
                  )}

                </Card.Body>

                <Card.Body>
                  <Link to='/beaches'>
                    <Button className="custom-color-button mb-3">Nearest beaches</Button>
                  </Link>

                </Card.Body>
              </Card>
              {
                loggedUser.role === 'admin' &&

                <Row className=''>
                  <Col md={{ span: 6 }} className='m-3'>
                    <Link to={`/beaches/edit/${beachId}`}>
                      <Button className="custom-color-button">Edit this beach </Button>
                    </Link>
                    <Button className='delete-color-button button-margin' style={{ marginLeft: '10px' }} onClick={showConfirmModal}> Delete this beach</Button>

                  </Col>
                </Row>

              }
              <Row>
                <SightingsByBeach />

                < Link to={'/sightings/new'} style={{ textDecoration: 'none' }}>
                  <Button className="custom-color-button d-block mx-auto mb-5">Add your own sighting</Button>
                </Link>
              </Row>
              <ModalConfirm show={show}
                handleClose={handleClose}
                handleConfirm={deleteThisBeach}
                titleMessage={'Confirm deletion'}
                bodyMessage={'This will remove the current beach.'}
                buttonMessage={'Confirm'} />
            </>
        }
      </div>
    </Container>
  )
}

export default BeachDetailsPage