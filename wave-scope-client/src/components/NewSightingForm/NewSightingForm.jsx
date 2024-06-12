import { useEffect, useState } from "react"
import { Form, Button, Image, Row, Col, Container, CloseButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import Loader from "../Loader/Loader"
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import uploadServices from "../../services/upload.services"

const NewSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)

    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null)
    const navigate = useNavigate()

    const [newSighting, setNewSighting] = useState({
        images: [],
        latitude: '',
        longitude: '',
        beach: '',
        specimen: '',
        user: '',
        comment: '',
        confirmations: [],
        rejections: []
    })

    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {

        beachServices
            .getAllBeaches()
            .then(({ data }) => {
                setBeaches(data)
                setBeachesLoading(false)
            })
            .catch(err => console.log(err))

        specimenServices
            .getAllSpecimens()
            .then(({ data }) => {
                setSpecimens(data)
                setSpecimensLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleFormChange = e => {
        const { name, value } = e.target
        setNewSighting({ ...newSighting, [name]: value })
    }

    const handleSwitchChange = e => {
        setOnsite(!onSite)
    }

    const handleFileUpload = e => {

        setLoadingImage(true)
        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imageData', e.target.files[i])
        }

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setNewSighting({ ...newSighting, images: data.cloudinary_urls })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleFileDelete = (_, index) => {
        const updatedFiles = [...newSighting.images]
        updatedFiles.splice(index, 1)
        setNewSighting({ ...newSighting, images: updatedFiles })
    }

    const handleModalClose = () => setModalShow(false)
    const handleModalShow = () => setModalShow(true)

    const showErr = err => {

        console.log("GetCurrentPosition couldn't retrieve data:", err)
        console.log("Retriving coordinates from chosen beach.")
    }

    const showPos = (pos) => {

        const updatedSighting = {
            ...newSighting,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString()
        }

        setNewSighting(updatedSighting)
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (!newSighting.beach ||
            !newSighting.specimen ||
            newSighting.beach === 'Beaches' ||
            newSighting.specimen === 'Specimens') {
            handleModalShow()
            return
        }

        if (onSite) navigator.geolocation.getCurrentPosition(showPos, showErr)

        if (!onSite || newSighting.latitude === '' || newSighting.longitude === '') {

            const selectedBeach = beaches.find(beach => beach._id === newSighting.beach)
            const updatedSighting = newSighting
            updatedSighting.latitude = selectedBeach.location.coordinates[1].toString()
            updatedSighting.longitude = selectedBeach.location.coordinates[0].toString()

            setNewSighting(updatedSighting)

        }

        sightingServices
            .newSighting(newSighting)
            .then(navigate('/sightings'))
            .catch(err => console.log(err))

    }

    return (
        <div >
            {(beachesLoading || specimensLoading) ? <Loader /> :
                <Container className="NewSightingForm pb-3">
                    <Form onSubmit={handleSubmitSightingForm} className="mt-5 mb-5">
                        <Row>

                            <Form.Group
                                as={Col}
                                xs={{ span: 12 }}
                                sm={{ span: 6 }}
                                className="mt-3 mb-3">
                                <Form.Label className="h6">Select sighting place</Form.Label>
                                <Form.Select
                                    name="beach"
                                    value={newSighting.beach}
                                    onChange={handleFormChange}
                                    aria-label="Default select example">
                                    <option>Beaches</option>
                                    {beaches.map(beach =>
                                        <option key={beach._id} value={beach._id}>{beach.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                                xs={{ span: 12 }}
                                sm={{ span: 6 }}
                                className="mt-3 mb-3">
                                <Form.Label className="h6">Select creature sighted</Form.Label>
                                <Form.Select
                                    name="specimen"
                                    value={newSighting.specimen}
                                    onChange={handleFormChange}
                                    aria-label="Default select example">
                                    <option>Specimens</option>
                                    {specimens.map(specimen =>
                                        <option key={specimen._id} value={specimen._id}>{specimen.commonName}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Check
                            className="mt-3 mb-3 h6"
                            type="switch"
                            id="custom-switch"
                            label="I'm reporting on site"
                            onChange={handleSwitchChange}
                        />

                        <Row>
                            <Form.Group
                                as={Col}
                                xs={{ span: 12 }}
                                sm={{ span: 8, offset: 2 }}
                                md={{ span: 8, offset: 2 }}
                                className="mt-3 mb-3 h6">
                                <Form.Label>Upload pictures</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload} />
                            </Form.Group>
                        </Row>

                        <Row className="p-3 d-flex align-items-start">
                            {
                                newSighting.images.length > 0 &&
                                newSighting.images.map((image, index) => (
                                    <Col
                                        md={{ span: 1 }}
                                        style={{
                                            position: 'relative'
                                        }}
                                        key={index}
                                        onMouseEnter={() => setHoveredImageIndex(index)}
                                        onMouseLeave={() => setHoveredImageIndex(null)}>
                                        <Image
                                            src={image}
                                            style={{
                                                height: '50px',
                                                width: 'auto',
                                                objectFit: 'cover',
                                            }} />
                                        {hoveredImageIndex === index &&
                                            <CloseButton
                                                style={{
                                                    position: "absolute",
                                                    top: "5px",
                                                    left: "15px"
                                                }}
                                                className="bg-danger"
                                                onClick={(event) => handleFileDelete(event, index)}
                                            />}
                                    </Col>
                                ))
                            }
                        </Row>

                        <Form.Group className="mt-3 mb-5 h6">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                name="comment"
                                type="text"
                                value={newSighting.comment}
                                onChange={handleFormChange}
                                placeholder="Add a brief description or additional info" />
                        </Form.Group>

                        <Button
                            className="d-block mx-auto custom-color-button"
                            disabled={loadingImage}
                            type="submit">
                            {loadingImage ? 'Loading image...' : 'Create new sighting'}
                        </Button>

                        <ModalConfirm
                            show={modalShow}
                            handleClose={handleModalClose}
                            handleConfirm={handleModalClose}
                            titleMessage={'Required fields incomplete'}
                            bodyMessage={'Please choose both a beach and a specimen.'}
                            buttonMessage={'Ok'} />
                    </Form>
                </Container>
            }
        </div>
    )

}

export default NewSightingForm