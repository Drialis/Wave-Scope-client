import { Form, Row, Col, InputGroup, Button, Image, CloseButton } from "react-bootstrap"
import { useState, useEffect } from "react"
import beachServices from "../../services/beach.services"
import { BEACH_COMPOSITION } from "../../data/lists.data"
import BusStopGroup from "../NewBeachForm/BusStopGroup"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../Loader/Loader"
import uploadServices from "../../services/upload.services"


const EditBeachForm = () => {

    const { beachId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(true)
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null)

    useEffect(() => {
        loadFormData()
    }, [])

    const loadFormData = () => {
        beachServices
            .getOneBeach(beachId)
            .then(({ data }) => {
                setBusStops(data.nearBusStops.map(elm => ({
                    name: elm.name,
                    latitude: elm.latitude,
                    longitude: elm.longitude,
                    lines: elm.lines
                })))
                setBeachData({
                    ...data,
                    latitude: data.location.coordinates[1],
                    longitude: data.location.coordinates[0]

                })
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }

    const [beachData, setBeachData] = useState({
        name: '',
        latitude: 0,
        longitude: 0,
        description: '',
        length: 1,
        composition: '',
        sectors: 1,
        images: []
    })

    const [busStops, setBusStops] = useState([
        {}
    ])

    const handleBusStopChange = (idx, busStopInfo) => {
        const busStopsCopy = [...busStops]
        busStopsCopy[idx] = busStopInfo
        setBusStops(busStopsCopy)
    }

    const addNewBusStop = () => {
        const newStop = {}
        const newBusStops = [...busStops, newStop]
        setBusStops(newBusStops)
    }

    const deleteBusStop = (index) => {
        const updatedBusStops = [...busStops]
        if (updatedBusStops.length > 1) {
            updatedBusStops.splice(index, 1)
            setBusStops(updatedBusStops)
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setBeachData({ ...beachData, [name]: value })
    }
    const handleFileDelete = (_, index) => {
        const updatedFiles = [...beachData.images]
        updatedFiles.splice(index, 1)
        setBeachData({ ...beachData, images: updatedFiles })
    }

    const [loadingImage, setLoadingImage] = useState(false)
    const handleFileUpload = (e) => {

        setLoadingImage(true)

        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imageData', e.target.files[i])
        }

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                const oldImages = beachData.images
                const newImages = data.cloudinary_urls

                setBeachData({ ...beachData, images: [...oldImages, ...newImages] })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleBeachFormSubmit = e => {

        const fullBeach = {
            images: beachData.images,
            name: beachData.name,
            composition: beachData.composition,
            description: beachData.description,
            services: beachData.services,
            longitude: Number(beachData.longitude),
            latitude: Number(beachData.latitude),
            length: Number(beachData.length),
            sectors: Number(beachData.sectors),
            nearBusStops: busStops
        }

        e.preventDefault()

        if (!beachData.name || !beachData.composition || beachData.composition === "Choose a composition" || !beachData.description) {
            handleModalShow()
            return
        }

        beachServices
            .editBeach(beachId, fullBeach)
            .then(() => {
                navigate('/beaches')
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


                    <Form className="NewBeachForm mt-5 mb-5" onSubmit={handleBeachFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="h3">Beach Name</Form.Label>
                            <Form.Control placeholder="Ex. Las Canteras" name="name" value={beachData.name} onChange={handleInputChange} required />

                        </Form.Group>
                        <br />

                        <Form.Group className="mb-3">
                            <Form.Label className="h4">Coordinates</Form.Label>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label className="h6">Latitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="latitude"
                                        placeholder="Ex. 28.0000001"
                                        value={beachData.latitude}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label className="h6">Longitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="longitude"
                                        placeholder="Ex. -15.0000001"
                                        value={beachData.longitude}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Row>
                        </Form.Group>
                        <br />

                        <Form.Group className="mb-3">
                            <Form.Label className="h4">General Info</Form.Label>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Length</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="length"
                                        placeholder="Length"
                                        value={beachData.length}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Composition</Form.Label>
                                    <Form.Select
                                        value={beachData.composition}
                                        name="composition"
                                        onChange={handleInputChange}
                                        aria-label="Default select example">
                                        <option>Choose a composition</option>
                                        {
                                            BEACH_COMPOSITION.map((elm, index) => <option key={index} value={elm}>{elm}</option>)
                                        }
                                    </Form.Select>
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label className="h6">Sectors</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Number of sectors"
                                        name="sectors"
                                        min={1}
                                        max={299}
                                        value={beachData.sectors}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                    <br />
                                </Form.Group>
                            </Row>
                        </Form.Group>

                        <br />

                        <Form.Label className="h4">Nearest Bus Stops</Form.Label>

                        {
                            busStops.map((elm, idx) => <BusStopGroup
                                key={idx}
                                index={idx}
                                {...elm}
                                handleBusStopChange={handleBusStopChange}
                                deleteBusStop={deleteBusStop} />)
                        }
                        <Button className="custom-color-button mb-3" size="sm" onClick={addNewBusStop}>Add more stops</Button>
                        <br />

                        <Form.Label className="h4 mt-3">Tell us something about the beach</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea" rows={10}
                                name="description"
                                aria-label="With textarea"
                                value={beachData.description}
                                onChange={handleInputChange}
                                required />
                        </InputGroup>
                        <br />

                        <Form.Group className="m-3" controlId="image">
                            <Form.Label className="h4">Add a set of pictures of the beach</Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileUpload} />
                        </Form.Group>

                        <Row className="mb-3 p-3 d-flex align-items-start">
                            {
                                beachData.images.length > 0 &&
                                beachData.images.map((image, index) => (

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
                                            }}
                                        />
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
                        <Button className="custom-color-button mb-3" size="sm" type='submit' disabled={loadingImage}>
                            {loadingImage ? 'Loading image...' : '🖫 Save changes'}
                        </Button>
                    </Form>
            }
        </div>
    )
}


export default EditBeachForm