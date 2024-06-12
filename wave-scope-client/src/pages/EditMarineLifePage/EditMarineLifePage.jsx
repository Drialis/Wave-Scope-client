import { Container } from "react-bootstrap"
import EditSpecimenForm from "../../components/EditSpecimenForm/EditSpecimenForm"

const EditMarineLifePage = ({ commonName }) => {
  return (
    <Container className="EditMarineLifePage mx-auto">
      <div className="text-center m-5">
        <h1>Edit the specimen {commonName}</h1>
      </div>

      <EditSpecimenForm />
    </Container>
  )
}

export default EditMarineLifePage