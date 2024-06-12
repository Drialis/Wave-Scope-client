import { Container } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"
import './StartPage.css'

const StartPage = () => {

  return (

    <div className="StartPage">

      <div
        className="welcome-banner"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717687353/filteredBackground_awwfpr.png')",
        }}
      >

        <div className="welcome-banner-content">
          <h1>Welcome to WaveScope</h1>
          <p>your go-to platform for discovering wildlife on beaches around the world!</p>
        </div>

      </div>

      <div
        className="info-banner"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717663449/IMG-20240606-WA0002_ydo3ho.jpg')"
        }}
      >
        <div className="info-banner-content">
          <h1>Share your Experiences</h1>
          <p>report your wildlife sightings and explore the ones made by the community</p>
        </div>

      </div>

      <Container className="call-to-action-banner mt-5"
        style={{ height: 'calc(100vh - 6rem)' }}>
        <Container
          className="d-flex justify-content-center">
          <img
            className="mb-5"
            style={{ maxHeight: '100px', width: 'auto' }}
            src='https://res.cloudinary.com/dc7ycwd1u/image/upload/v1717497196/Entry-logo_mzxain.png'
            alt="Logo Wave Scope" />
        </Container>

        <h1 className="text-center mb-3">Join Us Today</h1>

        <LoginForm />
      </Container>

    </div>

  )
}

export default StartPage