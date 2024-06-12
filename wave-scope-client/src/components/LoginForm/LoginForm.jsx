import { useContext, useState } from "react"
import { Form, Button, Row, Col, Spinner, Container } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import authServices from "../../services/auth.services"
import { AuthContext } from "../../contexts/auth.context"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)


    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }



    const handleSubmit = e => {
        e.preventDefault()

        setIsLoading(true)

        authServices
            .loginUser(loginData)
            .then(({ data }) => {
                const newTokenGenerated = data.authToken
                localStorage.setItem('authToken', newTokenGenerated)
                authenticateUser()
                navigate('/welcome')
            })
            .catch(err => {
                console.log(err)
                navigate('/signup')
            })
    }


    return (
        <>
            < Form onSubmit={handleSubmit} >

                <Row>
                    <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="email"
                        xs={{ span: 10, offset: 1 }}
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 6, offset: 3 }}>
                        <Form.Label className="h6">Email</Form.Label>
                        <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
                    </Form.Group>

                    <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="password"
                        xs={{ span: 10, offset: 1 }}
                        sm={{ span: 8, offset: 2 }}
                        md={{ span: 6, offset: 3 }}>
                        <Form.Label className="h6">Password</Form.Label>
                        <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
                    </Form.Group>
                </Row>

                <Container className="mt-4 mb-3 d-flex justify-content-center">
                    <Button className="custom-color-button mt-3" type='submit'>Log in</Button>
                </Container>

            </Form >

            <Container className=" mb-3 d-flex justify-content-center">
                <Link to={'/signup'}>
                    <Button className="delete-color-button">Sign up!</Button>
                </Link>
            </Container>
        </>

    )
}

export default LoginForm