import { Form, Row, Col, InputGroup, Button } from "react-bootstrap"
import './NewBeachForm.css'
import { useState } from "react"
import BusStopGroup from "./BusStopGroup"
import beachServices from "../../services/beach.services"
import { BEACH_COMPOSITION } from "../../data/lists.data"
import { useNavigate } from "react-router-dom"
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import uploadServices from "../../services/upload.services"

const NewBeachForm = () => {

    const navigate = useNavigate()

    const handleModalClose = () => setModalShow(false)
    const handleModalShow = () => setModalShow(true)

    const [beachData, setBeachData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        description: '',
        length: '',
        composition: '',
        sectors: '',
        images: []
    })

    const [busStops, setBusStops] = useState([
        {}
    ])

    const [modalShow, setModalShow] = useState()
    const [loadingImage, setLoadingImage] = useState(false)

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
        setBeachData({
            ...beachData,
            [name]: value
        })
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
                setBeachData({ ...beachData, images: data.cloudinary_urls })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })

    }

    const handleBeachFormSubmit = e => {

        e.preventDefault()

        beachData.longitude = Number(beachData.longitude)
        beachData.latitude = Number(beachData.latitude)
        beachData.length = Number(beachData.length)
        beachData.sectors = Number(beachData.sectors)
        beachData.nearBusStops = busStops

        if (!beachData.name || !beachData.composition || beachData.composition === "Choose a composition" || !beachData.description) {
            handleModalShow()
            return
        }

        beachServices
            .newBeach(beachData)
            .then(() => {
                navigate('/beaches')
            })
            .catch(err => console.log(err))
    }


    return (

        <Form className="NewBeachForm mb-5" onSubmit={handleBeachFormSubmit}>
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
                            placeholder="Number of sectors"
                            name="sectors"
                            type="number"
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
                busStops.map((_, idx) => <BusStopGroup key={idx} index={idx} handleBusStopChange={handleBusStopChange} deleteBusStop={deleteBusStop} />)
            }
            <br />
            <Button className="custom-color-button mb-3" size="sm" onClick={addNewBusStop}>Add more stops</Button>
            <br />

            <Form.Label className="h4">Description</Form.Label>
            <InputGroup>
                <InputGroup.Text>Description</InputGroup.Text>
                <Form.Control as="textarea"
                    rows={10}
                    name="description"
                    aria-label="With textarea"
                    value={beachData.description}
                    onChange={handleInputChange}
                    required />
            </InputGroup>
            <br />

            <Form.Group className="mb-3" controlId="image">
                <Form.Label className="h4">Add a set of pictures of the beach</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileUpload} />
            </Form.Group>

            <Button className="custom-color-button mb-3" size="sm" type='submit' disabled={loadingImage}>
                {loadingImage ? 'Loading image...' : 'Add the new beach'}
            </Button>
            <ModalConfirm
                show={modalShow}
                handleClose={handleModalClose}
                handleConfirm={handleModalClose}
                titleMessage={'Required fields incomplete'}
                bodyMessage={'Please complete all fields'}
                buttonMessage={'Ok'} />

        </Form>


    )
}


export default NewBeachForm