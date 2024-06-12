import { Button, Card, Carousel, Container } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import specimenServices from "../../services/specimen.services"
import Loader from "../../components/Loader/Loader"
import './MarineLifeDetailsPage.css'
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm"
import { AuthContext } from "../../contexts/auth.context"

const MarineLifeDetailsPage = () => {

  const [specimen, setSpecimen] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: '',
    images: []
  })

  const [loading, setLoading] = useState(true)
  const [modalShow, setModalShow] = useState(false)
  const { specimenId } = useParams()
  const { loggedUser, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader />
  }

  useEffect(() => {
    loadSpecimenDetails()
  }, [])

  const loadSpecimenDetails = () => {

    specimenServices
      .getOneSpecimen(specimenId)
      .then(({ data }) => {
        setSpecimen(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const handleModalClose = () => setModalShow(false)
  const handleModalShow = () => setModalShow(true)

  const handleDeleteSpecimen = () => {

    specimenServices
      .deleteSpecimen(specimenId)
      .then(navigate('/marine-life'))
      .catch(err => console.log(err))
  }


  return (
    <>
      {
        loading
          ?
          <Loader />
          :
          <Container className="SpecimenDetailsPage mt-3">

            <Card className="mb-3" style={{ marginLeft: '10px', marginRight: '10px' }}>
              <Card.Body>
                <Carousel className="specimen-carousel">
                  {
                    specimen.images.length !== 0 ?
                      specimen.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img className="carousel-image" src={image}
                            alt={specimen.commonName} />
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
                <Card.Title className="text-center mt-3">{specimen.commonName}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted text-center">{specimen.scientificName}</Card.Subtitle>
                <Card.Text className="Description">Medium size: {specimen.mediumSize} | Endemic: {specimen.isEndemic} | Usual habitat: {specimen.habitat}</Card.Text>

                <Card.Text className="Description">{specimen.description}</Card.Text>
              </Card.Body>
            </Card>
            {
              loggedUser.role === 'admin' &&
              <>
                <Link to={`/marine-life/edit/${specimenId}`}>
                  <Button className="custom-color-button mb-3" style={{ marginLeft: '10px' }}>Edit this specimen</Button>
                </Link>

                <Button className="delete-color-button mb-3" onClick={handleModalShow} style={{ marginLeft: '10px' }}>Delete this specimen</Button>

                <ModalConfirm
                  show={modalShow}
                  handleClose={handleModalClose}
                  handleConfirm={handleDeleteSpecimen}
                  titleMessage={'Confirm deletion'}
                  bodyMessage={'This will remove the current specimen.'}
                  buttonMessage={'Confirm'}
                />
              </>
            }
          </Container >
      }
    </>
  )
}


export default MarineLifeDetailsPage