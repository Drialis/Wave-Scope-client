import { useEffect, useState } from "react"
import { Form, Row, InputGroup, Button, Col, Card } from "react-bootstrap"
import './NewBeachForm'
// import './BusStopGroup.css'

const BusStopGroup = ({ index, name, latitude, longitude, lines, handleBusStopChange, deleteBusStop }) => {

    const [busStopData, setBusStopData] = useState({
        name: name,
        latitude: latitude,
        longitude: longitude
    })

    const [linesData, setLinesData] = useState([''])

    useEffect(() => {
        if (lines) {
            setLinesData(lines)
        }
    }, [])

    useEffect(() => {                                                           //cuando se actualicen linesData ( las líneas ) o el busStopData ( la información de la parada )
        const fullStopInfo = { ...busStopData, lines: linesData }               //toda la información de ambos estados se combinan en fullStopInfo y se envían al index
        handleBusStopChange(index, fullStopInfo)                                //especificado en el componente superior. Esta función solo se invoca en el componente padre (newBeachForm)
    }, [linesData, busStopData])                                                //por eso sabemos cuál es el índice


    const handleBusStop = e => {
        const { name, value } = e.target
        setBusStopData({
            ...busStopData, [name]: value
        })
    }

    const handleLineInput = (event, index) => {
        const { value } = event.target
        const updatedLines = [...linesData]
        updatedLines[index] = value

        setLinesData(updatedLines)
    }

    const handleDeleteLine = (_, index) => {
        const updatedLines = [...linesData]
        if (updatedLines.length > 1) {
            updatedLines.splice(index, 1)
            setLinesData(updatedLines)
        }
    }

    const handleNewLine = () => {
        const newLine = [...linesData, '']
        setLinesData(newLine)
    }

    const handleDeleteButton = (_, index) => {
        deleteBusStop(index)
    }

    return (
        <Card className="BusStopGroup mb-3" >

            <Form.Group className="mb-3" >
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Name</Form.Label>
                        <Form.Control
                            required
                            type=""
                            name="name"
                            placeholder="Name"
                            value={busStopData.name}
                            onChange={handleBusStop}
                        />
                        <br />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Latitude</Form.Label>
                        <Form.Control
                            required
                            placeholder="Ex. 28.0000001"
                            name="latitude"
                            value={busStopData.latitude}
                            onChange={handleBusStop}
                        />
                        <br />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label className="h6">Longitude</Form.Label>
                        <Form.Control
                            required
                            placeholder="Ex. -15.0000001"
                            name="longitude"
                            value={busStopData.longitude}
                            onChange={handleBusStop}
                        />
                        <br />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                        <Form.Label className="h6">Lines</Form.Label>
                        {
                            linesData.map((line, index) => {
                                return (
                                    <InputGroup key={index}>
                                        <Button as={Col} size="sm" md="2" className="delete-color-button" onClick={(event) => handleDeleteLine(event, index)}>-</Button>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="line"
                                            placeholder="Ex. 25"
                                            value={line}
                                            onChange={(event) => handleLineInput(event, index)}
                                        />
                                    </InputGroup>
                                )
                            })
                        }
                        <Button className="custom-color-button" as={Col} md="2" onClick={handleNewLine} size="sm"  >+</Button>
                    </Form.Group>
                </Row>

            </Form.Group>
            <Button className="delete-color-button" onClick={(event) => handleDeleteButton(event, index)}>Delete this stop</Button>

        </Card >
    )
}

export default BusStopGroup