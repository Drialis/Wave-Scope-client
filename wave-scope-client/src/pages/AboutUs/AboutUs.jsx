import { Card, Container, Row, Col } from "react-bootstrap"
import './AboutUs.css'
import { Link, useHref } from "react-router-dom"

const AboutUs = () => {




    return (


        <Container
            className="AboutUs mb-5">

            <Row className="mb-5">
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
                    <Card className="m-4 border-0 shadow-lg">
                        <Link to="https://github.com/tyrmund/">
                            <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717432575/Rodolfo_obukun.jpg"></Card.Img>
                        </Link>
                        <Card.Body
                            style={{ height: '300px' }}>
                            <Card.Title> Rodolfo Bittkau </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Card.Text className="fw-lighter">Sociologist turned developer, Rodolfo enjoys reading, cooking, roleplaying games and spending a lot of time taking walks.</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/tyrmund/">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
                    <Card className="m-4 border-0 shadow-lg">
                        <Link to="https://github.com/Daniela-AB25">
                            <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717432565/Daniela_y8urf5.jpg"></Card.Img>
                        </Link>
                        <Card.Body
                            style={{ height: '300px' }}>
                            <Card.Title> Daniela Astorga </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Card.Text className="fw-lighter">Recently arrived from the world of video, Daniela wishes to see herself turned into a capable web developer who builds some great code... while also wishing she could sleep some more.</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/Daniela-AB25">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
                    <Card className="m-4 border-0 shadow-lg">
                        <Link to="https://github.com/Drialis">
                            <Card.Img className="AboutUsPictures" variant="top" src="https://res.cloudinary.com/du8mlfcf9/image/upload/v1717434166/me_jlps1g.jpg"></Card.Img>
                        </Link>
                        <Card.Body
                            style={{ height: '300px' }}>
                            <Card.Title> Paloma Rehecho </Card.Title>
                            <Card.Text>Web Developer</Card.Text>
                            <Card.Text className="fw-lighter">This full stack developer is a dreamer who gets lost in scientific and fantasy books. She invests her time learning new technologies and practicing her favorite sport, taekwondo.</Card.Text>
                            <Link className="GitHubLink fw-bold" to="https://github.com/Drialis">GitHub Link</Link>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>


    )
}

export default AboutUs