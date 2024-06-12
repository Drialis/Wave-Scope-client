import { useContext, useState } from "react"
import { Navbar, Nav, Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/auth.context"
import "./Navigation.css"


const Navigation = () => {

  const { loggedUser } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(true)

  return (
    <Navbar expand="lg" className="Navbar m-auto align-items-center" expanded={!expanded}>
      <Container>
        <Navbar.Brand href="/welcome" style={{ marginRight: '50px' }}>WaveScope</Navbar.Brand>
        {
          loggedUser
          &&
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="Navicon" onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="fixed-right">

                <Nav className="me-auto">
                  <Link to="/beaches" className="link" onClick={() => setExpanded(true)}>
                    <Nav.Link as="span">Beaches</Nav.Link>
                  </Link>

                  <Link to="/marine-life" className="link" onClick={() => setExpanded(true)}>
                    <Nav.Link as="span">Marine Life</Nav.Link>
                  </Link>

                  <Link to="/sightings" className="link" onClick={() => setExpanded(true)}>
                    <Nav.Link as="span">Sightings</Nav.Link>
                  </Link>

                  <Link to="/about-us" className="link" onClick={() => setExpanded(true)}>
                    <Nav.Link as="span">About Us</Nav.Link>
                  </Link>

                  <Link to={'/profile'} className="nav-link" onClick={() => setExpanded(true)}>
                    <Image src={loggedUser.profilePic} style={{ width: '25px' }} roundedCircle />
                  </Link>

                </Nav>
              </div>
            </Navbar.Collapse>
          </>
        }
      </Container>
    </Navbar >
  )
}

export default Navigation