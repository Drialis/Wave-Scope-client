import { useEffect, useState } from "react"
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap"
import specimenServices from "../../services/specimen.services"
import { useNavigate, useParams } from "react-router-dom"
import { SPECIMEN_HABITAT, SPECIMEN_ISENDEMIC } from "../../data/lists.data"
import uploadServices from "../../services/upload.services"


const EditSpecimenForm = () => {



  const { specimenId } = useParams()
  const navigate = useNavigate()
  const [loadingImage, setLoadingImage] = useState(true)

  const [editSpecimenData, setEditSpecimenData] = useState({
    commonName: '',
    scientificName: '',
    mediumSize: '',
    isEndemic: '',
    habitat: '',
    description: '',
    images: []
  })

  useEffect(() => {
    loadSpecimenData()
  }, [])

  const loadSpecimenData = () => {

    specimenServices
      .getOneSpecimen(specimenId)
      .then(({ data }) => {
        setEditSpecimenData({
          ...data,
          isEndemic: data.isEndemic,
          habitat: data.habitat,
          images: data.images
        })
        setLoadingImage(false)
      })
      .catch(err => console.log(err))
  }


  const handleInputChange = e => {

    const { value, name } = e.target
    setEditSpecimenData({ ...editSpecimenData, [name]: value })

  }

  const handleFileUpload = (e) => {

    setLoadingImage(true)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices
      .uploadImage(formData)
      .then(({ data }) => {
        const oldImages = editSpecimenData.images
        const newImages = data.cloudinary_urls
        setEditSpecimenData({ ...editSpecimenData, images: [...oldImages, ...newImages] })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })

  }

  const handleFileDelete = (_, index) => {
    const updatedFiles = [...editSpecimenData.images]
    updatedFiles.splice(index, 1)
    setEditSpecimenData({ ...editSpecimenData, images: updatedFiles })
  }

  const handleSubmit = e => {

    e.preventDefault()

    const fullSpecimen = {
      images: editSpecimenData.images,
      commonName: editSpecimenData.commonName,
      scientificName: editSpecimenData.scientificName,
      mediumSize: editSpecimenData.mediumSize,
      isEndemic: editSpecimenData.isEndemic,
      habitat: editSpecimenData.habitat,
      description: editSpecimenData.description
    }

    specimenServices
      .editSpecimen(specimenId, fullSpecimen)
      .then(() => navigate('/marine-life'))
      .catch(err => console.log(err))
  }

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group className="" >
        <Form.Label className="mb-3 h4">Common Name</Form.Label>
        <Form.Control type="text" value={editSpecimenData.commonName} onChange={handleInputChange} name='commonName' placeholder="Ex: Correlimos tridáctilo" />
        <br />
      </Form.Group>

      <Form.Group className="" >
        <Form.Label className="mb-3 h4">Scientific Name</Form.Label>
        <Form.Control type="text" value={editSpecimenData.scientificName} onChange={handleInputChange} name='scientificName' placeholder="Ex: Calidris alba" />
        <br />
      </Form.Group>

      <Form.Group className="" >
        <Form.Label className="mb-3 h4">Medium size of specimen</Form.Label>
        <Form.Control type="text" value={editSpecimenData.mediumSize} onChange={handleInputChange} name='mediumSize' placeholder="Enter the medium size of the specimen" />
        <br />
      </Form.Group>

      <Row>
        <Col >

          <Form.Group  >
            <Form.Label className="mb-3 h4">Is the specimen endemic to the area?</Form.Label>
            <Form.Select
              value={editSpecimenData.isEndemic}
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
              value={editSpecimenData.habitat}
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
        <Form.Label className="mb-3 h5">Give a small description of the specimen and its characteristics</Form.Label>
        <Form.Control type="text" as='textarea' rows='5' value={editSpecimenData.description} onChange={handleInputChange} name='description' placeholder="Description of the specimen" />
        <br />
      </Form.Group>

      <Form.Group className="mb-3" controlId="image">
        <Form.Label className="h4">Add a set of pictures of the specimen</Form.Label>
        <Form.Control type="file" multiple onChange={handleFileUpload} />
      </Form.Group>
      <Row className="p-3 d-flex align-items-start">
        {
          editSpecimenData.images.length > 0 &&
          editSpecimenData.images.map((image, index) => (
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

      <Button variant="primary" type="submit" className="mb-5 custom-color-button" disabled={loadingImage}>
        {loadingImage ? 'Loading image...' : '🖫 Save Changes'}
      </Button>


    </Form>
  )
}

export default EditSpecimenForm