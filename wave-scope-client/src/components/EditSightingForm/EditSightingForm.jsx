import { useEffect, useState } from "react"
import { Form, Button, Image, Row, Col, Container, CloseButton } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import Loader from "../Loader/Loader"
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import beachServices from "../../services/beach.services"
import specimenServices from "../../services/specimen.services"
import sightingServices from "../../services/sighting.services"
import uploadServices from "../../services/upload.services"

const EditSightingForm = () => {

    const [beachesLoading, setBeachesLoading] = useState(true)
    const [specimensLoading, setSpecimensLoading] = useState(true)
    const [sightingLoading, setSightingLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(false)

    const [beaches, setBeaches] = useState()
    const [specimens, setSpecimens] = useState()
    const [onSite, setOnsite] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null)

    const { sightingId } = useParams()
    const navigate = useNavigate()

    const [sightingData, setSightingData] = useState({
        images: [],
        latitude: 0,
        longitude: 0,
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

        sightingServices
            .getOneSighting(sightingId)
            .then(({ data }) => {
                setSightingData({
                    images: data.images,
                    latitude: data.location.coordinates[1],
                    longitude: data.location.coordinates[0],
                    beach: data.beach._id,
                    specimen: data.specimen._id,
                    user: data.user._id,
                    comment: data.comment,
                    confirmations: data.confirmations,
                    rejections: data.rejections
                })
                setSightingLoading(false)
            })
            .catch(err => console.log(err))

    }

    const handleFormChange = e => {
        const { name, value } = e.target
        setSightingData({ ...sightingData, [name]: value })
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
                const oldImages = sightingData.images
                const newImages = data.cloudinary_urls
                setSightingData({ ...sightingData, images: [...oldImages, ...newImages] })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleFileDelete = (_, index) => {
        const updatedFiles = [...sightingData.images]
        updatedFiles.splice(index, 1)
        setSightingData({ ...sightingData, images: updatedFiles })
    }

    const handleModalClose = () => setModalShow(false)
    const handleModalShow = () => setModalShow(true)

    const showErr = err => {

        console.log("GetCurrentPosition couldn't retrieve data:", err)
    }

    const showPos = (pos) => {

        const updatedSighting = {
            ...sightingData,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString()
        }

        setSightingData(updatedSighting)
    }

    const handleSubmitSightingForm = e => {

        e.preventDefault()

        if (!sightingData.beach ||
            !sightingData.specimen ||
            sightingData.beach === 'Beaches' ||
            sightingData.specimen === 'Specimens') {
            handleModalShow()
            return
        }

        if (onSite) {

            navigator.geolocation.getCurrentPosition(showPos, showErr)

        }

        if (!onSite || sightingData.latitude === '' || sightingData.longitude === '') {

            const selectedBeach = beaches.find(beach => beach._id === sightingData.beach)
            const updatedSighting = sightingData
            updatedSighting.latitude = selectedBeach.location.coordinates[1].toString()
            updatedSighting.longitude = selectedBeach.location.coordinates[0].toString()

            setSightingData(updatedSighting)

        }

        sightingServices
            .editSighting(sightingId, sightingData)
            .then(navigate('/sightings'))
            .catch(err => console.log(err))

    }

    return (
        <div className="EditSightingForm">
            {(beachesLoading || specimensLoading || sightingLoading) ? <Loader /> :
                <Container className="pb-5">

                    <Form onSubmit={handleSubmitSightingForm} className="mt-3">

                        <Row>
                            <Form.Group
                                as={Col}
                                xs={{ span: 12 }}
                                sm={{ span: 6 }}
                                className="mt-3 mb-3">
                                <Form.Label className="h6">Select sighting place</Form.Label>
                                <Form.Select
                                    required
                                    name="beach"
                                    value={sightingData.beach}
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
                                    required
                                    name="specimen"
                                    value={sightingData.specimen}
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
                                className="mt-3 mb-3">
                                <Form.Label className="h6">Upload pictures</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload} />
                            </Form.Group>
                        </Row>

                        <Row className="p-3 d-flex align-items-start">
                            {
                                sightingData.images.length > 0 &&
                                sightingData.images.map((image, index) => (
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

                        <Form.Group className="mt-3 mb-3">
                            <Form.Label className="h6">Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                name="comment"
                                type="text"
                                value={sightingData.comment}
                                onChange={handleFormChange}
                                placeholder="Add a brief description or additional info" />
                        </Form.Group>

                        <Button
                            className="d-block mx-auto custom-color-button"
                            disabled={loadingImage}
                            variant="primary"
                            type="submit">
                            {loadingImage ? 'Loading image...' : '🖫 Save changes'}
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

export default EditSightingForm