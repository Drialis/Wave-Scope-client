import { useContext } from "react"
import { Container, Card, Image, Row, Col, Button } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import WorldIcon from "../../ReactIcons/WorldIcon"
import UserIcon from "../../ReactIcons/UserIcon"
import EmailIcon from "../../ReactIcons/EmailIcon"
import PostalCodeIcon from "../../ReactIcons/PostalCodeIcon"
import { Link } from "react-router-dom"
import SightingUserList from "../../components/SightingUserList/SightingUserList"


const UserProfilePage = () => {

  const { loggedUser, logout } = useContext(AuthContext)

  return (
    <Container className="UserProfilePage mt-3 mb-3" style={{ paddingLeft: '20px', paddingRight: '20px' }}>

      <Card style={{ backgroundColor: '#F7F0D3', color: '#023047', marginBottom: '50px' }}>
        <Row className="align-items-center" style={{ marginBottom: '30px' }}>
          <Col className="mt-5" md={{ span: 5 }}>
            <Image
              className="d-block mx-auto"
              src={loggedUser.profilePic}
              style={{ objectFit: 'cover', width: '250px' }}
              roundedCircle
            />
            <div className="text-center mt-3">
              <Link>
                <Button className='custom-color-button' onClick={logout}>Logout</Button>
              </Link>
            </div>
          </Col>
          <Col className="mt-3" md={{ span: 5 }}>
            <Card.Body>
              <Card.Title><UserIcon /> Username</Card.Title>
              <Card.Text>{loggedUser.username}</Card.Text>
              <Card.Title><EmailIcon /> Email</Card.Title>
              <Card.Text>{loggedUser.email}</Card.Text>
              <Card.Title><WorldIcon /> Country</Card.Title>
              <Card.Text>{loggedUser.country}</Card.Text>
              <Card.Title><PostalCodeIcon /> Postal Code</Card.Title>
              <Card.Text>{loggedUser.postalCode}</Card.Text>
            </Card.Body>
          </Col>
        </Row>


      </Card>

      <Container className="mb-5">
        <h3 style={{ marginTop: '60px', marginLeft: '25px' }}>Your Sightings</h3>
        <SightingUserList style={{ marginBottom: '20px' }} />
      </Container>


    </Container>
  )
}

export default UserProfilePage