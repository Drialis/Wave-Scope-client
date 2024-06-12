import { useNavigate } from "react-router-dom"
import { useState } from "react"
import authServices from "../../services/auth.services"
import uploadServices from "../../services/upload.services"
import { Button, Form, Row, Col } from "react-bootstrap"

const SignupForm = () => {

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    postalCode: '',
    country: '',
    profilePic: ''
  })

  const [loadingImage, setLoadingImage] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = e => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleFileUpload = (e) => {

    setLoadingImage(true)

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    uploadServices

      .uploadImage(formData)
      .then(({ data }) => {
        setSignupData({ ...signupData, profilePic: data.cloudinary_url })
        setLoadingImage(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingImage(false)
      })

  }

  const handleForSubmit = e => {
    e.preventDefault()

    authServices
      .signupUser(signupData)
      .then(() => navigate('/welcome'))
      .catch(err => console.log(err))

  }

  return (

    <Form onSubmit={handleForSubmit}>
      <Row>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <Form.Group className="mb-3 h6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={signupData.email} onChange={handleInputChange} name="email" />
          </Form.Group>
        </Col>
        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }}>
          <Form.Group className="mb-3 h6" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 12 }} md={{ span: 4 }} lg={{ span: 4 }}>
          <Form.Group className="mb-3 h6" controlId="username">
            <Form.Label>User name</Form.Label>
            <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
          </Form.Group>
        </Col>
        <Col xs={{ span: 6 }} md={{ span: 4 }} lg={{ span: 4 }}>
          <Form.Group className="mb-3 h6" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" value={signupData.postalCode} onChange={handleInputChange} name="postalCode" />
          </Form.Group>
        </Col>
        <Col xs={{ span: 6 }} md={{ span: 4 }} lg={{ span: 4 }}>
          <Form.Group className="mb-3 h6" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" value={signupData.country} onChange={handleInputChange} name="country" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3 h6" controlId="image">
            <Form.Label>Choose your profile picture</Form.Label>
            <Form.Control className='mb-3' type="file" onChange={handleFileUpload} />
          </Form.Group>
        </Col>
      </Row>

      <Button
        className="d-block mx-auto custom-color-button mb-5 mt-3"
        type="submit">
        {loadingImage ? 'Loading picture...' : 'Create Account'}
      </Button>

    </Form>
  )
}

export default SignupForm