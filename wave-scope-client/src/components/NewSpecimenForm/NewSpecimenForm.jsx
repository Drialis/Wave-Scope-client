import { useState } from "react"
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap"
import specimenServices from "../../services/specimen.services"
import { useNavigate } from "react-router-dom"
import { SPECIMEN_HABITAT, SPECIMEN_ISENDEMIC } from "../../data/lists.data"
import uploadServices from "../../services/upload.services"


const NewSpecimenForm = () => {

  const [specimenFormData, setSpecimenFormData] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: 'Yes',
    habitat: 'Air',
    description: '',
    images: []
  })

  const [loadingImage, setLoadingImage] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = e => {
    const { value, name } = e.target
    setSpecimenFormData({ ...specimenFormData, [name]: value })
  }

  const handleFileUpload = (e) => {

    setLoadingImage(true)

    //creando un formulario en la memoria del equipo con new FormData() y puede tener todos los campos que quiera
    //en esta línea estamos creando un nuevo campo de este nuevo formulario y le estamos dando como target del evento la primera de las files, los inputs de tipo file tienen una propiedad .files dentro de su target (un array con imágenes seleccionadas)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices

      //le mandamos un formulario que no es real pero que está guardado en memoria con un campo que lleva la imagen y lo mandamos al servicio de subida

      .uploadImage(formData)
      .then(({ data }) => {
        setSpecimenFormData({ ...specimenFormData, images: data.cloudinary_urls })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })

  }

  const handleFileDelete = (_, index) => {
    const updatedFiles = [...specimenFormData.images]
    updatedFiles.splice(index, 1)
    setSpecimenFormData({ ...specimenFormData, images: updatedFiles })
  }

  const handleSubmit = e => {

    e.preventDefault()

    const fullSpecimen = {
      ...specimenFormData
    }

    specimenServices
      .newSpecimen(fullSpecimen)
      .then(() => navigate('/marine-life'))
      .catch(err => console.log(err))
  }


  return (
    <Container className="NewSpecimenForm mb-5">

      <Form onSubmit={handleSubmit}>
        <Form.Group className="" >
          <Form.Label className="mb-3 h4">Common Name</Form.Label>
          <Form.Control className='mb-3' type="text" value={specimenFormData.commonName} onChange={handleInputChange} name='commonName' placeholder="Ex: Correlimos tridáctilo" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h4">Scientific Name</Form.Label>
          <Form.Control className='mb-3' type="text" value={specimenFormData.scientificName} onChange={handleInputChange} name='scientificName' placeholder="Ex: Calidris alba" />
          <br />
        </Form.Group>

        <Form.Group className="" >
          <Form.Label className="mb-3 h4">Medium size of specimen</Form.Label>
          <Form.Control className='mb-3' type="text" value={specimenFormData.mediumSize} onChange={handleInputChange} name='mediumSize' placeholder="Enter the medium size of the specimen" />
          <br />
        </Form.Group>

        <Row>
          <Col >

            <Form.Group  >
              <Form.Label className="mb-3 h4">Is the specimen endemic to the area?</Form.Label>
              <Form.Select
                className='mb-5'
                value={specimenFormData.isEndemic}
                name='isEndemic'
                onChange={handleInputChange} >
                {
                  SPECIMEN_ISENDEMIC.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group  >
              <Form.Label className="mb-3 h4">Select the type of habitat of the specimen</Form.Label>
              <Form.Select
                className='mb-5'
                value={specimenFormData.habitat}
                name='habitat'
                onChange={handleInputChange} >

                {
                  SPECIMEN_HABITAT.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                }
              </Form.Select>
              <br />
            </Form.Group>
          </Col>

        </Row>

        <Form.Group  >
          <Form.Label className="mb-3 h4">Give a small description of the specimen and its characteristics</Form.Label>
          <Form.Control className='mb-3' type="text" as='textarea' rows='5' value={specimenFormData.description} onChange={handleInputChange} name='description' placeholder="Description of the specimen" />
          <br />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label className="h4">Add a set of pictures of the specimen</Form.Label>
          <Form.Control className='mb-3' type="file" multiple onChange={handleFileUpload} />
        </Form.Group>
        <Row className="p-3 d-flex align-items-start">
          {
            specimenFormData.images.length > 0 &&
            specimenFormData.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                style={{
                  height: '50px',
                  width: 'auto',
                  objectFit: 'cover'
                }}
                onClick={(event) => handleFileDelete(event, index)}
              />
            ))
          }
        </Row>

        <Button variant="primary" type="submit" className="mb-3 custom-color-button" disabled={loadingImage}>
          {loadingImage ? 'Loading image...' : 'Create new specimen'}
        </Button>


      </Form>
    </Container>

  )
}

export default NewSpecimenForm
