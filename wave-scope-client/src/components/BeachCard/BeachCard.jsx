import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './BeachCard.css'


const BeachCard = ({ name, images, length, composition, _id }) => {

  return (
    <div className="BeachCard mx-auto">

      <Card className="shadow-sm border-0 mt-3 mb-3">

        <Link to={`/beaches/${_id}`}>
          <Card.Img variant="top"
            src={images.length !== 0 ? images[0] : "https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717428275/Anadir_un_titulo_2_zruph6.png"}
            className="rounded-top equal-aspect-ratio"
            style={{ objectFit: 'cover' }}
          />
        </Link>

        <Card.Body style={{ maxHeight: '600px' }}>

          <Card.Title>{name}</Card.Title>

          <Row>
            <Col md="12" className="mb-3">
              <Card.Text >
                Longitude: {length} m
              </Card.Text>
            </Col>
          </Row>

          <Row>
            <Col md="12" className="mb-3">
              <Card.Text >
                Texture: {composition}
              </Card.Text>
            </Col>
          </Row>

          <Link to={`/beaches/${_id}`}>
            <Button className='custom-color-button' size="md" >
              More info
            </Button>
          </Link>

        </Card.Body>
      </Card>

    </div>
  )
}

export default BeachCard