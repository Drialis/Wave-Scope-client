import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <div className='Footer'>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p
              style={{ fontSize: '12px' }}
              className='text-center'>
              &copy; 2024 WaveScope. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer