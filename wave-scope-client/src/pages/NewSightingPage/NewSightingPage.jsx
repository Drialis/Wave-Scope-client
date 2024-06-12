import NewSightingForm from "../../components/NewSightingForm/NewSightingForm"
import { Container } from "react-bootstrap"

const NewSightingPage = () => {

  return (
    <Container className="NewSightingPage">

      <h1 className="text-center m-5">Report your sighting here!</h1>
      <NewSightingForm />

    </Container>
  )
}

export default NewSightingPage