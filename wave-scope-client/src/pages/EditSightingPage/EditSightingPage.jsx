import { Container } from "react-bootstrap"
import EditSightingForm from "../../components/EditSightingForm/EditSightingForm"

const EditSightingPage = () => {
  return (
    <Container className="EditSightingPage mb-5">
      <h1 className="mt-5 mb-3 text-center">Edit your Sighting</h1>
      <EditSightingForm />

    </Container>
  )
}

export default EditSightingPage